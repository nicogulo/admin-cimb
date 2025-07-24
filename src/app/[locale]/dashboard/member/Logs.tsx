import React, { useState } from 'react';
import {Button, Drawer, Table, Tooltip} from 'antd';
import {MonitorOutlined} from "@ant-design/icons";
import {API_URL} from "@/config/config";
import {FormatDateTime} from "@/utils/date";

const Logs = ({uid}: {uid: string}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [dataLive, setDataLive] = useState([]);
    const [paginationLive, setPaginationLive] = useState<any>({
        current: 1,
        pageSize: 10,
    })

    const getDataLive = async ({limit, page} : {limit: number, page: number}) => {
        setLoading(true);
        const res = await fetch(`${API_URL}/member/${uid}/logs?limit=${limit}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setDataLive(data.members);
        setPaginationLive({
            total: data.total
        })
        setLoading(false);
    };

    const showDrawer = async () => {
        setOpen(true);
        await getDataLive({
            limit: paginationLive.pageSize || 10,
            page: paginationLive.current || 1
        });
    };

    const onClose =async () => {
        setOpen(false);
    };

    const handleTableChangeLive = async (page: any) => {
        setPaginationLive(page)
        await getDataLive({limit: page.pageSize, page: page.current})
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => <>{FormatDateTime(text)}</>,
        },
        {
            title: 'Action',
            dataIndex: 'actions',
            key: 'actions',
        },
        {
            title: 'Metadata',
            dataIndex: 'metadata',
            key: 'metadata',
            render: (text: any) => <>{JSON.stringify(text)}</>,
        },
    ];

    return (
        <>
            <Tooltip title="Logs">
                <Button onClick={showDrawer} icon={<MonitorOutlined />}/>
            </Tooltip>
            <Drawer title="Logs" onClose={onClose} open={open} width={500}>
                <Table loading={loading} dataSource={dataLive} columns={columns} pagination={paginationLive} onChange={handleTableChangeLive}/>
            </Drawer>
        </>
    );
};

export default Logs;