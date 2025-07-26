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
import CompanyLogo from "@icons/Images/CompanyLogo"

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { theme as antdTheme } from "antd"
import { useTranslation } from "next-i18next"

const Sidebar: React.FC = () => {
    const router = useRouter()
    const { t } = useTranslation("common")
    const [adminDetails, setAdminDetails] = useState<any>({})
    const [collapsed, setCollapsed] = useState(false)
    const { token } = antdTheme.useToken()

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

    // Example menu with submenus
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
                    key: "admin-log",
                    label: <Link href="/admin/log">{t("admin_log")}</Link>
                },
                {
                    key: "admin-settings",
                    label: <Link href="/admin/settings">{t("admin_settings")}</Link>
                },
                {
                    key: "role",
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

    // Get current path for menu selection
    // Set default language to English
    if (router.locale !== "en") {
        router.replace(router.pathname, router.asPath, { locale: "en" })
    }
    const currentPath = router.pathname
    const selectedKeys: string[] = []
    if (currentPath.includes("/member")) selectedKeys.push("member")
    else if (currentPath.includes("/kyc")) selectedKeys.push("kyc")
    else if (currentPath.includes("/admin")) selectedKeys.push("admin")
    else if (currentPath.includes("/logs")) selectedKeys.push("logs")
    else selectedKeys.push("dashboard")

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
            {/* Logo dan toggle */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "space-between",
                    padding: "24px 16px"
                }}
            >
                <Icons icon={<CompanyLogo />} width={collapsed ? 32 : 40} height={collapsed ? 32 : 40} />
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
