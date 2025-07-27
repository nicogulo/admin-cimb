import React, { useState } from "react"
import { LoginOutlined } from "@ant-design/icons"

import { useTheme } from "next-themes"
import { theme as antdTheme, Button, MenuProps } from "antd"
import Icons from "@icons/icon"
import IconSun from "@icons/Images/Sun"
import IconMoon from "@icons/Images/Moon"
import IconLaptop from "@icons/Images/Laptop"
import { Dropdown } from "antd"
import { useTranslation } from "next-i18next"
import useAuth, { useLogout } from "@hooks/useAuth"
import { Else, If, Then } from "react-if"

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
    const { setTheme, theme } = useTheme()
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

    const themeOptions = [
        {
            key: "light",
            icon: <Icons icon={<IconSun />} width={18} height={18} />,
            label: "Terang"
        },
        {
            key: "dark",
            icon: <Icons icon={<IconMoon />} width={18} height={18} />,
            label: "Gelap"
        },
        {
            key: "system",
            icon: <Icons icon={<IconLaptop />} width={18} height={18} />,
            label: "Sistem"
        }
    ]
    const themeDropdownItems = themeOptions.map((opt) => ({
        key: opt.key,
        label: (
            <div
                onClick={() => setTheme(opt.key)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 12px",
                    cursor: "pointer",
                    background: theme === opt.key ? token.colorPrimaryActive : "",
                    color: theme === opt.key ? "#fff" : token.colorText,
                    borderRadius: 6
                }}
            >
                {opt.icon}
                <span>{opt.label}</span>
            </div>
        )
    }))
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
                zIndex: 10
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
