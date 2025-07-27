import { Button, Form, Input, Modal } from "antd"
import React, { useState } from "react"

const AddRole = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        form.resetFields()
    }

    const handleAddRole = async (values: any) => {
        setIsLoading(true)
        console.log("Adding role with values:", values)
        try {
            // Simulate an API call to add a new role
            // Here you would typically make an API call to add the role
            // For example:
            // await api.addRole(values)
            setTimeout(() => {
                setOpen(false)
                form.resetFields()
            }, 1000) // Simulate a delay for the API call
        } catch (error) {
            console.error("Failed to add role:", error)
            setIsLoading(true)
            // Optionally, you can show an error message to the user
        }
    }
    return (
        <>
            <Button type="primary" key="add-admin" onClick={handleOpen}>
                Add Role
            </Button>
            <Modal
                title="Add New Role"
                open={open}
                onCancel={handleClose}
                onOk={() => {
                    form.submit()
                }}
                okText="Add Role"
                okButtonProps={{ loading: isLoading, disabled: isLoading }}
            >
                <Form
                    form={form}
                    labelAlign="left"
                    labelWrap
                    labelCol={{ span: 6 }}
                    wrapperCol={{ flex: 1 }}
                    onFinish={handleAddRole}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter name role"
                            }
                        ]}
                    >
                        <Input placeholder="Enter Name" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: "Please enter description role"
                            }
                        ]}
                    >
                        <Input.TextArea placeholder="Enter Description" rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddRole
