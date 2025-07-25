import React, { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { Table, Tag } from "antd"

import LayoutDashboard from "@components/Layouts/Dashboard"
import { API_URL } from "@config/config"
import useAuth from "@hooks/useAuth"
import { formatDate } from "@utils/date"

const DashboardAdmin: React.FC = () => {
    const { auth } = useAuth()
    const { isLoggedIn } = auth
    const { t } = useTranslation("common")

    const [loading, setLoading] = useState(false)
    const [dataAdmin, setDataAdmin] = useState([])
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
            render: (status: string) => <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (date: string) => formatDate(date, "DD MMM YYYY HH:mm:ss")
        }
    ]

    return (
        <LayoutDashboard>
            <div style={{ padding: "24px" }}>
                <h1>{t("admin")}</h1>
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
                    rowKey="id"
                />
            </div>
        </LayoutDashboard>
    )
}

export default DashboardAdmin
