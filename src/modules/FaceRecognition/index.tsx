import Builder from "@verihubs/liveness"

import React, { useCallback, useEffect, useState } from "react"

// import useUpload from '@/hooks/useUpload';

// import Button from '@/components/Button';
// import Icons from '@/components/Icon';
// import { Else, If, Then } from '@/components/If';
// import { toast } from '@/components/Toast';

import { VERIHUB_APP_ID, VERIHUB_APP_KEY, VERIHUB_LICENCE_ID, VERIHUB_URL } from "@config/config"

import { Button, Image, message } from "antd"
import { Else, If, Then } from "react-if"
import { CameraOutlined } from "@ant-design/icons"
import { imgaePlaceHolder } from "const/image-place-holder"

interface Props {
    onBack: () => void
    onNext: () => void
}

const FacialRecognition: React.FC<Props> = ({ onBack, onNext }) => {
    const [image, setImage] = useState<string | null>(null)
    const [blob, setBlob] = useState<File | null>(null)
    // const { upload, loading } = useUpload()

    // const handleSubmit = () => {
    //     if (blob) {
    //         upload({
    //             type: "liveness",
    //             file: blob
    //         })
    //             .then((res) => {
    //                 if (res) {
    //                     toast.success("Berhasil upload foto")
    //                     setTimeout(() => {
    //                         onNext()
    //                     }, 1000)
    //                 }
    //             })
    //             .catch(() => {
    //                 toast.error("Gagal upload foto")
    //             })
    //     }
    // }

    const appId = VERIHUB_APP_ID ?? ""
    const appKey = VERIHUB_APP_KEY ?? ""

    const base64ToFile = (base64: string, fileName: string): File | null => {
        if (!base64 || typeof base64 !== "string") {
            console.error("Invalid Base64 string")
            return null
        }

        const [header, base64Data] = base64.split(",")

        if (!base64Data) {
            console.error("Invalid Base64 format")
            return null
        }

        const mimeType = header.match(/:(.*?);/)?.[1]

        if (!mimeType) {
            console.error("Invalid MIME type")
            return null
        }

        const buffer = Buffer.from(base64Data, "base64")

        return new File([buffer], fileName, { type: mimeType })
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
    }, [])

    useEffect(() => {
        const livenessMessageListener = ({ data: { data, subject } }: { data: any; subject: string }) => {
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

                    // eslint-disable-next-line no-case-declarations
                    const file = base64ToFile(`data:image/png;base64,${data.image.url}`, "image/png")
                    setBlob(file)

                    // if (file) {
                    //     upload({
                    //         type: "liveness",
                    //         file: file
                    //     })
                    //         .then(() => {
                    //             toast.success("Berhasil upload foto")
                    //             setTimeout(() => {
                    //                 onNext()
                    //             }, 1000)
                    //         })
                    //         .catch(() => {
                    //             toast.error("Gagal upload foto")
                    //         })
                    // }

                    break

                default:
                    console.log({ data, subject })

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
    }, [image, onNext])

    console.log({ blob, image })

    const doLivenessVerification = useCallback(() => {
        if (typeof window !== "undefined") {
            setTimeout(() => {
                ;(window as any).LivenessSDK?.onStart()
            }, 100)
        }
    }, [])

    const handleBack = () => {
        ;(window as any).LivenessSDK?.onDestroy()
        onBack()
    }

    return (
        <>
            <div className="flex flex-col items-center gap-6 ">
                <div className="flex max-w-[480px] flex-col items-start gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-bold text-[#18181E]">Facial Recognition</p>

                        <p className="text-sm font-normal text-[#525D66]">
                            Kami akan merekam wajah Anda untuk memverifikasi data biometrik dengan menganalisis dan
                            membandingkannya dengan data referensi.
                        </p>
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <Image alt="liveness" src={image || ""} fallback={imgaePlaceHolder} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 rounded-lg bg-[#F2F6FA] p-4">
                            <p className="text-xs font-normal uppercase text-[#758089]">
                                Panduan untuk Pengenalan Wajah
                            </p>
                            <ul className="ml-6 list-disc text-sm font-normal text-[#525D66]">
                                <li>Pastikan seluruh wajah Anda terlihat dan berada di tengah bingkai.</li>
                                <li>
                                    Pastikan wajah Anda diterangi dengan baik, hindari bayangan atau pencahayaan dari
                                    belakang.
                                </li>
                                <li>Jangan menggunakan topi, kacamata, atau apa pun yang menutupi wajah Anda.</li>
                                <li>Pertahankan ekspresi alami, hindari membuat ekspresi yang berlebihan.</li>
                                <li>Pegang kamera dengan stabil dan pada jarak sepanjang lengan.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex w-full flex-row justify-end gap-4 ">
                        <Button className="w-[120px]" onClick={handleBack}>
                            Kembali
                        </Button>
                        <If condition={!image}>
                            <Then>
                                <Button
                                    onClick={doLivenessVerification}
                                    // disabled={loading} loading={loading}
                                >
                                    <CameraOutlined width={20} height={20} /> Klik untuk memulai
                                </Button>
                            </Then>
                            <Else>
                                <Button
                                // onClick={handleSubmit} disabled={loading} loading={loading}
                                >
                                    Kirim
                                </Button>
                            </Else>
                        </If>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FacialRecognition
