"use client";
import React, { useEffect, useState } from "react";
import LayoutDashboard from "@/components/Layouts/Dashboard";
import {
  Alert,
  Button,
  Input,
  message,
  Popover,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {
  AlertOutlined,
  ContainerOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { redirect, usePathname } from "next/navigation";
import { API_URL } from "@/config/config";
import { FormatDateTime } from "@/utils/date";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { withLocalePath } from "@/utils/locale";
const MemberListPage: React.FC = () => {
  const [adminLevel, setAdminLevel] = useState<number>(0);
  const fullPath = usePathname();
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [dataBasicKYC, setDataBasicKYC] = useState([]);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
  });

  const { isLoggedIn } = auth;

  const getData = async ({ limit, page }: { limit: number; page: number }) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/member?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDataBasicKYC(data.members);
    setPagination({
      total: data.total,
    });
    setLoading(false);
  };

  const handleTableChange = async (page: any) => {
    setPagination(page);
    await getData({ limit: page.pageSize, page: page.current });
  };

  const columns: any = [
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      width: 200,
      render: (created_at: string) => {
        return FormatDateTime(created_at);
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 200,
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
      align: "center",
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 100,
      render: (st: string) => {
        if (st === 'inactive') {
          return <Tag color="geekblue">Inactive</Tag>;
        }
        if (st === 'pending') {
          return <Tag color="yellow">Pending</Tag>;
        }
        if (st === 'active') {
          return <Tag color="green">Active</Tag>;
        }
        return <Tag color="geekblue">Unknown</Tag>;
      },
    },
    {
      title: "KYC",
      dataIndex: "kyc",
      key: "kyc",
      align: "center",
      width: 100,
      render: (st: string) => {
        if (st === 'pending') {
          return <Tag color="yellow">Submitted</Tag>;
        }
        if (st === 'success') {
          return <Tag color="green">Approved</Tag>;
        }
        if (st === 'revoke') {
          return <Tag color="red">Rejected</Tag>;
        }
        if (st === 'no') {
          return <Tag color="blue">Not Submit</Tag>;
        }
        return <Tag color="geekblue">Unknown</Tag>;
      },
    },
    {
      title: "Risk",
      dataIndex: "is_risk",
      key: "is_risk",
      align: "center",
      width: 200,
      render: (st: boolean, dt: any) => {
        return (
          <MemberRisk
            uid={dt.uid}
            st={st}
            nt={dt.risk_note}
            callback={() =>
              getData({
                limit: 10,
                page: 1,
              })
            }
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 200,
      render: (st: number, dt: any) => {
        return (
          <Space>
            <Tooltip title="Detail">
              <Link
                href={withLocalePath(
                  fullPath,
                  `/dashboard/member/${dt.uid}`
                )}
                onClick={async () => {}}
              >
                <Button icon={<ContainerOutlined />} />
              </Link>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    const member = localStorage.getItem("admin");
    if (member) {
      const memberJson = JSON.parse(member);
      setAdminLevel(memberJson?.level);
    }

    if (isLoggedIn) {
      getData({
        limit: pagination.pageSize,
        page: pagination.current,
      });
    } else {
      redirect("/auth/sign-in");
    }
  }, [isLoggedIn]);

  return (
    <LayoutDashboard
      title="Member"
      subTitle="list"
      actions={[]}
      adminLevel={adminLevel}
    >
      <Table
        loading={loading}
        dataSource={dataBasicKYC}
        columns={columns}
        style={{ minHeight: "100%" }}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </LayoutDashboard>
  );
};

const MemberRisk = ({
  st,
  nt,
  uid,
  callback,
}: {
  st: boolean;
  uid: string;
  nt: string;
  callback: any;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(st);
  const [note, setNote] = useState<string>(nt);
  const onSubmit = async () => {
    setOpen(false);
    const res = await fetch(`${API_URL}/member/${uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_risk: status,
        risk_note: note,
      }),
    });
    const data = await res.json();
    await callback?.();
    message.success("Success change risk status");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(open) => setOpen(open)}
      title="Update Risk Status"
      content={
        <>
          <p>Do you want to change risk status?</p>
          <Alert
            icon={status ? <AlertOutlined /> : <NotificationOutlined />}
            showIcon={true}
            message={note}
            type={status ? "error" : "success"}
          />
          <br />
          <Space.Compact style={{ width: "100%" }}>
            <Select
              defaultValue={status}
              options={[
                {
                  key: "1",
                  value: true,
                  label: "Yes",
                },
                {
                  key: "2",
                  value: false,
                  label: "No",
                },
              ]}
              onChange={(e: boolean) => setStatus(e)}
            />
            <Input
              defaultValue={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button type="primary" onClick={onSubmit}>
              Change
            </Button>
          </Space.Compact>
        </>
      }
      trigger="click"
    >
      <Alert
        icon={st ? <AlertOutlined /> : <NotificationOutlined />}
        showIcon={true}
        message={nt !== "" ? nt : st ? "Yes" : "No"}
        type={st ? "error" : "success"}
      />
    </Popover>
  );
};

export default MemberListPage;
