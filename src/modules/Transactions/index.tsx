import LayoutDashboard from "@components/Layouts"
import { Button, DatePicker, Input, message, Select, Space, Table, Tag } from "antd"
import { useTranslation } from "next-i18next"
import React, { useState } from "react"
import TransactionDetail from "./Components/TransactionDetail"
import { channelOptions, dateOptions, statusOptions } from "const/optionsFilter"
import { formatDate } from "@utils/date"
import { ExportOutlined } from "@ant-design/icons"

const { RangePicker } = DatePicker

// Show list of transaction, Transaction ID, CIF, Channel, Action, Status
// 	Admin bisa pencet trx dan masuk ke dalem dengan lebih detail, dan show: trx_id, base face, compare face, CIF, Channel (Octo, SSB, eTP, etc.), Date Time, Status (Success/Failed), Action (Registration, Forget Password, Forget Email, Forget 2FA) string aja, Zoloz trx_id, Zoloz Result Log (Json, di bikin popup)
// admin bisa export CSV: Bisa export data trx, dengan memfilter dulu listnya: CIF, Transaction Date (Last 24Hr, Last 7 Days, Last 30 days, custom: From-To), Channel, Status,Action

const dummyData = [
    {
        trx_id: 201,
        base_face: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
        current_face: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
        user_id: "CIF99887766",
        channel: "SSB",
        date_time: "2025-07-26T08:56:02.000Z",
        status: "Success",
        action: "Forget Email",
        zoloz_trx_id: "cee237de-10aa-43d9-a8a3-f2d63a1684b1",
        zoloz_result_log: {
            success: true,
            message: "Face valid",
            data: {
                message: "Request Success",
                session_id: "cee237de-10aa-43d9-a8a3-f2d63a1684b1",
                timestamp: 1753545362,
                status_code: "FACE-14",
                bounding_box: {
                    TopLeftX: "65.17205",
                    TopLeftY: "55.80445",
                    BottomRightX: "153.9487",
                    BottomRightY: "177.46924",
                    Width: "88.77664",
                    Height: "121.664795"
                },
                face_landmark: {
                    LeftEyeX: "85.13355",
                    LeftEyeY: "101.073456",
                    RightEyeX: "125.70785",
                    RightEyeY: "101.073456",
                    NoseX: "108.31886",
                    NoseY: "139.11185",
                    MouthLeftX: "91.29215",
                    MouthLeftY: "150.7045",
                    MouthRightX: "123.89649",
                    MouthRightY: "151.06677"
                },
                rotation: 0,
                nface: 1,
                attributes: {
                    sunglasses_on: false,
                    veil_on: false,
                    mask_on: false,
                    hat_on: false
                },
                image_quality: {
                    blur: false,
                    dark: false
                },
                liveness: {
                    status: true,
                    probability: "100"
                }
            },
            timestamp: "2025-07-26T08:56:01.781479369Z"
        },
        created_at: "2025-07-26T08:56:02.000Z",
        updated_at: "2025-07-26T08:56:02.000Z"
    },
    {
        trx_id: 202,
        base_face: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
        current_face: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
        user_id: "CIF99887766",
        channel: "SSB",
        date_time: "2025-07-26T08:56:02.000Z",
        status: "Failed",
        action: "Registration",
        zoloz_trx_id: "cee237de-10aa-43d9-a8a3-f2d63a1684b1",
        zoloz_result_log: {
            success: false,
            message: "Face invalid",
            data: {
                message: "Request Failed",
                session_id: "cee237de-10aa-43d9-a8a3-f2d63a1684b1",
                timestamp: 1753545362,
                status_code: "FACE-14",
                bounding_box: {
                    TopLeftX: "65.17205",
                    TopLeftY: "55.80445",
                    BottomRightX: "153.9487",
                    BottomRightY: "177.46924",
                    Width: "88.77664",
                    Height: "121.664795"
                },
                face_landmark: {
                    LeftEyeX: "85.13355",
                    LeftEyeY: "101.073456",
                    RightEyeX: "125.70785",
                    RightEyeY: "101.073456",
                    NoseX: "108.31886",
                    NoseY: "139.11185",
                    MouthLeftX: "91.29215",
                    MouthLeftY: "150.7045",
                    MouthRightX: "123.89649",
                    MouthRightY: "151.06677"
                },
                rotation: 0,
                nface: 1,
                attributes: {
                    sunglasses_on: false,
                    veil_on: false,
                    mask_on: false,
                    hat_on: false
                },
                image_quality: {
                    blur: true,
                    dark: false
                },
                liveness: {
                    status: false,
                    probability: "0"
                }
            },
            timestamp: "2025-07-26T08:56:01.781479369Z"
        },
        created_at: "2025-07-26T08:56:02.000Z",
        updated_at: "2025-07-26T08:56:02.000Z"
    }
]
const Transaction = () => {
    const { t } = useTranslation("common")
    const [searchCif, setSearchCif] = useState<string | undefined>()
    const [dateFilter, setDateFilter] = useState<string | undefined>()
    const [customRange, setCustomRange] = useState<any>(null)
    const [channel, setChannel] = useState<string | undefined>()
    const [status, setStatus] = useState<string | undefined>()

    const filteredData = dummyData.filter((item) => {
        let matches = true
        if (searchCif) {
            matches = matches && item.user_id.includes(searchCif)
        }
        if (dateFilter === "24hr") {
            // last 24 hours
            const now = new Date()
            const itemDate = new Date(item.created_at)
            if ((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60) > 24) matches = false
        } else if (dateFilter === "7days") {
            const now = new Date()
            const itemDate = new Date(item.created_at)
            if ((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24) > 7) matches = false
        } else if (dateFilter === "30days") {
            const now = new Date()
            const itemDate = new Date(item.created_at)
            if ((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24) > 30) matches = false
        } else if (dateFilter === "custom" && customRange) {
            const [start, end] = customRange
            const itemDate = new Date(item.created_at)

            if (start && end) {
                const startDate = new Date(start)
                startDate.setHours(0, 0, 0, 0)
                const endDate = new Date(end)
                endDate.setHours(23, 59, 59, 999)
                if (itemDate < startDate || itemDate > endDate) matches = false
            }
        } else if (dateFilter === "") {
            // No date filter selected, do not filter by date
        }
        if (channel) {
            matches = matches && item.channel === channel
        }
        if (status) {
            matches = matches && item.status === status
        }
        return matches
    })

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

        filteredData.forEach((item) => {
            worksheet.addRow({
                transactionId: item.trx_id,
                dateTime: formatDate(item.created_at, "DD MMM YYYY, HH:mm"),
                zolozTrxId: item.zoloz_trx_id,
                action: item.action,
                cif: item.user_id,
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
            dataIndex: "dateTime",
            key: "dateTime",
            render: (text: string) => formatDate(text, "DD MMM YYYY HH:mm")
        },
        {
            title: t("transaction_id"),
            dataIndex: "transactionId",
            key: "transactionId"
        },
        {
            title: t("cif"),
            dataIndex: "cif",
            key: "cif"
        },

        {
            title: t("zoloz_trx_id"),
            dataIndex: "zolozTrxId",
            key: "zolozTrxId"
        },

        {
            title: t("channel"),
            dataIndex: "channel",
            key: "channel"
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
    return (
        <LayoutDashboard title={t("transactions")}>
            <>
                <Space wrap style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
                    <Input.Search
                        placeholder={t("search_cif")}
                        allowClear
                        value={searchCif}
                        onChange={(e) => setSearchCif(e.target.value)}
                    />
                    <Select
                        placeholder={t("last_transaction_date")}
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
                        placeholder={t("last_transaction_channel")}
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
        </LayoutDashboard>
    )
}

export default Transaction
