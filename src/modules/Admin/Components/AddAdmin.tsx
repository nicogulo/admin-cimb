import { Button, Form, Input, Modal, Select } from "antd"
import { useTranslation } from "next-i18next"
import React, { useState } from "react"

const AddAdmin = () => {
    const [form] = Form.useForm()
    const { t } = useTranslation("common")
    const [showAddAdminModal, setShowAddAdminModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleOpenAddAdminModal = () => {
        setShowAddAdminModal(true)
    }
    const handleCloseAddAdminModal = () => {
        setShowAddAdminModal(false)
        form.resetFields()
    }

    const handleAddAdmin = async (values: any) => {
        setIsLoading(true)
        try {
            // Simulate an API call to add a new admin
            console.log("Adding admin with values:", values)
            // Here you would typically make an API call to add the admin
            // For example:
            // await api.addAdmin(values)
            setTimeout(() => {
                setIsLoading(false)
                setShowAddAdminModal(false)
            }, 1000) // Simulate a delay for the API call
        } catch (error) {
            console.error("Failed to add admin:", error)
            setIsLoading(false)
            // Optionally, you can show an error message to the user
        }
    }

    return (
        <>
            <Button type="primary" key="add-admin" onClick={handleOpenAddAdminModal}>
                {t("add_admin")}
            </Button>
            <Modal
                title={t("add_admin")}
                open={showAddAdminModal}
                onCancel={handleCloseAddAdminModal}
                width={600}
                onOk={() => {
                    form.submit()
                }}
                okButtonProps={{ loading: isLoading, disabled: isLoading }}
                okText={t("add_admin")}
            >
                <Form
                    form={form}
                    labelAlign="left"
                    labelWrap
                    labelCol={{ span: 6 }}
                    wrapperCol={{ flex: 1 }}
                    onFinish={(values) => {
                        handleAddAdmin(values)
                    }}
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: "Please enter a username" }]}
                    >
                        <Input placeholder="Enter username" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Please enter an email" }]}
                    >
                        <Input type="email" placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Please enter a password" }]}
                    >
                        <Input type="password" placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select a role" }]}>
                        <Select
                            placeholder="Select role"
                            options={[
                                { label: "Admin", value: "admin" },
                                { label: "Super Admin", value: "super_admin" },
                                { label: "Viewer", value: "viewer" }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please select a status" }]}
                    >
                        <Select
                            placeholder="Select status"
                            options={[
                                { label: "Active", value: "active" },
                                { label: "Inactive", value: "inactive" }
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddAdmin
