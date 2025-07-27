"use client"

import React from "react"
import { Layout } from "antd"

import LogoVerihubs from "../images/VerihubLogo"

const { Footer } = Layout

const DashboardFooter: React.FC = () => {
    return (
        <Footer
            style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px"
            }}
        >
            <LogoVerihubs />© {new Date().getFullYear()} PT Verihubs Inteligensia Nusantara. All Rights Reserved. 🔥
        </Footer>
    )
}

export default DashboardFooter
