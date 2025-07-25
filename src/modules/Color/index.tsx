import React, { useEffect, useState } from "react"
import { theme } from "antd"

import LayoutDashboard from "@components/Layouts/Dashboard"

const Color = () => {
    const { token } = theme.useToken()
    const colors = Object.keys(token) as (keyof typeof token)[]
    const [adminLevel, setAdminLevel] = useState<number>(0)

    useEffect(() => {
        const member = localStorage.getItem("admin")
        if (member) {
            const memberJson = JSON.parse(member)
            setAdminLevel(memberJson?.level)
        }
    }, [])

    return (
        <LayoutDashboard adminLevel={adminLevel}>
            <div style={{ padding: "24px" }}>
                <h1>Color Tokens</h1>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "16px"
                    }}
                >
                    {colors.map((colorKey) => (
                        <div
                            key={colorKey}
                            style={{
                                padding: "16px",
                                border: "1px solid #d9d9d9",
                                borderRadius: "8px",
                                backgroundColor: token.colorBgContainer
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "40px",
                                    backgroundColor: token[colorKey] as string,
                                    borderRadius: "4px",
                                    marginBottom: "8px",
                                    border: "1px solid #d9d9d9"
                                }}
                            />
                            <div style={{ fontSize: "14px", fontWeight: "bold" }}>{colorKey}</div>
                            <div style={{ fontSize: "12px", color: token.colorTextSecondary }}>
                                {token[colorKey] as string}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutDashboard>
    )
}

export default Color
