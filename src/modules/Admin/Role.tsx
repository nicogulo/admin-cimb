import React from "react"
import { Table } from "antd"

import LayoutDashboard from "@components/Layouts"

import AddRole from "./Components/AddRole"
import EditRole from "./Components/EditRole"

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
            align: "center" as const,
            render: (_: any, record: any) => <EditRole data={record} />
        }
    ]
    return (
        <LayoutDashboard title="Role Management" actions={[<AddRole />]}>
            <Table columns={columns} dataSource={dataDummy} pagination={false} />
        </LayoutDashboard>
    )
}

export default Role
