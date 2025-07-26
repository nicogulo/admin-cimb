"use client"

import React from "react"
import { Layout, theme } from "antd"

const { Content } = Layout

type Props = {
    children: React.ReactNode
    params?: Record<string, any>
}
const DashboardContent: React.FC<Props> = (props: Props) => {
    const {
        token: { colorBgContainer, colorBorder }
    } = theme.useToken()

    return (
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
                style={{
                    padding: 10,
                    background: colorBgContainer,
                    borderRadius: 12,
                    border: `1px solid ${colorBorder}`,
                    height: "100%"
                }}
            >
                {props.children}
            </div>
        </Content>
    )
}

export default DashboardContent
