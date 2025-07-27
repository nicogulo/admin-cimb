import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useTranslation } from "next-i18next"
import { Button, Card, Drawer, Flex, Image, message, Table, Tag, Tooltip } from "antd"
import { imgaePlaceHolder } from "const/image-place-holder"

import { MenuUnfoldOutlined } from "@ant-design/icons"
import { API_URL } from "@config/config"
import useAuth from "@hooks/useAuth"
import { formatDate } from "@utils/date"

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false })

interface CustomerDetailProps {
    cif: string
    data: any
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ cif }) => {
    const { t } = useTranslation("common")
    const { auth } = useAuth()
    const { token } = auth
    const [imageData, setImageData] = useState<any>(null)
    const [dataTransactions, setDataTransactions] = useState<any[]>([])

    const [open, setOpen] = useState(false)
    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    const getImage = async () => {
        try {
            const response = await fetch(`${API_URL}/api/v1/face/base/${cif}?include_image=true`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const { data } = await response.json()

            if (data?.image_data) {
                setImageData(data?.image_data)
            }
        } catch (error) {
            message.error("Failed to fetch customer image")
        }
    }

    const getTransactions = async () => {
        try {
            const response = await fetch(`${API_URL}/api/v1/face/transaction_list?cif=${cif}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const { data } = await response.json()

            if (data?.transactions) {
                setDataTransactions(data.transactions)
            }
        } catch (error) {
            message.error("Failed to fetch transactions")
        }
    }

    useEffect(() => {
        getImage()
        getTransactions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cif])

    return (
        <>
            <Button icon={<MenuUnfoldOutlined />} onClick={showDrawer} size="small" />
            <Drawer title={t("customer_management.title")} placement="right" onClose={onClose} open={open} width="70%">
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
                                src={imageData}
                                fallback={imgaePlaceHolder}
                                alt="Base Face"
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
                                    dataIndex: "id",
                                    key: "id",
                                    fixed: "left",
                                    align: "center",
                                    ellipsis: true,
                                    render: (url: string) => {
                                        if (!url) {
                                            return <span>-</span>
                                        }
                                        return (
                                            <Tooltip title={`Click to copy ${url}`}>
                                                <Button
                                                    type="text"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(url)
                                                        message.success("URL Copied")
                                                    }}
                                                    size="small"
                                                >
                                                    <span
                                                        style={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            width: "180px"
                                                        }}
                                                    >
                                                        {url}
                                                    </span>
                                                </Button>
                                            </Tooltip>
                                        )
                                    }
                                },

                                {
                                    title: "Zoloz Trx ID",
                                    dataIndex: "zoloz_trx_id",
                                    key: "zoloz_trx_id",
                                    fixed: "left",
                                    align: "center",
                                    ellipsis: true,
                                    render: (url: string) => {
                                        if (!url) {
                                            return <span style={{ textAlign: "center" }}>-</span>
                                        }
                                        return (
                                            <Tooltip title={`Click to copy ${url}`}>
                                                <Button
                                                    type="text"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(url)
                                                        message.success("URL Copied")
                                                    }}
                                                    size="small"
                                                >
                                                    <span
                                                        style={{
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            width: "180px"
                                                        }}
                                                    >
                                                        {url}
                                                    </span>
                                                </Button>
                                            </Tooltip>
                                        )
                                    }
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
                                    dataIndex: "created_at",
                                    key: "created_at",
                                    render: (date: string) => formatDate(date, "DD MMM YYYY HH:mm")
                                },
                                {
                                    title: "Status",
                                    dataIndex: "status",
                                    key: "status",
                                    align: "center",
                                    fixed: "right",
                                    render: (text: string) => (
                                        <Tag
                                            color={text === "Success" ? "green" : "red"}
                                            style={{ textTransform: "capitalize" }}
                                        >
                                            {text}
                                        </Tag>
                                    )
                                },
                                {
                                    title: "Action",
                                    dataIndex: "action",
                                    key: "action",
                                    fixed: "right"
                                }
                            ]}
                            dataSource={dataTransactions || []}
                            pagination={false}
                            scroll={{ x: "max-content" }}
                        />
                    </Card>

                    {/* <Card
                        title={t("zoloz_result_log")}
                        style={{
                            width: "100%",
                            textAlign: "center",
                            overflow: "auto"
                        }}
                    >
                        {dataTransactions?.map((log: any) => {
                            const parsed = JSON.parse(log?.zoloz_result_log)

                            return (
                                <ReactJson
                                    src={parsed || {}}
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
                    </Card> */}
                </Flex>
            </Drawer>
        </>
    )
}

export default CustomerDetail
