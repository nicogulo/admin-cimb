import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import { useTheme } from "next-themes"
import { Button, Dropdown, MenuProps, theme as antdTheme } from "antd"
import { Else, If, Then } from "react-if"

import { LoginOutlined } from "@ant-design/icons"
import useAuth, { useLogout } from "@hooks/useAuth"
import Icons from "@icons/icon"
import IconMoon from "@icons/Images/Moon"
import IconSun from "@icons/Images/Sun"

const ThemeToggle = () => {
    const { setTheme, theme } = useTheme()
    const { t } = useTranslation("common")

    const onClick: MenuProps["onClick"] = ({ key }) => {
        setTheme(key)
    }

    const items: MenuProps["items"] = [
        {
            key: "light",
            label: (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Icons icon={<IconSun />} width={16} height={16} />
                    <span>{t("light") || "Light"}</span>
                </div>
            )
        },
        {
            key: "dark",
            label: (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Icons icon={<IconMoon />} width={16} height={16} />
                    <span>{t("dark") || "Dark"}</span>
                </div>
            )
        }
    ]

    return (
        <Dropdown
            menu={{
                items,
                selectable: true,
                selectedKeys: [theme ?? "system"],
                onClick
            }}
            trigger={["click"]}
        >
            <span
                style={{
                    cursor: "pointer"
                }}
            >
                {theme === "system" ? (
                    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? (
                        <Icons icon={<IconMoon />} width={20} height={20} />
                    ) : (
                        <Icons icon={<IconSun />} width={20} height={20} />
                    )
                ) : theme === "light" ? (
                    <Icons icon={<IconSun />} width={20} height={20} />
                ) : (
                    <Icons icon={<IconMoon />} width={20} height={20} />
                )}
            </span>
        </Dropdown>
    )
}

const DashboardTopbar: React.FC = () => {
    const { token } = antdTheme.useToken()
    const [isLoading, setLoading] = useState(false)

    const {
        auth: { isLoggedIn }
    } = useAuth()
    const { logout } = useLogout()

    const handleLogout = () => {
        setLoading(true)
        setTimeout(() => {
            logout(true)
        }, 1000)
        setLoading(false)
    }

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 24,
                padding: "12px 24px",
                background: token.colorBgContainer,
                borderBottom: `1px solid ${token.colorBorder}`,
                minHeight: 56,
                position: "sticky",
                top: 0,
                zIndex: 5
            }}
        >
            {/* LocaleSwitcher & ThemeSwitcher hidden for now */}
            <ThemeToggle />
            <If condition={isLoggedIn}>
                <Then>
                    <Button
                        type="primary"
                        danger
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={handleLogout}
                        icon={<LoginOutlined />}
                    >
                        Log out
                    </Button>
                </Then>
                <Else>asdsa</Else>
            </If>
        </div>
    )
}

export default DashboardTopbar
