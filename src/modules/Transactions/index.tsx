import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "next-i18next"
import { Button, DatePicker, Input, message, Select, Space, Table, Tag, Tooltip } from "antd"
import { channelOptions, dateOptions, statusOptions } from "const/optionsFilter"
import dayjs from "dayjs"
import debounce from "lodash/debounce"

import { ExportOutlined } from "@ant-design/icons"
import LayoutDashboard from "@components/Layouts"
import { API_URL } from "@config/config"
import useAuth from "@hooks/useAuth"
import { formatDate } from "@utils/date"

import TransactionDetail from "./Components/TransactionDetail"

const { RangePicker } = DatePicker

const Transaction = () => {
    const { t } = useTranslation("common")
    const [dataTransaction, setDataTransaction] = useState<TransactionData[]>([])
    const [searchCif, setSearchCif] = useState<string | undefined>()
    const [dateFilter, setDateFilter] = useState<string | undefined>()
    const [customRange, setCustomRange] = useState<any>(null)
    const [channel, setChannel] = useState<string | undefined>()
    const [status, setStatus] = useState<string | undefined>()
    const [pagination, setPagination] = useState<any>({
        current: 1,
        pageSize: 10
    })

    const {
        auth: { token }
    } = useAuth()

    const getData = async ({ limit, page }: { limit: number; page: number }) => {
        try {
            let dateFilterParam = ""
            switch (dateFilter) {
                case "24hr":
                    dateFilterParam = `start_date=${dayjs().subtract(1, "day").format("YYYY-MM-DD")}&end_date=${dayjs().format("YYYY-MM-DD")}`
                    break
                case "last7days":
                    dateFilterParam = `start_date=${dayjs().subtract(7, "day").format("YYYY-MM-DD")}&end_date=${dayjs().format("YYYY-MM-DD")}`
                    break
                case "last30days":
                    dateFilterParam = `start_date=${dayjs().subtract(30, "day").format("YYYY-MM-DD")}&end_date=${dayjs().format("YYYY-MM-DD")}`
                    break
                case "custom":
                    if (customRange && customRange.length === 2) {
                        const [start, end] = customRange
                        dateFilterParam = `start_date=${dayjs(start).format("YYYY-MM-DD")}&end_date=${dayjs(end).format("YYYY-MM-DD")}`
                    }
                    break
                default:
                    dateFilterParam = ""
                    break
            }

            const res = await fetch(
                `${API_URL}/api/v1/face/transaction_list?${searchCif ? `cif=${searchCif}&` : ""}${dateFilterParam ? `${dateFilterParam}&` : ""}${channel ? `channel=${channel}&` : ""}${status ? `status=${status}&` : ""}limit=${limit}&page=${page}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { data } = await res.json()
            const transactions = (data?.transactions || []).map((item: any) => ({
                id: item.id,
                cif: item.cif,
                channel: item.channel,
                date_time: item.date_time,
                action: item.action,
                status: item.status ? "Success" : "Failed",
                zoloz_trx_id: item.zoloz_trx_id,
                zoloz_result_log: JSON.stringify(item.zoloz_result_log, null, 2),
                created_at: item.created_at
            }))
            setDataTransaction(transactions)
            setPagination({
                current: page,
                pageSize: limit,
                total: data?.total || 0
            })
        } catch (error) {
            message.error("Error fetching transaction data")
        }
    }

    const handleSearch = useMemo(
        () =>
            debounce((searchValue: string) => {
                setSearchCif(searchValue)
            }, 1000),
        []
    )
    const handleExport = async () => {
        // Implement export logic here, e.g., convert filteredData to CSV and trigger download
        const Excel = await import("exceljs")
        const workbook = new Excel.Workbook()
        const worksheet = workbook.addWorksheet("Transactions")

        worksheet.columns = [
            { header: t("transaction_id"), key: "transactionId" },
            { header: t("date_time"), key: "dateTime" },
            { header: t("zoloz_trx_id"), key: "zolozTrxId" },
            { header: t("action"), key: "action" },
            { header: t("cif"), key: "cif" },
            { header: t("channel"), key: "channel" },
            { header: t("status"), key: "status" }
        ]

        dataTransaction.forEach((item) => {
            worksheet.addRow({
                transactionId: item.id,
                dateTime: formatDate(item.created_at, "DD MMM YYYY, HH:mm"),
                zolozTrxId: item.zoloz_trx_id,
                action: item.action,
                cif: item.cif,
                channel: item.channel,
                status: item.status
            })
        })

        worksheet.getRow(1).font = { bold: true }

        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        })

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "transactions.xlsx")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        message.success(t("export_success"))
    }

    const columns = [
        {
            title: t("date_time"),
            dataIndex: "created_at",
            key: "created_at",
            render: (text: string) => formatDate(text, "DD MMM YYYY HH:mm")
        },
        {
            title: t("transaction_id"),
            dataIndex: "id",
            key: "id",
            ellipsis: true,
            render: (url: string) => (
                <Tooltip title={`Click to copy URL ${url}`}>
                    <Button
                        type="text"
                        onClick={() => {
                            navigator.clipboard.writeText(url)
                            message.success("URL Copied")
                        }}
                        size="small"
                    >
                        <span
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: "180px"
                            }}
                        >
                            {url}
                        </span>
                    </Button>
                </Tooltip>
            )
        },
        {
            title: t("cif"),
            dataIndex: "cif",
            key: "cif"
        },

        {
            title: t("zoloz_trx_id"),
            dataIndex: "zoloz_trx_id",
            key: "zoloz_trx_id",
            ellipsis: true,
            render: (url: string) => {
                if (!url) {
                    return <span>-</span>
                }
                return (
                    <Tooltip title={`Click to copy URL ${url}`}>
                        <Button
                            type="text"
                            onClick={() => {
                                navigator.clipboard.writeText(url)
                                message.success("URL Copied")
                            }}
                            size="small"
                        >
                            <span
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "180px"
                                }}
                            >
                                {url}
                            </span>
                        </Button>
                    </Tooltip>
                )
            }
        },

        {
            title: t("channel"),
            dataIndex: "channel",
            key: "channel",
            align: "center" as const,
            render: (text: string) => <span style={{ textTransform: "capitalize" }}>{text}</span>
        },
        {
            title: t("action"),
            dataIndex: "action",
            key: "action"
        },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            align: "center" as const,
            render: (text: string) => <Tag color={text === "Success" ? "green" : "red"}>{text}</Tag>
        },
        {
            title: "•••",
            key: "id",
            dataIndex: "id",
            align: "center" as const,
            render: (text: string, record: any) => <TransactionDetail data={record} cif={text} />
        }
    ]

    useEffect(() => {
        getData({ limit: pagination.pageSize, page: pagination.current })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.current, pagination.pageSize, searchCif, dateFilter, customRange, channel, status])

    return (
        <LayoutDashboard title={t("transactions")}>
            <>
                <Space wrap style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
                    <Input.Search
                        placeholder={t("search_cif")}
                        allowClear
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Select
                        placeholder="Transaction Date"
                        value={dateFilter}
                        onChange={(value) => setDateFilter(value)}
                        options={dateOptions}
                        allowClear
                        style={{ minWidth: 200 }}
                    />
                    {dateFilter === "custom" && (
                        <RangePicker
                            value={customRange}
                            onChange={(dates) => {
                                setCustomRange(dates)
                            }}
                            style={{ minWidth: 200 }}
                            placeholder={[t("from"), t("to")]}
                            allowClear
                        />
                    )}
                    <Select
                        placeholder="Transaction Channel"
                        value={channel}
                        onChange={(value) => setChannel(value)}
                        options={channelOptions}
                        allowClear
                    />
                    <Select
                        value={status}
                        onChange={(val) => setStatus(val)}
                        options={statusOptions}
                        placeholder={t("status")}
                        style={{ minWidth: 120 }}
                        allowClear
                    />
                    <Button
                        type="primary"
                        icon={<ExportOutlined />}
                        onClick={handleExport}
                        style={{ marginLeft: "auto" }}
                        disabled={dataTransaction.length === 0}
                    >
                        {t("export")}
                    </Button>
                </Space>
                <Table
                    columns={columns}
                    dataSource={dataTransaction}
                    pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                />
            </>
        </LayoutDashboard>
    )
}

export default Transaction
