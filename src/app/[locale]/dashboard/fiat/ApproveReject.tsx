"use client";

import React, { useState } from "react";
import {
    Button,
    Descriptions,
    DescriptionsProps,
    Modal,
    Image,
    Tooltip,
    message,
    Form,
    Input,
} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    InteractionOutlined,
} from "@ant-design/icons";
import { API_URL } from "@/config/config";
import { FormatDateTime } from "@/utils/date";
import AddAdminLog from "@/components/AdminLogCompenent";
const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
export const ApproveReject = ({
                                  data,
                                  onRefresh,
                                  adminLevel,
                              }: {
    data: any;
    onRefresh: any;
    adminLevel: number;
}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");

    const onOpen = async () => {
        setConfirmLoading(true);
        setOpen(true);
        setConfirmLoading(false);
    };
    const onCreate = async () => {
        setConfirmLoading(true);

        const res = await fetch(`${API_URL}/fiats/${data.uid}/approve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        await res.json();

        setConfirmLoading(false);
        setOpen(false);
        onRefresh?.();
        await AddAdminLog("approve_withdraw", null, {
            reason : reason
        })
        message.success("Withdraw Success");
    };

    const onReject = async () => {
        setConfirmLoading(true);

        const res = await fetch(`${API_URL}/fiats/${data.uid}/reject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reason,
            }),
        });
        await res.json();

        setConfirmLoading(false);
        setOpen(false);
        onRefresh?.();
        await AddAdminLog("reject_withdraw", null, {
            reason : reason
        })
        message.success("Reject Withdraw");
    };

    const onCancel = () => {
        setOpen(false);
    };

    const items: DescriptionsProps["items"] = [
        {
            key: "1",
            label: "Created At",
            children: FormatDateTime(data.created_at),
        },
        {
            key: "2",
            label: "Bank",
            children: `${data.bank_name}`,
        },
        {
            key: "3",
            label: "Bank Account Name",
            children: `${data.virtual_account_name?data.virtual_account_name:data.bank_member_name}`,
        },
        {
            key: "4",
            label: "Bank Account Number",
            children: `${data.virtual_account_number?data.virtual_account_number:data.bank_member_number}`,
        },
        {
            key: "5",
            label: "Amount (IDR)",
            children: `${formatter.format(data.qty)}`,
        },
    ];

    return (
        <div>
            <Tooltip title="Withdraw Action">
                <Button
                    disabled={
                        adminLevel === 1 ||
                        adminLevel === 4 ||
                        (data.status === 1 || data.status === 2)
                    }
                    icon={<InteractionOutlined />}
                    onClick={onOpen}
                />
            </Tooltip>

            <Modal
                width={800}
                open={open}
                title="Withdraw Action"
                okText={
                    <>
                        <CheckOutlined/> Approve
                    </>
                }
                cancelText="Cancel"
                onCancel={onCancel}
                confirmLoading={confirmLoading}
                onOk={onCreate}
                footer={(_, {OkBtn, CancelBtn}) => (
                    <>
                        <CancelBtn/>
                        <OkBtn/>
                        <Button type="primary" disabled={confirmLoading} onClick={onReject}>
                            <CloseOutlined/> Reject
                        </Button>
                    </>
                )}
            >
                <br/>
                <Descriptions column={2} size={"small"} items={items}/>
                <br/>
                <br/>
                <Form.Item
                    name="reason"
                    label="Reason"
                    rules={[
                        {
                            message: "Input something!",
                        },
                    ]}
                >
                    <Input
                        placeholder="reason!"
                        disabled={false}
                        onChange={(v) => setReason(v.target.value)}
                    />
                </Form.Item>
            </Modal>
        </div>
    );
};