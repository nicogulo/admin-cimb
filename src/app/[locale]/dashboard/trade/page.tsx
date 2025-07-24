"use client";
import React, { useEffect, useState } from "react";
import LayoutDashboard from "@/components/Layouts/Dashboard";
import {Space, Table, Tag} from "antd";
import { redirect } from "next/navigation";
import { API_URL } from "@/config/config";
import { FormatDateTime } from "@/utils/date";
import useAuth from "@/hooks/useAuth";
import {ApproveReject} from "@/app/[locale]/dashboard/fiat/ApproveReject";

const HistoryDepositPage: React.FC = () => {
  const [adminLevel, setAdminLevel] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [dataBasicKYC, setDataBasicKYC] = useState([]);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
  });

  const { auth } = useAuth();
  const { isLoggedIn } = auth;

  const formatter=(code: string, digit: number) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: code,

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: digit, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const getData = async ({ page, limit }: { page: number; limit: number }) => {
    setLoading(true);
    const res = await fetch(
      `${API_URL}/trade?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    setDataBasicKYC(data.list);
    setPagination({
      total: data.total,
    });
    setLoading(false);
  };

  const handleTableChange = async (page: any) => {
    setPagination(page);
    await getData({ limit: page.pageSize, page: page.current });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return redirect("/auth/sign-in");
    } else {
      getData({
        page: pagination.current,
        limit: pagination.pageSize,
      });

      const member = localStorage.getItem("admin");
      if (member) {
        const memberJson = JSON.parse(member);
        setAdminLevel(memberJson?.level);
      }
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
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      align: "center",
      width: 200,
    },
    {
      title: "Asset Name",
      dataIndex: "asset_name",
      key: "asset_name",
      align: "center",
      width: 200,
    },
    {
      title: "Asset Code",
      dataIndex: "asset_code",
      key: "asset_code",
      align: "center",
      width: 200,
    },
    {
      title: "Member Email",
      dataIndex: "member_email",
      key: "member_email",
      align: "center",
      width: 200,
    },
    {
      title: "Member Name",
      dataIndex: "member_name",
      key: "member_name",
      align: "center",
      width: 200,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 200,
      render: (status: string) => {
        if (status === 'filled') {
          return <Tag color="green">Success</Tag>;
        } else if (status === 'waiting_approval') {
          return <Tag color="blue">Pending</Tag>;
        } else if (status === 'canceled') {
          return <Tag color="red">Rejected</Tag>;
        }
      },
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      width: 200,
      render: (qty: number, dt: any) => {
        return `${formatter('IDR', 9).format(qty).replace("Rp", dt.asset_code)}`;
      },
    },
    {
      title: "Quote",
      dataIndex: "quote",
      key: "quote",
      align: "center",
      width: 200,
      render: (quote: number) => {
        return `${formatter("IDR", 0).format(quote)}`;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 200,
      render: (price: number) => {
        return `${formatter("IDR", 0).format(price)}`;
      },
    },
    {
      title: "Quote Fee",
      dataIndex: "quote_fee",
      key: "quote_fee",
      align: "center",
      width: 200,
      render: (quote_fee: number) => {
        return `${formatter("IDR", 0).format(quote_fee)}`;
      },
    },
    {
      title: "Quote VAT",
      dataIndex: "quote_vat",
      key: "quote_vat",
      align: "center",
      width: 200,
      render: (quote_vat: number) => {
        return `${formatter("IDR", 0).format(quote_vat)}`;
      },
    }
  ];
  return (
    <LayoutDashboard
      title="Trade"
      subTitle="buy sell crypto"
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

export default HistoryDepositPage;
