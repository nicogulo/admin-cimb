/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { useTheme } from "next-themes"
import { Avatar, Dropdown, Layout, Menu, MenuProps, Space, theme } from "antd"

import {
    ContactsOutlined,
    FileSearchOutlined,
    HomeOutlined,
    LoginOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons"
import LocaleSwitcher from "@components/LocaleSwitcher"
import Icons from "@icons/icon"
import CompanyLogo from "@icons/Images/CompanyLogo"
import IconLaptop from "@icons/Images/Laptop"
import IconMoon from "@icons/Images/Moon"
import IconSun from "@icons/Images/Sun"
import { resetAuth } from "@utils/auth"

const { Header } = Layout

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
        },
        {
            key: "system",
            label: (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Icons icon={<IconLaptop />} width={16} height={16} />
                    <span>{t("system") || "System"}</span>
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

const DashboardNavbar = ({ adminLevel }: { adminLevel: number | undefined }) => {
    const {
        token: { colorPrimary, colorPrimaryBg, colorBgContainer, colorText }
    } = theme.useToken()
    const router = useRouter()

    const { t } = useTranslation("common")

    const [adminDetails, setAdminDetails] = useState<any>({})

    useEffect(() => {
        const member = localStorage.getItem("admin")
        if (member) {
            const memberJson = JSON.parse(member)
            setAdminDetails(memberJson)
        }
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem("admin")
        resetAuth()
        router.push("/auth/sign-in")
    }

    const dropdownItems: MenuProps["items"] = [
        {
            label: (
                <span
                    style={{
                        color: "#ed3939",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8
                    }}
                    onClick={handleLogout}
                >
                    <LoginOutlined /> Log out
                </span>
            ),
            key: "0"
        }
    ]

    const menuItems: any = [
        {
            icon: <HomeOutlined />,
            key: "dashboard",
            label: <Link href="/dashboard">{t("dashboard") || "Dashboard"}</Link>
        },
        {
            icon: <TeamOutlined />,
            key: "member",
            label: <Link href="/dashboard/member">{t("member") || "Members"}</Link>
        },
        {
            icon: <FileSearchOutlined />,
            key: "kyc",
            label: <Link href="/dashboard/kyc">KYC</Link>
        },
        {
            icon: <ContactsOutlined />,
            key: "crypto",
            label: <Link href="/dashboard/crypto">Crypto</Link>
        },
        {
            icon: <ContactsOutlined />,
            key: "fiat",
            label: <Link href="/dashboard/fiat">Fiat</Link>
        },
        {
            icon: <ContactsOutlined />,
            key: "trade",
            label: <Link href="/dashboard/trade">Trade</Link>
        },
        {
            icon: <ContactsOutlined />,
            key: "admin",
            label: <Link href="/dashboard/admin">{t("admin") || "Admin"}</Link>
        },
        {
            icon: <ContactsOutlined />,
            key: "logs",
            label: <Link href="/dashboard/logs">Logs</Link>
        }
    ]

    // Get current path for menu selection
    const currentPath = router.pathname
    const selectedKeys = []
    if (currentPath.includes("/member")) selectedKeys.push("member")
    else if (currentPath.includes("/kyc")) selectedKeys.push("kyc")
    else if (currentPath.includes("/crypto")) selectedKeys.push("crypto")
    else if (currentPath.includes("/fiat")) selectedKeys.push("fiat")
    else if (currentPath.includes("/trade")) selectedKeys.push("trade")
    else if (currentPath.includes("/admin")) selectedKeys.push("admin")
    else if (currentPath.includes("/logs")) selectedKeys.push("logs")
    else selectedKeys.push("dashboard")

    return (
        <Header
            style={{
                padding: "16px 24px",
                margin: 0,
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                background: colorBgContainer
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        height: "64px",
                        cursor: "pointer"
                    }}
                    onClick={() => router.push("/dashboard")}
                >
                    <Icons icon={<CompanyLogo />} width={32} height={32} />
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        margin: "0 24px",
                        overflow: "hidden"
                    }}
                >
                    <Menu
                        mode="horizontal"
                        selectedKeys={selectedKeys}
                        items={menuItems}
                        style={{
                            width: "100%",
                            border: "none",
                            background: "transparent"
                        }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16
                    }}
                >
                    <ThemeToggle />
                    <LocaleSwitcher />

                    <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                        <div onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
                            <Space>
                                <Avatar
                                    style={{
                                        color: colorPrimary,
                                        backgroundColor: colorPrimaryBg
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <span
                                    style={{
                                        color: colorText,
                                        fontSize: "14px",
                                        lineHeight: "1.5715",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis"
                                    }}
                                    title="Admin"
                                >
                                    {adminDetails?.name || "Admin"}
                                </span>
                            </Space>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}

export default DashboardNavbar
