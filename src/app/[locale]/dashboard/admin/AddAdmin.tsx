'use client';

import React, {useState} from "react";
import {Button, Form, Input, Modal, Radio, Tooltip} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import {API_URL} from "@/config/config";

export const CreateAdminForm = () => {
    const [form] = Form.useForm();

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCreate = async () => {
        await form.validateFields();
        setConfirmLoading(true);
        const res = await fetch(`${API_URL}/admins`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: form.getFieldValue('full_name'),
                email: form.getFieldValue('email'),
                password: form.getFieldValue('password'),
                status: form.getFieldValue('status'),
                level: form.getFieldValue('level'),
            }),
        })
        await res.json()

        setOpen(false);
        setConfirmLoading(false);
        form.resetFields();
    };

    const onCancel = () => {
        setOpen(false);
    }

    return (
        <div>
            <Tooltip title="Create New Admin">
                <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Create Admin
                </Button>
            </Tooltip>

            <Modal
                open={open}
                title="Create a new admin"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                onOk={onCreate}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="full_name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input the full name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input the password!' }]}
                    >
                        <Input
                            type="password"
                        />
                    </Form.Item>
                    <Form.Item name="status" className="collection-create-form_last-form-item" rules={[{ required: true, message: 'Please select the status!' }]}>
                        <Radio.Group>
                            <Radio value="1">Active</Radio>
                            <Radio value="0">Deactivate</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="level" className="collection-create-form_last-form-item" rules={[{ required: true, message: 'Please select the status!' }]}>
                        <Radio.Group>
                            <Radio value="0">Super Admin</Radio>
                            <Radio value="1">KYC</Radio>
                            <Radio value="2">Accounting</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
