import { ExportOutlined } from "@ant-design/icons"
import { Modal } from "antd"
import React, { useState } from "react"

interface ExportDataProps {
    data: any
}

const ExportData: React.FC<ExportDataProps> = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <ExportOutlined
                style={{ cursor: "pointer" }}
                onClick={() => {
                    setIsModalOpen(true)
                }}
            />
            <Modal open={isModalOpen} title="Export Data" onCancel={() => setIsModalOpen(false)} footer={null}>
                <p>Export data for selected customer?</p>
            </Modal>
        </>
    )
}

export default ExportData
