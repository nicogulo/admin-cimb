import { MenuUnfoldOutlined } from "@ant-design/icons"
import { formatDate } from "@utils/date"
import { Button, Card, Drawer, Flex, Image, Table, Tag } from "antd"
import { useTranslation } from "next-i18next"
import React, { useState } from "react"

import dynamic from "next/dynamic"
import { imgaePlaceHolder } from "const/image-place-holder"
import { When } from "react-if"

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false })

interface TransactionDetailProps {
    data: TransactionData
    cif: string
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ data }) => {
    const { t } = useTranslation("common")

    const [open, setOpen] = useState(false)
    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    const parsed = JSON.parse(JSON.parse(data?.zoloz_result_log))

    return (
        <>
            <Button icon={<MenuUnfoldOutlined />} onClick={showDrawer} size="small" />

            <Drawer title={t("transaction_details")} placement="right" onClose={onClose} open={open} width="70%">
                <Flex vertical gap={16}>
                    <Flex gap={16}>
                        <When condition={parsed?.image1_base64}>
                            <Card
                                title={t("base_face_photo")}
                                style={{
                                    width: "100%",
                                    marginTop: 16,
                                    textAlign: "center"
                                }}
                            >
                                <Image
                                    src={parsed?.image1_base64}
                                    alt="Base Face"
                                    style={{ maxWidth: "100%", height: "auto" }}
                                    fallback={imgaePlaceHolder}
                                />
                            </Card>
                        </When>
                        <When condition={parsed?.image2_base64}>
                            <Card
                                title={t("face_compare_logs")}
                                style={{
                                    width: "100%",
                                    marginTop: 16,
                                    textAlign: "center"
                                }}
                            >
                                <Image
                                    src={parsed?.image2_base64}
                                    alt="Compare Face"
                                    style={{ maxWidth: "100%", height: "auto" }}
                                    fallback={imgaePlaceHolder}
                                />
                            </Card>
                        </When>
                    </Flex>
                    <Card
                        style={{
                            width: "100%",
                            marginTop: 16,
                            textAlign: "center"
                        }}
                    >
                        <Table
                            dataSource={[data]}
                            pagination={false}
                            columns={[
                                {
                                    title: t("transaction_id"),
                                    dataIndex: "id",
                                    key: "id"
                                },
                                {
                                    title: t("zoloz_trx_id"),
                                    dataIndex: "zoloz_trx_id",
                                    key: "zoloz_trx_id"
                                },
                                {
                                    title: t("date_time"),
                                    dataIndex: "created_at",
                                    key: "created_at",
                                    render: (text: string) => formatDate(text, "DD MMM YYYY, HH:mm")
                                },
                                {
                                    title: t("cif"),
                                    dataIndex: "cif",
                                    key: "cif"
                                },
                                {
                                    title: t("channel"),
                                    dataIndex: "channel",
                                    key: "channel"
                                },
                                {
                                    title: t("action"),
                                    dataIndex: "action",
                                    key: "action"
                                },
                                {
                                    title: t("status"),
                                    dataIndex: "status",
                                    key: "status",
                                    render: (text: string) => (
                                        <Tag color={text === "Success" ? "green" : "red"}>{text}</Tag>
                                    )
                                }
                            ]}
                            scroll={{ x: "max-content" }}
                        />
                    </Card>
                    <Card
                        title={t("zoloz_result_log")}
                        style={{
                            width: "100%",
                            marginTop: 16,
                            textAlign: "center"
                        }}
                    >
                        <ReactJson
                            src={parsed ? parsed : {}}
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
                    </Card>
                </Flex>
            </Drawer>
        </>
    )
}

export default TransactionDetail
