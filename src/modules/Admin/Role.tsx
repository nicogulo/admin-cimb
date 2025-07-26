import LayoutDashboard from "@components/Layouts"
import { Table } from "antd"
import { useTranslation } from "next-i18next"
import React from "react"
import AddRole from "./Components/AddRole"

const dataDummy = [
    {
        id: "1",
        name: "Super Admin",
        description: "Full access to all features"
    },
    {
        id: "2",
        name: "Admin",
        description: "Limited access to admin features"
    }
]

const Role = () => {
    const { t } = useTranslation("common")

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "•••",
            key: "actions",
            render: () => <span>{t("role.edit")}</span>
        }
    ]
    return (
        <LayoutDashboard title="Role Management" actions={[<AddRole />]}>
            <Table columns={columns} dataSource={dataDummy} pagination={false} />
        </LayoutDashboard>
    )
}

export default Role
