import { EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal } from "antd"
import React from "react"

interface EditRoleProps {
    data: any
}

const EditRole: React.FC<EditRoleProps> = ({ data }) => {
    const [form] = Form.useForm()
    const [showEditModal, setShowEditModal] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleOpenEditModal = () => {
        setShowEditModal(true)
    }
    const handleCloseEditModal = () => {
        setShowEditModal(false)
        form.resetFields()
    }

    const handleUpdateRole = async (values: any) => {
        setIsLoading(true)
        try {
            // Simulate an API call to update role details
            console.log("Updating role with values:", values)
            // Here you would typically make an API call to update the role details
            // For example:
            // await api.updateRole(data.id, values)
            setTimeout(() => {
                setIsLoading(false)
                setShowEditModal(false)
            }, 1000) // Simulate a delay for the API call
        } catch (error) {
            console.error("Failed to update role:", error)
            setIsLoading(false)
            // Optionally, you can show an error message to the user
        }
    }

    return (
        <>
            <Button icon={<EditOutlined />} size="small" onClick={handleOpenEditModal} />
            <Modal
                title="Edit Role"
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
                    onFinish={handleUpdateRole}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Please input the role name!" }]}
                    >
                        <Input placeholder="Enter role name" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: "Please input the role description!" }]}
                    >
                        <Input.TextArea placeholder="Enter role description" rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditRole
