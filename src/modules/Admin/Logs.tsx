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

    //     Change Password
    // Export User
    // Export Transaction
    // Login
    // Signout
    // Create Admin
    // Delete Admin
    // Change Setting

    const mockData = [
        {
            key: "1",
            action: "Login",
            admin: "deo@cimbadmin.com",
            timestamp: "2025-07-28 14:30:00",
            ip: "192.168.1.100",
            status: "success"
        },
        {
            key: "2",
            action: "Change Password",
            admin: "deo@cimbadmin.com",
            timestamp: "2025-07-28 14:25:00",
            ip: "192.168.1.100",
            status: "success"
        },
        {
            key: "3",
            action: "Export User",
            admin: "deo@cimbadmin.com",
            timestamp: "2025-07-28 14:20:00",
            ip: "192.168.1.100",
            status: "success"
        },
        {
            key: "4",
            action: "Export Transaction",
            admin: "deo@cimbadmin.com",
            timestamp: "2025-07-28 14:15:00",
            ip: "192.168.1.100",
            status: "success"
        },
        {
            key: "5",
            action: "Signout",
            admin: "deo@cimbadmin.com",
            timestamp: "2025-07-28 14:10:00",
            ip: "192.168.1.100",
            status: "success"
        },
        {
            key: "6",
            action: "Create Admin",
            admin: "jhon@cimbadmin.com",
            timestamp: "2025-07-28 14:05:00",
            ip: "192.168.1.100",
            status: "success"
        },
        {
            key: "7",
            action: "Delete Admin",
            admin: "jhon@cimbadmin.com",
            timestamp: "2025-07-28 14:00:00",
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
