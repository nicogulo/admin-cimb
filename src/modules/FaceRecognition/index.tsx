import React, { useCallback, useEffect, useState } from "react"
import { Button, Form, Input, message, Result, Select } from "antd"
import { Else, If, Then } from "react-if"

import LayoutDashboard from "@components/Layouts"
// import useUpload from '@/hooks/useUpload';
// import Button from '@/components/Button';
// import Icons from '@/components/Icon';
// import { Else, If, Then } from '@/components/If';
// import { toast } from '@/components/Toast';
import { API_URL, VERIHUB_APP_ID, VERIHUB_APP_KEY, VERIHUB_LICENCE_ID, VERIHUB_URL } from "@config/config"
import useAuth from "@hooks/useAuth"
import Builder from "@verihubs/liveness"

interface Props {
    onBack: () => void
    onNext: () => void
}

// Registration
// Forget Password
// Change Pin
// Feature Activation
// Limit Increase
// Download E-Statement
// Change Email
// Request Card
// Change Debit Card

const actiionOptions = [
    {
        label: "Registration",
        value: "Registration"
    },
    {
        label: "Forget Password",
        value: "Forget Password"
    },
    {
        label: "Change Pin",
        value: "Change Pin"
    },
    {
        label: "Feature Activation",
        value: "Feature Activation"
    },
    {
        label: "Limit Increase",
        value: "Limit Increase"
    },
    {
        label: "Download E-Statement",
        value: "Download E-Statement"
    },
    {
        label: "Change Email",
        value: "Change Email"
    },
    {
        label: "Request Card",
        value: "Request Card"
    },
    {
        label: "Change Debit Card",
        value: "Change Debit Card"
    }
]

const channelOptions = [
    {
        label: "OctoMobile",
        value: "OctoMobile"
    },
    {
        label: "SSB",
        value: "SSB"
    },
    {
        label: "Website",
        value: "Website"
    }
]

const FacialRecognition: React.FC<Props> = ({ onBack, onNext }) => {
    const [form] = Form.useForm()
    const [image, setImage] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        auth: { token }
    } = useAuth()

    const appId = VERIHUB_APP_ID ?? ""
    const appKey = VERIHUB_APP_KEY ?? ""

    const handleSubmit = async (base64: string) => {
        const isRegistration = form.getFieldValue("action") === "Registration"

        try {
            const response = await fetch(`${API_URL}/api/v1/face/${isRegistration ? "save" : "liveness"}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    cif: form.getFieldValue("cif"),
                    channel: form.getFieldValue("channel"),
                    action: form.getFieldValue("action"),
                    image_base64: isRegistration ? base64 : undefined,
                    image_1: isRegistration ? undefined : base64,
                    zoloz_result_log: isRegistration ? undefined : "{success: true}"
                })
            })
            const res = await response.json()

            if (res.status === "success") {
                message.success("Data submitted successfully")
                setIsSuccess(true)
            }
            if (res.status) {
                message.success("Data submitted successfully")
                setIsSuccess(true)
            }
        } catch (error) {
            message.error("Failed to submit data")
        }
    }

    useEffect(() => {
        ;(window as any).LivenessSDK = new Builder()
            .setCredential({
                clientId: appId,
                secret: appKey
            })
            .setInstruction([], {
                commands: []
            })
            .setProxyMiddleware({
                PassiveLiveness: {
                    url: `${VERIHUB_URL}/liveness/face`
                },
                License: {
                    url: `${VERIHUB_URL}/${VERIHUB_LICENCE_ID}/check`
                }
            })
            .setTimeout(60000)
            .setURL("../../liveness")
            .setVirtualCameraLabel(["OBS", "Virtual"])
            .build()

        return () => {
            ;(window as any).LivenessSDK?.onDestroy()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const livenessMessageListener = ({ data: { data, subject } }: { data: any; subject: string }) => {
            const file = `data:image/png;base64,${data?.image?.url}`
            switch (subject) {
                case "Verification.Verbose":
                    break

                case "Camera.NotAllowed":
                case "Camera.NotFound":
                case "Camera.PermissionDenied":
                case "ScreenOrientation.NotAllowed":
                case "Verification.Disrupted":
                case "Verification.Timeout":
                    message.error(`Terjadi kesalahan: ${subject}`)

                    setTimeout(() => {
                        message.info("Sedang memulai ulang, harap tunggu...")
                        ;(global as any).LivenessSDK.onStart()
                    }, 1500)
                    break

                case "Verification.Success":
                    setTimeout(() => {
                        setImage(`data:image/png;base64,${data.image.url}`)
                        ;(global as any).LivenessSDK.onDestroy()
                    }, 1500)

                    if (data.image.url) {
                        handleSubmit(file)
                    }

                    break

                default:
                    break
            }
        }

        if (typeof window !== "undefined") {
            window.addEventListener("message", livenessMessageListener as unknown as EventListener)
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("message", livenessMessageListener as unknown as EventListener)
                ;(window as any).LivenessSDK?.onDestroy()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, image, onNext, token])

    const doLivenessVerification = useCallback(() => {
        if (typeof window !== "undefined") {
            setTimeout(() => {
                ;(window as any).LivenessSDK?.onStart()
            }, 100)
        }
    }, [])

    // const handleBack = () => {
    //     ;(window as any).LivenessSDK?.onDestroy()
    //     onBack()
    // }

    return (
        <LayoutDashboard title="Facial Recognition">
            <If condition={isSuccess}>
                <Then>
                    <Result
                        status="success"
                        title="Liveness Verification Successful"
                        subTitle="Your liveness verification has been completed successfully."
                    />
                </Then>
                <Else>
                    <Form
                        form={form}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                        style={{ width: 600 }}
                        onFinish={doLivenessVerification}
                    >
                        <Form.Item label="CIF" name="cif" rules={[{ required: true, message: "Please enter CIF" }]}>
                            <Input placeholder="Enter CIF" style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Action"
                            name="action"
                            rules={[{ required: true, message: "Please select an action" }]}
                        >
                            <Select options={actiionOptions} placeholder="Select Action" style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Channel"
                            name="channel"
                            rules={[{ required: true, message: "Please select a channel" }]}
                        >
                            <Select options={channelOptions} placeholder="Select Channel" style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Start Liveness Simulation
                            </Button>
                        </Form.Item>
                    </Form>
                </Else>
            </If>
        </LayoutDashboard>
    )
}

export default FacialRecognition
