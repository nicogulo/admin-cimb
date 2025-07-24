'use client';

import React, {useState} from "react";
import {Button, Form, Input, Modal, Radio, Tooltip} from "antd";
import {SettingOutlined} from "@ant-design/icons";

export const UpdateAdminForm = ({data}: {data: any}) => {
    const [form] = Form.useForm();

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCreate = async () => {
        await form.validateFields();
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            form.resetFields();
        }, 2000);
    };

    const onCancel = () => {
        setOpen(false);
    }

    return (
        <div>
            <Tooltip title="Update Admin">
                <Button
                    icon={<SettingOutlined />}
                    onClick={() => {
                        setOpen(true);
                    }}
                />
            </Tooltip>

            <Modal
                open={open}
                title="Update Admin"
                okText="Update"
                cancelText="Cancel"
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                onOk={onCreate}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{ full_name: data.full_name, email: data.email, status: data.status }}
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
                        rules={[]}
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
                </Form>
            </Modal>
        </div>
    );
};
