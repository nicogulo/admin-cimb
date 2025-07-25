import React from "react"
import { LoginOutlined } from "@ant-design/icons"
import LocaleSwitcher from "@components/LocaleSwitcher"
import { useTheme } from "next-themes"
import { theme as antdTheme } from "antd"
import Icons from "@icons/icon"
import IconSun from "@icons/Images/Sun"
import IconMoon from "@icons/Images/Moon"
import IconLaptop from "@icons/Images/Laptop"
import { Dropdown } from "antd"

const DashboardTopbar: React.FC = () => {
    const { setTheme, theme } = useTheme()
    const { token } = antdTheme.useToken()
    const handleLogout = () => {
        localStorage.removeItem("admin")
        window.location.href = "/auth/sign-in"
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
            <LocaleSwitcher />
            <Dropdown menu={{ items: themeDropdownItems }} trigger={["click"]} placement="bottomRight">
                <span
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 8px",
                        borderRadius: "4px",
                        transition: "background-color 0.2s",
                        background: "none"
                    }}
                >
                    {theme === "light" && (
                        <Icons icon={<IconSun />} width={20} height={20} style={{ color: token.colorText }} />
                    )}
                    {theme === "dark" && (
                        <Icons icon={<IconMoon />} width={20} height={20} style={{ color: token.colorText }} />
                    )}
                    {theme === "system" && (
                        <Icons icon={<IconLaptop />} width={20} height={20} style={{ color: token.colorText }} />
                    )}
                </span>
            </Dropdown>
            <button
                onClick={handleLogout}
                style={{
                    padding: "8px 16px",
                    background: "#ed3939",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                }}
            >
                <LoginOutlined /> Log out
            </button>
        </div>
    )
}

export default DashboardTopbar
