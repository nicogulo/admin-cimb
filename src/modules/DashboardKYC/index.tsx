import React, { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { Button, Space, Table, Tag } from "antd"

import LayoutDashboard from "@components/Layouts/Dashboard"

const DashboardKYC: React.FC = () => {
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
            uid: "USR001",
            email: "user1@example.com",
            status: "pending",
            submitted_at: "2024-01-15"
        },
        {
            key: "2",
            uid: "USR002",
            email: "user2@example.com",
            status: "approved",
            submitted_at: "2024-01-14"
        }
    ]

    const columns = [
        {
            title: "UID",
            dataIndex: "uid",
            key: "uid"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "approved" ? "green" : status === "pending" ? "orange" : "red"}>{status}</Tag>
            )
        },
        {
            title: "Submitted At",
            dataIndex: "submitted_at",
            key: "submitted_at"
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, __: any) => (
                <Space size="middle">
                    <Button type="link" size="small">
                        Review
                    </Button>
                    <Button type="link" size="small">
                        Approve
                    </Button>
                    <Button type="link" size="small" danger>
                        Reject
                    </Button>
                </Space>
            )
        }
    ]

    return (
        <LayoutDashboard adminLevel={adminLevel}>
            <div style={{ padding: "24px" }}>
                <h1>{t("member_kyc")}</h1>
                <Table columns={columns} dataSource={mockData} rowKey="key" />
            </div>
        </LayoutDashboard>
    )
}

export default DashboardKYC
