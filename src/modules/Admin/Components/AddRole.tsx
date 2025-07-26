import { Button, Form, Input, Modal } from "antd"
import React, { useState } from "react"

const AddRole = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Button type="primary" key="add-admin" onClick={handleOpen}>
                Add Role
            </Button>
            <Modal title="Add New Role" open={open} onCancel={handleClose} footer={null}>
                <Form form={form} labelAlign="left" labelWrap labelCol={{ span: 6 }} wrapperCol={{ flex: 1 }}>
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
                </Form>
            </Modal>
        </>
    )
}

export default AddRole
