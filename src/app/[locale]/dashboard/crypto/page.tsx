"use client";
import React, { useEffect, useState } from "react";
import LayoutDashboard from "@/components/Layouts/Dashboard";
import {Space, Table, Tag} from "antd";
import { redirect } from "next/navigation";
import { API_URL } from "@/config/config";
import { FormatDateTime } from "@/utils/date";
import useAuth from "@/hooks/useAuth";
import {ApproveReject} from "@/app/[locale]/dashboard/crypto/ApproveReject";

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

  const formatter = (currency :string, digit: number) => {
   return  new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,

      // These options are needed to round to whole numbers if that's what you want.
      minimumFractionDigits: digit, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
  }

  const getData = async ({ page, limit }: { page: number; limit: number }) => {
    setLoading(true);
    const res = await fetch(
      `${API_URL}/crypto?limit=${limit}&page=${page}`,
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
      title: "Asset Code",
      dataIndex: "asset_code",
      key: "asset_code",
      align: "center",
      width: 200,
    },
    {
      title: "Source Address",
      dataIndex: "from_address",
      key: "from_address",
      align: "center",
      width: 200,
      render: (from_address: string, dt : any) => {
        if (dt.type === 'receive') {
          return from_address;
        }
        return "Omnibus Binaloka";
      },
    },
    {
      title: "Destination Address",
      dataIndex: "to_address",
      key: "to_address",
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
        } else {
          return <Tag color="yellow">Pending</Tag>;
        }
      },
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      width: 200,
      render: (qty: number, dta: any) => {
        return `${formatter('IDR', 9).format(qty).replace("Rp", dta.asset_code)}`;
      },
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      align: "center",
      width: 200,
      render: (qty: number, dta: any) => {
        return `${formatter('IDR', 9).format(qty).replace("Rp", dta.asset_code)}`;
      },
    },
    {
      title: "Street Address Name",
      dataIndex: "street_address_name",
      key: "street_address_name",
      align: "center",
      width: 200,
    },
    {
      title: "Street Address Detail",
      dataIndex: "street_address_details",
      key: "street_address_details",
      align: "center",
      width: 200,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      align: "center",
      width: 200,
    },
    {
      title: "Actions",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 200,
      render: (type: string, data: any) => {
        if (adminLevel === 1) {
          return null;
        }
        if (type ==="send" && data.status === "waiting_approval") {
          return (
              <Space>
                <ApproveReject
                    data={data}
                    onRefresh={() => getData({ page: 1, limit: 10 })}
                    adminLevel={adminLevel}
                />
              </Space>
          );
        }
      },
    },
  ];
  return (
    <LayoutDashboard
      title="Crypto"
      subTitle="send receive coins"
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
