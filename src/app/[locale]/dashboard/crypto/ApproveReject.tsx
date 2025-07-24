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
const formatter = (code: string) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: code,

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 9, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
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

        const res = await fetch(`${API_URL}/crypto/${data.uid}/approve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        await res.json();

        setConfirmLoading(false);
        setOpen(false);
        onRefresh?.();
        await AddAdminLog("approve_send_coin", null, null)
        message.success("Send Coin Success");
    };

    const onReject = async () => {
        setConfirmLoading(true);

        const res = await fetch(`${API_URL}/crypto/${data.uid}/reject`, {
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
        await AddAdminLog("reject_send_coin", null, {
            reason : reason
        })
        message.success("Reject Send Coin");
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
            label: "Code",
            children: `${data.asset_code}`,
        },
        {
            key: "3",
            label: "Destination Address",
            children: `${data.to_address}`,
        },
        {
            key: "4",
            label: "Chain",
            children: `${data.chain_name}`,
        },
        {
            key: "5",
            label: "Street Address Name",
            children: `${data.street_address_name}`,
        },
        {
            key: "6",
            label: "Street Address Details",
            children: `${data.street_address_details}`,
        },
        {
            key: "7",
            label: "Amount",
            children: `${formatter(data.asset_code).format(data.qty)}`,
        },
    ];

    return (
        <div>
            <Tooltip title="Senc Coin Action">
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
                title="Send Coin Action"
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