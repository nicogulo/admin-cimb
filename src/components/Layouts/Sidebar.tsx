import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Menu, MenuProps } from "antd"
import {
    HomeOutlined,
    TeamOutlined,
    FileSearchOutlined,
    ContactsOutlined,
    UserOutlined,
    LoginOutlined,
    TransactionOutlined
} from "@ant-design/icons"
import Icons from "@icons/icon"

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { theme as antdTheme } from "antd"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import { useTheme } from "next-themes"

const Sidebar: React.FC = () => {
    const router = useRouter()
    const { t } = useTranslation("common")
    const [adminDetails, setAdminDetails] = useState<any>({})
    const [collapsed, setCollapsed] = useState(false)
    const { token } = antdTheme.useToken()
    const { theme } = useTheme()
    const isDarkMode = theme === "dark"

    useEffect(() => {
        const member = localStorage.getItem("admin")
        if (member) {
            const memberJson = JSON.parse(member)
            setAdminDetails(memberJson)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("admin")
        window.location.href = "/auth/sign-in"
    }

    const menuItems: MenuProps["items"] = [
        {
            key: "home",
            icon: <HomeOutlined />,
            label: <Link href="/">Home</Link>
        },
        {
            key: "customer-management",
            icon: <TeamOutlined />,
            label: <Link href="/customer-management">{t("customer_management.title")}</Link>
        },
        {
            key: "transactions",
            icon: <TransactionOutlined />,
            label: <Link href="/transactions">{t("transactions")}</Link>
        },
        {
            key: "admin",
            icon: <ContactsOutlined />,
            label: t("admin"),
            children: [
                {
                    key: "admin",
                    label: <Link href="/admin">{t("admin_list")}</Link>
                },
                {
                    key: "admin-log",
                    label: <Link href="/admin/log">{t("admin_log")}</Link>
                },
                {
                    key: "admin-role",
                    label: <Link href="/admin/role">{t("admin_role")}</Link>
                }
            ]
        },
        {
            key: "profile",
            icon: <UserOutlined />,
            label: <Link href="/profile">{t("profile")}</Link>
        }
    ]

    if (router.locale !== "en") {
        router.replace(router.pathname, router.asPath, { locale: "en" })
    }
    const currentPath = router.pathname
    const selectedKeys: string[] = []

    switch (currentPath) {
        case "/":
            selectedKeys.push("home")
            break
        case "/customer-management":
            selectedKeys.push("customer-management")
            break
        case "/transactions":
            selectedKeys.push("transactions")
            break
        case "/admin":
            selectedKeys.push("admin")
            break
        case "/admin/log":
            selectedKeys.push("admin-log")
            break
        case "/admin/role":
            selectedKeys.push("admin-role")
            break
        case "/profile":
            selectedKeys.push("profile")
            break
        default:
            selectedKeys.push("home")
    }

    return (
        <div
            style={{
                width: collapsed ? 80 : 260,
                minHeight: "100vh",
                background: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBorder}`,
                transition: "width 0.2s",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "space-between",
                    padding: "24px 16px"
                }}
            >
                <Image
                    src={isDarkMode ? "/images/logo-dark.png" : "/images/logo-light.png"}
                    alt="Company Logo"
                    width={collapsed ? 32 : 40}
                    height={collapsed ? 32 : 40}
                />
                <button
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "20px",
                        marginLeft: collapsed ? 0 : 8
                    }}
                    onClick={() => setCollapsed((prev) => !prev)}
                    aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
            </div>
            {/* Menu utama */}
            <div style={{ flex: 1 }}>
                <Menu
                    mode="inline"
                    selectedKeys={selectedKeys}
                    defaultOpenKeys={[]}
                    items={menuItems}
                    inlineCollapsed={collapsed}
                    style={{ border: "none", background: "transparent" }}
                />
            </div>
        </div>
    )
}

export default Sidebar
