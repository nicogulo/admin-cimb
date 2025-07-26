import { MenuUnfoldOutlined } from "@ant-design/icons"
import { Button, Card, Drawer, Flex, Image, Table, Tag } from "antd"
import { useTranslation } from "next-i18next"
import React, { useState } from "react"

import dynamic from "next/dynamic"
import { imgaePlaceHolder } from "const/image-place-holder"

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false })

interface CustomerDetailProps {
    cif: string
    data: any
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ cif, data }) => {
    const { t } = useTranslation("common")

    const [open, setOpen] = useState(false)
    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button icon={<MenuUnfoldOutlined />} onClick={showDrawer} size="small" />
            <Drawer title={t("customer_management.title")} placement="right" onClose={onClose} open={open} width="50%">
                <Flex vertical gap={16}>
                    <Flex gap={16}>
                        <Card
                            title={t("base_face_photo")}
                            style={{
                                width: "100%",
                                marginTop: 16,
                                textAlign: "center"
                            }}
                        >
                            <Image
                                src={data.baseFacePhoto || "/images/no-image.png"}
                                fallback={imgaePlaceHolder}
                                alt="Base Face"
                                style={{ width: "100%", height: "auto" }}
                            />
                        </Card>
                        <Card
                            title={t("face_compare_logs")}
                            style={{
                                width: "100%",
                                marginTop: 16,
                                textAlign: "center"
                            }}
                        >
                            <Image
                                src={data.logs[0]?.currentFace || "/images/no-image.png"}
                                fallback={imgaePlaceHolder}
                                alt="Current Face"
                                style={{ width: "100%", height: "auto" }}
                            />
                        </Card>
                    </Flex>
                    <Card
                        style={{
                            width: "100%",
                            marginTop: 16,
                            textAlign: "center"
                        }}
                    >
                        <Table
                            columns={[
                                {
                                    title: "Trx ID",
                                    dataIndex: "trxId",
                                    key: "trxId",
                                    fixed: "left"
                                },
                                {
                                    title: "Zoloz Trx ID",
                                    dataIndex: "zoloTrxId",
                                    key: "zoloTrxId",
                                    fixed: "left"
                                },

                                {
                                    title: "CIF",
                                    dataIndex: "cif",
                                    key: "cif"
                                },
                                {
                                    title: "Channel",
                                    dataIndex: "channel",
                                    key: "channel"
                                },
                                {
                                    title: "Date Time",
                                    dataIndex: "dateTime",
                                    key: "dateTime"
                                },
                                {
                                    title: "Status",
                                    dataIndex: "status",
                                    key: "status",
                                    align: "center",
                                    fixed: "right",
                                    render: (text: string) => (
                                        <Tag color={text === "Success" ? "green" : "red"}>{text}</Tag>
                                    )
                                },
                                {
                                    title: "Action",
                                    dataIndex: "action",
                                    key: "action",
                                    fixed: "right"
                                }
                            ]}
                            dataSource={data.logs || []}
                            pagination={false}
                            scroll={{ x: "max-content" }}
                        />
                    </Card>

                    <Card
                        title={t("zoloz_result_log")}
                        style={{
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {data?.logs?.map((log: any) => {
                            return (
                                <ReactJson
                                    src={log.zoloResultLog || {}}
                                    name={false}
                                    enableClipboard
                                    collapsed={2}
                                    displayDataTypes={false}
                                    style={{
                                        fontSize: 13,
                                        textAlign: "left",
                                        backgroundColor: "#fff",
                                        padding: "12px",
                                        fontFamily: "monospace"
                                    }}
                                />
                            )
                        })}
                    </Card>
                </Flex>
            </Drawer>
        </>
    )
}

export default CustomerDetail
