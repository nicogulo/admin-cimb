import { ArrowLeftOutlined, ExportOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import LayoutDashboard from "@components/Layouts"
import useAuth from "@hooks/useAuth"
import { formatDate } from "@utils/date"
import {
    Card,
    Drawer,
    Flex,
    Table,
    theme,
    Input,
    Select,
    DatePicker,
    Space,
    Button,
    message,
    Breadcrumb,
    Tag
} from "antd"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import CustomerDetail from "./Components/CustomerDetail"

const { RangePicker } = DatePicker

interface CustomerData {
    key: string
    cif: string
    lastTransactionDate: string
    name: string
    lastTransactionChannel: string
    status: string
    phoneNumber: string
    dateOfBirth: string
    baseFacePhoto: string
    currentFacePhoto: string
    logs: {
        trxId: string
        baseFace: string
        currentFace: string
        cif: string
        channel: string
        dateTime: string
        status: string
        action: string
    }[]
}

const dataDummy = [
    {
        key: "1",
        cif: "1234567890",
        lastTransactionDate: "2025-07-22",
        name: "John Doe",
        lastTransactionChannel: "Mobile App",
        status: "Active",
        phoneNumber: "08123456789",
        dateOfBirth: "1990-01-01",
        baseFacePhoto: "/images/base-face.jpg",
        currentFacePhoto: "/images/current-face.jpg",
        logs: [
            {
                trxId: "TRX123456",
                zoloTrxId: "Zoloz123456",
                zoloResultLog: { result: "Success", details: "Face match successful" },
                baseFace: "BaseFace1",
                currentFace: "CurrentFace1",
                cif: "1234567890",
                channel: "Mobile App",
                dateTime: "2023-10-01 12:00:00",
                status: "Success",
                action: "Registration"
            },
            {
                trxId: "TRX123457",
                zoloTrxId: "Zoloz123457",
                zoloResultLog: { result: "Failed", details: "Face match failed" },
                baseFace: "BaseFace2",
                currentFace: "CurrentFace2",
                cif: "1234567890",
                channel: "Web Portal",
                dateTime: "2023-10-02 14:30:00",
                status: "Failed",
                action: "Forget Password"
            }
        ]
    },
    {
        key: "2",
        cif: "0987654321",
        lastTransactionDate: "2025-07-21",
        name: "Jane Smith",
        lastTransactionChannel: "Web Portal",
        status: "Inactive",
        phoneNumber: "08234567890",
        dateOfBirth: "1985-05-05",
        baseFacePhoto: "/images/base-face.jpg",
        currentFacePhoto: "/images/current-face.jpg",
        logs: [
            {
                trxId: "TRX098765",
                zoloTrxId: "Zoloz123456",
                zoloResultLog: { result: "Success", details: "Face match successful" },
                baseFace: "BaseFace3",
                currentFace: "CurrentFace3",
                cif: "0987654321",
                channel: "Web Portal",
                dateTime: "2023-09-15 10:00:00",
                status: "Success",
                action: "Registration"
            }
        ]
    }
]

const Dashboard: React.FC = () => {
    const { t } = useTranslation("common")
    const router = useRouter()

    const [adminLevel, setAdminLevel] = useState(0)
    const { auth } = useAuth()
    const { isLoggedIn } = auth
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

    useEffect(() => {
        // if (!isLoggedIn) {
        //     router.push("/auth/sign-in")
        //     return
        // }
        const member = localStorage.getItem("admin")
        if (member) {
            const memberJson = JSON.parse(member)
            setAdminLevel(memberJson?.level)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, router])

    const channelOptions = [
        { value: "Mobile App", label: "Mobile App" },
        { value: "Web Portal", label: "Web Portal" }
    ]
    const statusOptions = [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" }
    ]

    const dateOptions = [
        { value: "24hr", label: t("last_24h") },
        { value: "7days", label: t("last_7d") },
        { value: "30days", label: t("last_30d") },
        { value: "custom", label: t("custom_range") }
    ]

    // Filter logic (dummy, only front-end)
    const filteredData = dataDummy.filter((item) => {
        let match = true
        if (searchCif && !item.cif.includes(searchCif)) match = false
        if (channel && item.lastTransactionChannel !== channel) match = false
        if (status && item.status !== status) match = false
        // Date filter
        if (dateFilter === "24hr") {
            // last 24 hours
            const now = new Date()
            const itemDate = new Date(item.lastTransactionDate)
            if ((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60) > 24) match = false
        } else if (dateFilter === "7days") {
            const now = new Date()
            const itemDate = new Date(item.lastTransactionDate)
            if ((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24) > 7) match = false
        } else if (dateFilter === "30days") {
            const now = new Date()
            const itemDate = new Date(item.lastTransactionDate)
            if ((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24) > 30) match = false
        } else if (dateFilter === "custom" && customRange) {
            const [start, end] = customRange
            const itemDate = new Date(item.lastTransactionDate)

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

    const handleExport = async () => {
        const Excel = await import("exceljs")
        const workbook = new Excel.Workbook()
        const worksheet = workbook.addWorksheet("Customer Data")
        worksheet.columns = [
            { header: "CIF", key: "cif", width: 15 },
            { header: "Last Transaction Date", key: "lastTransactionDate", width: 20 },
            { header: "Name", key: "name", width: 20 },
            { header: "Last Transaction Channel", key: "lastTransactionChannel", width: 20 },
            { header: "Status", key: "status", width: 12 },
            { header: "Phone Number", key: "phoneNumber", width: 15 },
            { header: "Date of Birth", key: "dateOfBirth", width: 15 }
        ]
        filteredData.forEach((row) => {
            worksheet.addRow({
                cif: row.cif,
                lastTransactionDate: formatDate(row.lastTransactionDate, "DD MMM YYYY, HH:mm"),
                name: row.name,
                lastTransactionChannel: row.lastTransactionChannel,
                status: row.status,
                phoneNumber: row.phoneNumber,
                dateOfBirth: row.dateOfBirth
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
            dataIndex: "lastTransactionDate",
            key: "lastTransactionDate",
            render: (text: string) => formatDate(text, "DD MMM YYYY HH:mm")
        },
        {
            title: t("name"),
            dataIndex: "name",
            key: "name"
        },
        {
            title: t("last_transaction_channel"),
            dataIndex: "lastTransactionChannel",
            key: "lastTransactionChannel",
            render: (text: string) => text || t("unknown_channel")
        },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            align: "center" as const,
            render: (text: string) => <Tag color={text === "Active" ? "green" : "red"}>{text}</Tag>
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
    const selectedCustomer = dataDummy.find((item) => item.cif === selectedCif)
    const detailColumns = [
        {
            title: t("user_id"),
            dataIndex: "cif",
            key: "cif"
        },
        { title: t("name"), dataIndex: "name", key: "name" },
        { title: t("phone_number"), dataIndex: "phoneNumber", key: "phoneNumber" },
        { title: t("date_of_birth"), dataIndex: "dateOfBirth", key: "dateOfBirth" },
        {
            title: "•••",
            key: "cif",
            dataIndex: "cif",
            align: "center" as const,
            render: (cif: string, record: CustomerData) => <CustomerDetail data={record} cif={cif} />
        }
    ]

    return (
        <LayoutDashboard adminLevel={adminLevel} title={t("customer_management.title")}>
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
                            value={searchCif}
                            onChange={(e) => setSearchCif(e.target.value)}
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
                    title={t("customer_management.detail") + ` - ` + selectedCustomer?.name}
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
                        dataSource={dataDummy.filter((item) => item.cif === selectedCif)}
                        pagination={false}
                    />
                </Card>
            )}
        </LayoutDashboard>
    )
}

export default Dashboard
