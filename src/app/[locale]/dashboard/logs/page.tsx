"use client";
import React, {useEffect, useState} from "react";
import LayoutDashboard from "@/components/Layouts/Dashboard";
import { Table, Tag } from "antd";
import { CreateAdminForm } from "@/app/[locale]/dashboard/admin/AddAdmin";
import { UpdateAdminForm } from "@/app/[locale]/dashboard/admin/UpdateAdmin";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import {API_URL} from "@/config/config";
import {FormatDateTime} from "@/utils/date";
import AdminChanges from "@/app/[locale]/dashboard/logs/AdminChanges";
import metadata from "next/dist/server/typescript/rules/metadata";

const AdminPage: React.FC = () => {
  const [adminLevel, setAdminLevel] = useState<number>(0);
  const { auth } = useAuth();
  const { isLoggedIn } = auth;

  const [loading, setLoading] = useState(false);
  const [dataAdmin, setDataAdmin] = useState([]);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
  })
  const getData = async ({limit, page} : {limit: number, page: number}) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/admins/logs?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDataAdmin(data.members);
    setPagination({
      total: data.total
    })
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

    if (isLoggedIn) {
      getData({
        limit: pagination.pageSize,
        page: pagination.current
      });
    } else {
      redirect("/auth/sign-in");
    }
  }, [isLoggedIn]);

  const columns: any = [
    {
      title: "Datetime",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 200,
      render: (created_at: string) => {
        return FormatDateTime(created_at);
      },
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 200,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      align: "center",
      width: 100,
      render: (st: number) => {
        if (st === 0) {
          return <Tag color="blue">Super Admin</Tag>;
        }
        if (st === 1) {
          return <Tag color="red">Finance</Tag>;
        }
        if (st === 2) {
          return <Tag color="magenta">Settlement</Tag>;
        }
        if (st === 3) {
          return <Tag color="geekblue">Wakil Pialang Berjangka</Tag>;
        }
        if (st === 4) {
          return <Tag color="green">Compliance</Tag>;
        }
        return <Tag color="red">Unknown</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      width: 100,
      render: (actions: string) => {
        return <Tag color="yellow">{actions}</Tag>;
      },
    },
    {
      title: "Admin Changes",
      dataIndex: "metadata",
      key: "metadata",
      align: "center",
      width: 100,
      render: (changes: any) => {
        return <AdminChanges metadata={changes} disabled={metadata === null}/>;
      },
    }
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      return redirect("/auth/sign-in");
    }
  }, [isLoggedIn]);
  return (
    <LayoutDashboard
      title="Admin"
      subTitle="Logs"
      // actions={[<CreateAdminForm />]}
        adminLevel={adminLevel}
    >
      <Table
          loading={loading}
        dataSource={dataAdmin}
        columns={columns}
        style={{ minHeight: "100%" }}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </LayoutDashboard>
  );
};

export default AdminPage;
