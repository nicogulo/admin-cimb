import React, { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { Table, Tag } from "antd"

import LayoutDashboard from "@components/Layouts"

const Logs: React.FC = () => {
    const [adminLevel, setAdminLevel] = useState<number>(0)
    const { t } = useTranslation("common")

    useEffect(() => {
        const member = localStorage.getItem("admin")
        if (member) {
            const memberJson = JSON.parse(member)
            setAdminLevel(memberJson?.level || 0)
        }
    }, [])

    const mockData = [
        {
            key: "1",
            action: "User Login",
            admin: "admin@example.com",
            timestamp: "2024-01-15 14:30:00",
            ip: "192.168.1.100",
            status: "success"
        },
        {
            key: "2",
            action: "KYC Approval",
            admin: "admin@example.com",
            timestamp: "2024-01-15 14:25:00",
            ip: "192.168.1.100",
            status: "success"
        }
    ]

    const columns = [
        {
            title: "Action",
            dataIndex: "action",
            key: "action"
        },
        {
            title: "Admin",
            dataIndex: "admin",
            key: "admin"
        },
        {
            title: "Timestamp",
            dataIndex: "timestamp",
            key: "timestamp"
        },
        {
            title: "IP Address",
            dataIndex: "ip",
            key: "ip"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => <Tag color={status === "success" ? "green" : "red"}>{status}</Tag>
        }
    ]

    return (
        <LayoutDashboard adminLevel={adminLevel} title={t("admin_logs")}>
            <Table columns={columns} dataSource={mockData} pagination={false} />
        </LayoutDashboard>
    )
}

export default Logs
