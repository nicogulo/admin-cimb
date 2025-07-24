"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu, theme } from "antd";
import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  ContactsOutlined,
  FileSearchOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import LogoXTBIndonesia from "@/icons/antnext";
import { useTranslations } from "next-intl";
import { currentOpenKey, currentPath, withLocalePath } from "@/utils/locale";

const { Sider } = Layout;

const DashboardSidebar = ({
  adminLevel,
}: {
  adminLevel: number | undefined;
}) => {
  const t = useTranslations("sidebar");
  const { token } = theme.useToken();

  const fullPath = usePathname();

  let menu: any = [
    {
      icon: <HomeOutlined />,
      key: "dashboard",
      label: (
        <Link href={withLocalePath(fullPath, "/dashboard")}>
          {t("dashboard")}
        </Link>
      ),
      title: t("dashboard"),
    },
  ];

  menu.push({
    icon: <TeamOutlined />,
    key: "member",
    label: (
        <Link href={withLocalePath(fullPath, "/dashboard/member")}>
          {t("member:list")}
        </Link>
    ),
    title: t("member:list"),
  });

  menu.push({
    icon: <FileSearchOutlined />,
    key: "kyc",
    label: (
        <Link href={withLocalePath(fullPath, "/dashboard/kyc")}>
          {t("member:kyc")}
        </Link>
    ),
    title: t("member:kyc"),
  });

  menu.push({
    icon: <WalletOutlined />,
    key: "balance",
    label: t("balance"),
    title: t("balance"),
    children: [
      {
        icon: <CloudDownloadOutlined />,
        key: "deposit",
        label: (
            <Link href={withLocalePath(fullPath, "/dashboard/balance/deposit")}>
              {t("balance:deposit")}
            </Link>
        ),
        title: t("balance:deposit"),
      },
      {
        icon: <CloudUploadOutlined />,
        key: "withdraw",
        label: (
            <Link
                href={withLocalePath(fullPath, "/dashboard/balance/withdraw")}
            >
              {t("balance:withdraw")}
            </Link>
        ),
        title: t("balance:withdraw"),
      },
    ],
  });

  menu.push({
    icon: <ContactsOutlined />,
    key: "admin",
    label: (
        <Link href={withLocalePath(fullPath, "/dashboard/admin")}>
          {t("admin")}
        </Link>
    ),
    title: t("admin"),
  });
  menu.push({
    icon: <ContactsOutlined />,
    key: "logs",
    label: (
        <Link href={withLocalePath(fullPath, "/dashboard/logs")}>
          {t("logs")}
        </Link>
    ),
    title: t("logs"),
  });

  return (
    <Sider
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
      style={{
        background: token.colorBgContainer,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "64px",
          width: "100%",
        }}
      >
        <LogoXTBIndonesia />
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={currentPath(fullPath)}
        defaultOpenKeys={currentOpenKey(fullPath)}
        items={menu}
      />
    </Sider>
  );
};

export default DashboardSidebar;
