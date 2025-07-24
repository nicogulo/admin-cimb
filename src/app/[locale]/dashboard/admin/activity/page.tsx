"use client";
import React, { useEffect, useState } from "react";
import LayoutDashboard from "@/components/Layouts/Dashboard";
import {
  Input,
  Table,
} from "antd";
import { redirect } from "next/navigation";
import { API_URL } from "@/config/config";
import { FormatDateTime } from "@/utils/date";
import useAuth from "@/hooks/useAuth";

const MemberActivityListPage: React.FC = () => {
  const [adminLevel, setAdminLevel] = useState<number>(0);
  const { auth } = useAuth();

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [dataBasicKYC, setDataBasicKYC] = useState([]);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
  });

  const { isLoggedIn } = auth;

  const getData = async ({ limit, page, search }: { limit: number; page: number; search: string }) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/admin/activity?limit=${limit}&page=${page}${search !== "" ? `&email=${encodeURIComponent(search)}` : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDataBasicKYC(data.admins);
    setPagination({
      total: data.total,
    });
    setLoading(false);
  };

  const handleTableChange = async (page: any) => {
    setPagination(page);
    await getData({ limit: page.pageSize, page: page.current, search: search });
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 200,
    },
    {
      title: "Admin Name",
      dataIndex: "admin_name",
      key: "admin_name",
      align: "center",
      width: 200,
    },
    {
      title: "Admin Email",
      dataIndex: "admin_email",
      key: "admin_email",
      align: "center",
      width: 100,
    },
    {
      title: "IP Address",
      dataIndex: "ip_address",
      key: "ip_address",
      align: "center",
      width: 100,
    },
    {
      title: "User Agent",
      dataIndex: "user_agent",
      key: "user_agent",
      align: "center",
      width: 100,
    },
    {
      title: "Before",
      dataIndex: "before",
      key: "before",
      align: "center",
      width: 100,
      render: (before: object) => {
        return JSON.stringify(before);
      },
    },
    {
      title: "After",
      dataIndex: "after",
      key: "after",
      align: "center",
      width: 100,
      render: (after: object) => {
        return JSON.stringify(after);
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
        search: search,
      });
    } else {
      redirect("/auth/sign-in");
    }
  }, [isLoggedIn]);

  const onSearch = (value: string) => {
    setSearch(value);
    getData({
      limit: 10,
      page: 1,
      search: value,
    });
  };

  return (
    <LayoutDashboard
      title="Admin Activity"
      subTitle="list"
      actions={[
        <Input placeholder="Search" onChange={(e) => onSearch(e.target.value)} style={{ width: 200 }} allowClear key="search" />
      ]}
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

export default MemberActivityListPage;
