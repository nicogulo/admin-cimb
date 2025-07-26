import React, { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { Button, Popconfirm, Space, Table, Tag } from "antd"

import LayoutDashboard from "@components/Layouts"
import { API_URL } from "@config/config"
import useAuth from "@hooks/useAuth"
import { formatDate } from "@utils/date"
import EditAdmin from "./Components/EditAdmin"
import { DeleteOutlined } from "@ant-design/icons"
import AddAdmin from "./Components/AddAdmin"

const dataDummy = [
    {
        id: "1",
        name: "Admin One",
        email: "admin.one@example.com",
        status: "active",
        created_at: "2024-01-15T14:30:00Z",
        updated_at: "2024-01-15T14:30:00Z",
        role: "superadmin"
    },
    {
        id: "2",
        name: "Admin Two",
        email: "admin.two@example.com",
        status: "inactive",
        created_at: "2024-01-16T14:30:00Z",
        updated_at: "2024-01-16T14:30:00Z",
        role: "admin"
    }
]

const Admin: React.FC = () => {
    const { auth } = useAuth()
    const { isLoggedIn } = auth
    const { t } = useTranslation("common")

    const [showAddAdminModal, setShowAddAdminModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dataAdmin, setDataAdmin] = useState(dataDummy)
    const [pagination, setPagination] = useState<any>({
        current: 1,
        pageSize: 10
    })

    const getData = async ({ limit, page }: { limit: number; page: number }) => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/admins?limit=${limit}&page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()

            if (data?.data) {
                setDataAdmin(data.data)
                setPagination({
                    current: page,
                    pageSize: limit,
                    total: data.total
                })
            }
        } catch (error) {
            // Handle error silently or send to external logging service
            // console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            getData({ limit: 10, page: 1 })
        }
    }, [isLoggedIn])

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
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
                <Tag
                    color={status === "active" ? "green" : "red"}
                    style={{
                        textTransform: "capitalize"
                    }}
                >
                    {status}
                </Tag>
            )
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (date: string) => formatDate(date, "DD MMM YYYY HH:mm:ss")
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (date: string) => formatDate(date, "DD MMM YYYY HH:mm:ss")
        },
        {
            title: "•••",
            dataIndex: "id",
            key: "id",
            align: "center" as const,
            render: (id: string, record: any) => (
                <Space size="middle" style={{ cursor: "pointer" }}>
                    <EditAdmin data={record} />
                    <Popconfirm
                        title="Delete Admin"
                        description="Are you sure to delete this admin?"
                        // onConfirm={confirm}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} size="small" />
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <LayoutDashboard title={t("admin_list")} actions={[<AddAdmin />]}>
            <Table
                columns={columns}
                dataSource={dataAdmin}
                loading={loading}
                pagination={{
                    ...pagination,
                    onChange: (page, pageSize) => {
                        getData({ limit: pageSize || 10, page })
                    }
                }}
            />
        </LayoutDashboard>
    )
}

export default Admin
