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
    LoginOutlined
} from "@ant-design/icons"
import Icons from "@icons/icon"
import CompanyLogo from "@icons/Images/CompanyLogo"

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { useTheme } from "next-themes"
import { theme as antdTheme } from "antd"

const Sidebar: React.FC = () => {
    const router = useRouter()
    const [adminDetails, setAdminDetails] = useState<any>({})
    const [collapsed, setCollapsed] = useState(false)
    const { setTheme, theme } = useTheme()
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
            key: "dashboard",
            icon: <HomeOutlined />,
            label: <Link href="/dashboard">Dashboard</Link>
        },
        {
            key: "member",
            icon: <TeamOutlined />,
            label: "Members",
            children: [
                {
                    key: "member-list",
                    label: <Link href="/dashboard/member">Daftar Member</Link>
                },
                {
                    key: "member-activity",
                    label: <Link href="/dashboard/member/activity">Aktivitas Member</Link>
                }
            ]
        },
        {
            key: "kyc",
            icon: <FileSearchOutlined />,
            label: "KYC",
            children: [
                {
                    key: "kyc-list",
                    label: <Link href="/dashboard/kyc">Daftar KYC</Link>
                }
            ]
        },
        {
            key: "admin",
            icon: <ContactsOutlined />,
            label: "Admin",
            children: [
                {
                    key: "admin-list",
                    label: <Link href="/dashboard/admin">Daftar Admin</Link>
                },
                {
                    key: "admin-activity",
                    label: <Link href="/dashboard/admin/activity">Aktivitas Admin</Link>
                }
            ]
        },
        {
            key: "logs",
            icon: <ContactsOutlined />,
            label: <Link href="/dashboard/logs">Logs</Link>
        }
    ]

    // Get current path for menu selection
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
                width: collapsed ? 80 : 240,
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
