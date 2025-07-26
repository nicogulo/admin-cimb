import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Card, theme } from "antd"

import useAuth from "@hooks/useAuth"
import Icons from "@icons/icon"
import IconNotificationRing from "@icons/Images/NotificationRing"
import LayoutDashboard from "@components/Layouts"

const ClockAPI = () => {
    const [dateState, setDateState] = useState(new Date())

    useEffect(() => {
        setInterval(() => {
            setDateState(new Date())
        }, 1000)
    }, [])

    return (
        <>
            {dateState.toLocaleString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            })}
        </>
    )
}

const Home: React.FC = () => {
    const { t } = useTranslation("common")
    const router = useRouter()

    const [adminLevel, setAdminLevel] = useState(0)
    const { auth } = useAuth()
    const { isLoggedIn } = auth
    const [adminDetails, setAdminDetails] = useState<any>({})

    useEffect(() => {
        // if (!isLoggedIn) {
        //     router.push("/auth/sign-in")
        //     return
        // }
        const member = localStorage.getItem("admin")
        if (member) {
            const memberJson = JSON.parse(member)
            setAdminLevel(memberJson?.level)
            setAdminDetails(memberJson)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, router])

    const {
        token: { colorText, colorTextTertiary }
    } = theme.useToken()

    return (
        <LayoutDashboard adminLevel={adminLevel}>
            <div style={{ padding: "24px" }}>
                <Card
                    title={
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Icons icon={<IconNotificationRing />} width={20} height={20} />
                            <span>{t("dashboard")}</span>
                        </div>
                    }
                >
                    <div style={{ color: colorText }}>
                        <p>
                            {t("welcome")} {adminDetails?.username}
                        </p>
                        <p style={{ color: colorTextTertiary }}>
                            <ClockAPI />
                        </p>
                    </div>
                </Card>
            </div>
        </LayoutDashboard>
    )
}

export default Home
