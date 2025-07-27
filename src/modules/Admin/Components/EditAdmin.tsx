import React, { useState } from "react"
import { Button, Form, Input, Modal, Select } from "antd"

import { EditOutlined } from "@ant-design/icons"

interface EditAdminProps {
    data: any
}

const EditAdmin = ({ data }: EditAdminProps) => {
    const [form] = Form.useForm()
    const [showEditModal, setShowEditModal] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const handleOpenEditModal = () => {
        setShowEditModal(true)
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        form.resetFields()
    }

    const handleUpdateAdmin = async (values: any) => {
        setIsLoading(true)
        try {
            // Simulate an API call to update admin details
            console.log("Updating admin with values:", values)
            // Here you would typically make an API call to update the admin details
            // For example:
            // await api.updateAdmin(data.id, values)
            setTimeout(() => {
                setIsLoading(false)
                setShowEditModal(false)
            }, 1000) // Simulate a delay for the API call
        } catch (error) {
            console.error("Failed to update admin:", error)
            setIsLoading(false)
            // Optionally, you can show an error message to the user
        }
    }
    return (
        <>
            <Button icon={<EditOutlined onClick={handleOpenEditModal} />} size="small" />
            <Modal
                title="Edit Admin"
                open={showEditModal}
                onCancel={handleCloseEditModal}
                width={600}
                okText="Update"
                onOk={() => {
                    form.submit()
                }}
                okButtonProps={{ loading: isLoading, disabled: isLoading }}
                cancelButtonProps={{ disabled: isLoading }}
            >
                <Form
                    form={form}
                    initialValues={data}
                    labelAlign="left"
                    labelWrap
                    labelCol={{ span: 6 }}
                    wrapperCol={{ flex: 1 }}
                    onFinish={(values) => {
                        handleUpdateAdmin(values)
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Please input the admin's name!" }]}
                    >
                        <Input placeholder="Enter admin name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Please input the admin's email!" }]}
                    >
                        <Input placeholder="Enter admin email" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: "Please select the admin's role!" }]}
                    >
                        <Select placeholder="Select role">
                            <Select.Option value="super_admin">Super Admin</Select.Option>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="viewer">Viewer</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please select the admin's status!" }]}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                        </Select>
                    </Form.Item>
                    {/* change password */}
                    <Form.Item
                        name="password"
                        label="Change Password"
                        rules={[{ required: false, message: "Please input a new password!" }]}
                    >
                        <Input.Password placeholder="Enter new password" />
                    </Form.Item>
                    {/* change email */}
                    <Form.Item
                        name="newEmail"
                        label="Change Email"
                        rules={[{ required: false, message: "Please input a new email!" }]}
                    >
                        <Input placeholder="Enter new email" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditAdmin
