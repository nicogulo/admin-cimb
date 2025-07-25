"use client"

import React from "react"
import { Layout } from "antd"

const { Footer } = Layout

const DashboardFooter: React.FC = () => {
    return <Footer style={{ textAlign: "center" }}>Admin Dashboard ©{new Date().getFullYear()} Created with 🔥</Footer>
}

export default DashboardFooter
