"use client";
import React, { useEffect, useState } from "react";
import LayoutDashboard from "@/components/Layouts/Dashboard";
import { Button, Table, Tag, Tooltip } from "antd";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { withLocalePath } from "@/utils/locale";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { API_URL } from "@/config/config";
import { FormatDateTime } from "@/utils/date";
import useAuth from "@/hooks/useAuth";

const MemberBasicKYC: React.FC = () => {
  const [adminLevel, setAdminLevel] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataBasicKYC, setDataBasicKYC] = useState([]);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
  })

  const fullPath = usePathname();
  const { auth } = useAuth();
  const { isLoggedIn } = auth;

  const getData = async ({page, limit} : {page: number, limit: number}) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/kyc/basic?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDataBasicKYC(data.list);
    setLoading(false);
  };

  const handleTableChange = async (page: any) => {
    setPagination(page)
    await getData({limit: page.pageSize, page: page.current})
  };

  useEffect(() => {

    const member = localStorage.getItem("admin");
    if (member) {
      const memberJson = JSON.parse(member);
      setAdminLevel(memberJson?.level);
    }

    if (!isLoggedIn) {
      return redirect("/auth/sign-in");
    } else {
      getData({
        page: pagination.current,
        limit: pagination.pageSize
      });
    }
  }, [isLoggedIn]);

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
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      width: 200,
      render: (st: number, data: any) => {
        if (adminLevel === 1) {
          return null;
        }
        return (
            <>
              <Tooltip title="Process">
                <Link
                    href={withLocalePath(
                        fullPath,
                        `/dashboard/kyc/${data.id}`
                    )}
                >
                  <Button icon={<SendOutlined />} />
                </Link>
              </Tooltip>
            </>
        );
      },
    },
  ];
  return (
      <LayoutDashboard
          title="KYC"
          subTitle="kyc"
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

export default MemberBasicKYC;