import React, { useState } from 'react';
import {Button, Drawer, Table} from 'antd';
import {BlockOutlined} from "@ant-design/icons";

const AdminChanges = ({metadata, disabled}: {metadata: any, disabled: boolean}) => {
    const columns = [
        {
            title: 'Info',
            dataIndex: 'info',
            key: 'info',
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
        },
    ];

    const transformedData = transformDataToRows(metadata);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button onClick={showDrawer} disabled={disabled} icon={<BlockOutlined />}>
                Details
            </Button>
            <Drawer title="Details" onClose={onClose} open={open} width={800}>
                <Table
                    columns={columns}
                    dataSource={transformedData}
                    rowKey="info"
                    pagination={false}
                />
            </Drawer>
        </>
    );
};
const transformDataToRows = (data:any) => {
    const rows = [];
    for (const key in data) {
        if (typeof data[key] === 'object' && data[key] !== null) {
            rows.push({
                key,
                info: key.charAt(0).toUpperCase() + key.slice(1),
                details: JSON.stringify(data[key], null, 2), // Stringify the nested object
            });
        } else {
            rows.push({
                key,
                info: key.charAt(0).toUpperCase() + key.slice(1),
                details: data[key],
            });
        }
    }
    return rows;
};

export default AdminChanges;