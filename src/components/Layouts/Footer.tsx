"use client"

import React from "react"
import { Layout } from "antd"

const { Footer } = Layout

const DashboardFooter: React.FC = () => {
    return (
        <Footer style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} PT Verihubs Inteligensia Nusantara. All Rights Reserved. 🔥
        </Footer>
    )
}

export default DashboardFooter
