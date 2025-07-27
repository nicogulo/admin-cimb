import React, { useEffect, useMemo, useState } from "react"
import { useTranslation } from "next-i18next"
import { Breadcrumb, Button, Card, DatePicker, Input, message, Select, Space, Table, Tag } from "antd"
import { channelOptions, dateOptions, statusOptions } from "const/optionsFilter"
import dayjs from "dayjs"
import debounce from "lodash/debounce"

import { ArrowLeftOutlined, ExportOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import LayoutDashboard from "@components/Layouts"
import { API_URL } from "@config/config"
import useAuth from "@hooks/useAuth"
import { formatDate } from "@utils/date"

import CustomerDetail from "./Components/CustomerDetail"

const { RangePicker } = DatePicker

interface CustomerData {
    cif: string
    name: string
    last_transaction_date: string
    last_transaction_channel: string
    last_transaction_status: string
}

const Dashboard: React.FC = () => {
    const { t } = useTranslation("common")

    const [data, setData] = useState<CustomerData[]>([])
    const { auth } = useAuth()
    const { token } = auth
    const [pagination, setPagination] = useState<any>({
        current: 1,
        pageSize: 10
    })
    const [searchCif, setSearchCif] = useState<string | undefined>()
    const [dateFilter, setDateFilter] = useState<string | undefined>()
    const [customRange, setCustomRange] = useState<any>(null)
    const [channel, setChannel] = useState<string | undefined>()
    const [status, setStatus] = useState<string | undefined>()
    const [breadcrumbs, setBreadcrumbs] = useState<any[]>([
        {
            title: t("customer_management.title")
        }
    ])
    const [selectedCif, setSelectedCif] = useState<string | null>(null)

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
                `${API_URL}/api/v1/face/customer_list?${searchCif ? `cif=${searchCif}&` : ""}${dateFilterParam ? `${dateFilterParam}&` : ""}${channel ? `channel=${channel}&` : ""}${status ? `status=${status}&` : ""}&page=${page}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { data } = await res.json()

            if (data?.customers) {
                setData(data.customers)
                setPagination({
                    current: page,
                    pageSize: limit,
                    total: data.total
                })
            }
        } catch (error) {
            message.error("Error fetching customer data")
        }
    }

    // Filter logic (dummy, only front-end)
    const filteredData = data.filter((item) => {
        let match = true
        if (searchCif && !item.cif.includes(searchCif)) match = false
        if (channel && item.last_transaction_channel !== channel) match = false
        if (status && item.last_transaction_status !== status) match = false
        // Date filter
        if (dateFilter === "24hr") {
            // last 24 hours
            const now = new Date()
            const itemDate = new Date(item.last_transaction_date)

            if ((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60) > 24) match = false
        } else if (dateFilter === "7days") {
            const now = new Date()
            const itemDate = new Date(item.last_transaction_date)
            if ((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24) > 7) match = false
        } else if (dateFilter === "30days") {
            const now = new Date()
            const itemDate = new Date(item.last_transaction_date)
            if ((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24) > 30) match = false
        } else if (dateFilter === "custom" && customRange) {
            const [start, end] = customRange
            const itemDate = new Date(item.last_transaction_date)

            if (start && end) {
                const startDate = new Date(start)
                startDate.setHours(0, 0, 0, 0)
                const endDate = new Date(end)
                endDate.setHours(23, 59, 59, 999)
                if (itemDate < startDate || itemDate > endDate) match = false
            }
        } else if (dateFilter === "") {
            // No date filter selected, do not filter by date
        }
        return match
    })

    const handleSearch = useMemo(
        () =>
            debounce((searchValue: string) => {
                setSearchCif(searchValue)
            }, 1000),
        []
    )

    const handleExport = async () => {
        const Excel = await import("exceljs")
        const workbook = new Excel.Workbook()
        const worksheet = workbook.addWorksheet("Customer Data")
        worksheet.columns = [
            { header: "CIF", key: "cif", width: 15 },
            { header: "Last Transaction Date", key: "last_transaction_date", width: 20 },
            { header: "Name", key: "name", width: 20 },
            { header: "Last Transaction Channel", key: "last_transaction_channel", width: 20 },
            { header: "Status", key: "status", width: 12 }
        ]
        filteredData.forEach((row) => {
            worksheet.addRow({
                cif: row.cif,
                last_transaction_date: formatDate(row.last_transaction_date, "DD MMM YYYY, HH:mm"),
                name: row.name,
                last_transaction_channel: row.last_transaction_channel,
                status: row.last_transaction_status
            })
        })

        worksheet.getRow(1).font = { bold: true }

        const buffer = await workbook.xlsx.writeBuffer({ useStyles: true })
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        })

        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")

        a.href = url
        a.download = `customer-data-${Date.now()}.xlsx`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        message.success(t("export_success"))
    }

    const columns = [
        {
            title: t("cif"),
            dataIndex: "cif",
            key: "cif"
        },
        {
            title: t("last_transaction_date"),
            dataIndex: "last_transaction_date",
            key: "last_transaction_date",
            render: (text: string) => formatDate(text, "DD MMM YYYY HH:mm")
        },
        {
            title: t("name"),
            dataIndex: "name",
            key: "name"
        },
        {
            title: t("last_transaction_channel"),
            dataIndex: "last_transaction_channel",
            key: "last_transaction_channel",
            render: (text: string) => (
                <span style={{ textTransform: "capitalize" }}>{text || t("unknown_channel")}</span>
            )
        },
        {
            title: "Last Transaction Status",
            dataIndex: "last_transaction_status",
            key: "last_transaction_status",
            align: "center" as const,
            render: (text: string) => (
                <Tag color={text === "Success" ? "green" : "red"} style={{ textTransform: "capitalize" }}>
                    {text}
                </Tag>
            )
        },
        {
            title: "•••",
            key: "actions",
            dataIndex: "cif",
            align: "center" as const,
            render: (cif: string, record: CustomerData) => {
                const isSelected = selectedCif === cif
                return (
                    <Button
                        icon={<MenuUnfoldOutlined />}
                        style={{
                            color: isSelected ? "#1677ff" : undefined,
                            cursor: isSelected ? "not-allowed" : "pointer"
                        }}
                        onClick={() => {
                            if (!isSelected) {
                                setSelectedCif(cif)
                                setBreadcrumbs([
                                    { title: t("customer_management.title") },
                                    { title: `${t("customer_management.detail")} - ${record.name}` }
                                ])
                            }
                        }}
                        size="small"
                    />
                )
            }
        }
    ]

    // Detail table for selected customer
    const selectedCustomer = data.find((item) => item.cif === selectedCif)
    const detailColumns = [
        {
            title: t("user_id"),
            dataIndex: "cif",
            key: "cif"
        },
        { title: t("name"), dataIndex: "name", key: "name" },
        { title: t("phone_number"), dataIndex: "phone_number", key: "phoneNumber" },
        {
            title: t("date_of_birth"),
            dataIndex: "date_of_birth",
            key: "dateOfBirth",
            render: (text: string) => formatDate(text, "DD MMM YYYY")
        },
        {
            title: "•••",
            key: "cif",
            dataIndex: "cif",
            align: "center" as const,
            render: (cif: string, record: CustomerData) => <CustomerDetail data={record} cif={cif} />
        }
    ]

    useEffect(() => {
        getData({
            limit: pagination.pageSize,
            page: pagination.current
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.current, pagination.pageSize, searchCif, dateFilter, channel, status])

    return (
        <LayoutDashboard title={t("customer_management.title")}>
            <Breadcrumb
                items={breadcrumbs.map((item) => ({
                    key: item.title,
                    title: item.title
                }))}
            />
            {!selectedCustomer ? (
                <>
                    <Space wrap style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
                        <Input.Search
                            placeholder={t("search_cif")}
                            allowClear
                            onChange={(e) => handleSearch(e.target.value)}
                            style={{ width: 180 }}
                        />
                        <Select
                            value={dateFilter}
                            onChange={(val) => setDateFilter(val)}
                            options={dateOptions}
                            placeholder={t("last_transaction_date")}
                        />
                        {dateFilter === "custom" && (
                            <RangePicker
                                value={customRange}
                                onChange={(val) => setCustomRange(val)}
                                style={{ width: 220 }}
                                placeholder={[t("from"), t("to")]}
                            />
                        )}
                        <Select
                            value={channel}
                            onChange={(val) => setChannel(val)}
                            options={channelOptions}
                            placeholder={t("last_transaction_channel")}
                            allowClear
                        />
                        <Select
                            value={status}
                            onChange={(val) => setStatus(val)}
                            options={statusOptions}
                            placeholder={t("status")}
                            allowClear
                        />
                        <Button
                            type="primary"
                            icon={<ExportOutlined />}
                            onClick={handleExport}
                            style={{ marginLeft: "auto" }}
                            disabled={filteredData.length === 0}
                        >
                            {t("export")}
                        </Button>
                    </Space>

                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                    />
                </>
            ) : (
                <Card
                    style={{ marginTop: 16 }}
                    title={`${t("customer_management.detail")} - ${selectedCustomer?.name}`}
                    extra={
                        <Button
                            onClick={() => {
                                setSelectedCif(null)
                                setBreadcrumbs([{ title: t("customer_management.title") }])
                            }}
                            icon={<ArrowLeftOutlined />}
                        >
                            {t("back")}
                        </Button>
                    }
                >
                    <Table
                        columns={detailColumns}
                        dataSource={data.filter((item) => item.cif === selectedCif)}
                        pagination={false}
                    />
                </Card>
            )}
        </LayoutDashboard>
    )
}

export default Dashboard
