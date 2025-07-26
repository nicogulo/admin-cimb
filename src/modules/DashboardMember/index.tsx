import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { Button, Space, Table, Tag } from "antd"

import LayoutDashboard from "@components/Layouts"
import { API_URL } from "@config/config"
import useAuth from "@hooks/useAuth"
import { formatDate } from "@utils/date"

const DashboardMember: React.FC = () => {
    const [adminLevel, setAdminLevel] = useState<number>(0)
    const { auth } = useAuth()
    const { t } = useTranslation("common")

    const [loading, setLoading] = useState(false)
    const [dataMembers, setDataMembers] = useState([])
    const [pagination, setPagination] = useState<any>({
        current: 1,
        pageSize: 10
    })

    const { isLoggedIn } = auth

    const getData = async ({ limit, page }: { limit: number; page: number }) => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/member?limit=${limit}&page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()

            if (data?.members) {
                setDataMembers(data.members)
                setPagination({
                    current: page,
                    pageSize: limit,
                    total: data.total
                })
            }
        } catch (error) {
            // Handle error silently or send to external logging service
            // console.error("Error fetching member data:", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const member = localStorage.getItem("admin")
        if (member) {
            const memberJson = JSON.parse(member)
            setAdminLevel(memberJson?.level || 0)
        }
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            getData({
                limit: pagination.pageSize,
                page: pagination.current
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

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
            render: (status: string) => <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
        },
        {
            title: "KYC Status",
            dataIndex: "kyc_status",
            key: "kyc_status",
            render: (status: string) => (
                <Tag color={status === "verified" ? "green" : status === "pending" ? "orange" : "red"}>{status}</Tag>
            )
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (date: string) => formatDate(date, "DD MMM YYYY HH:mm:ss")
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, __: any) => (
                <Space size="middle">
                    <Button type="link" size="small">
                        View Details
                    </Button>
                    <Button type="link" size="small">
                        Edit
                    </Button>
                </Space>
            )
        }
    ]

    return (
        <LayoutDashboard adminLevel={adminLevel}>
            <div style={{ padding: "24px" }}>
                <h1>{t("member")}</h1>
                <Table
                    columns={columns}
                    dataSource={dataMembers}
                    loading={loading}
                    pagination={{
                        ...pagination,
                        onChange: (page, pageSize) => {
                            getData({ limit: pageSize || 10, page })
                        }
                    }}
                    rowKey="uid"
                />
            </div>
        </LayoutDashboard>
    )
}

export default DashboardMember
