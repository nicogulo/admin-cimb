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

const AdminPage: React.FC = () => {
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
    const res = await fetch(`${API_URL}/admins?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDataAdmin(data.admins);
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
      title: "Access",
      dataIndex: "level",
      key: "level",
      align: "center",
      width: 100,
      render: (st: number) => {
        if (st === 0) {
          return <Tag color="blue">Full</Tag>;
        }
        if (st === 1) {
          return <Tag color="red">Read Only</Tag>;
        }
        return <Tag color="red">Unknown</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 100,
      render: (st: number) => {
        if (st === 0) {
          return <Tag color="purple">Inactive</Tag>;
        }
        if (st === 1) {
          return <Tag color="green">Active</Tag>;
        }
        if (st === 2) {
          return <Tag color="magenta">Deactivate</Tag>;
        }
        return <Tag color="geekblue">Unknown</Tag>;
      },
    },
    {
      title: "Last IP",
      dataIndex: "last_ip",
      key: "last_ip",
      align: "center",
      width: 200,
      render: (st: string) => {
          if(st !== "" && st !== " " && st !== null) return st
        return "-"
      }
    },
  ];

  const [adminLevel, setAdminLevel] = useState(0);

  useEffect(() => {
    const member = localStorage.getItem("admin");
    if (member) {
      const memberJson = JSON.parse(member);
      setAdminLevel(memberJson?.level);
    }
    if (!isLoggedIn) {
      return redirect("/auth/sign-in");
    }
  }, [isLoggedIn]);
  return (
    <LayoutDashboard
      title="Admin"
      subTitle="user"
      // actions={[<CreateAdminForm />]}
      adminLevel={adminLevel}
    >
      <Table
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
