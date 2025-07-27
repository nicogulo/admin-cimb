import React from "react"
import { Table } from "antd"

import LayoutDashboard from "@components/Layouts"

import AddRole from "./Components/AddRole"
import EditRole from "./Components/EditRole"

const dataDummy = [
    {
        id: "1",
        name: "Super Admin",
        description: "Full access to all features",
        role: {
            viewTransaction: true,
            exportTransaction: true,
            viewUser: true,
            exportUser: true,
            viewAdmin: true,
            editAdmin: true
        }
    },
    {
        id: "2",
        name: "General",
        description: "Can view transactions and users, but cannot edit admin",
        role: {
            viewTransaction: true,
            exportTransaction: false,
            viewUser: true,
            exportUser: false,
            viewAdmin: false,
            editAdmin: false
        }
    },
    {
        id: "3",
        name: "Analyst",
        description: "Can view transactions and users",
        role: {
            viewTransaction: true,
            exportTransaction: true,
            viewUser: true,
            exportUser: true,
            viewAdmin: false,
            editAdmin: false
        }
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
