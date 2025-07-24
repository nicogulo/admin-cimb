"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu, MenuProps, Space, theme } from "antd";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import IconTranslation from "@/icons/translation";
import IconSun from "@/icons/sun";
import IconMoon from "@/icons/moon";
import IconLaptop from "@/icons/laptop";
import { usePathname } from "next-intl/client";
import {
  currentOpenKey,
  currentPath,
  languages,
  withLocalePath,
} from "src/utils/locale";
import Link from "next-intl/link";
import {
  UserOutlined,
  LoginOutlined,
  ContactsOutlined,
  TeamOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import useAuth from "@/hooks/useAuth";
import { resetAuth } from "@/utils/auth";
import { useRouter } from "next/navigation";
import LogoXTBIndonesia from "@/icons/antnext";
const { Header } = Layout;

const ClockAPI = () => {
  const [dateState, setDateState] = useState(new Date());

  const t = new Date();
  const c = t.getHours() - 12;
  useEffect(() => {
    setInterval(() => {
      setDateState(new Date());
    }, 1000);
  }, []);

  return (
    <>
      {dateState.toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })}
    </>
  );
};

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("theme");
  const onClick: MenuProps["onClick"] = ({ key }) => {
    setTheme(key);
  };

  const items: MenuProps["items"] = [
    {
      key: "light",
      label: (
        <div className="flex items-center">
          <IconSun />
          <span>{t("light")}</span>
        </div>
      ),
    },
    {
      key: "dark",
      label: (
        <div className="flex items-center">
          <IconMoon />
          <span>{t("dark")}</span>
        </div>
      ),
    },
    {
      key: "system",
      label: (
        <div className="flex items-center">
          <IconLaptop />
          <span>{t("system")}</span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [theme ?? "system"],
        onClick,
      }}
      trigger={["click"]}
    >
      <span
        style={{
          marginRight: 15,
          width: "20px",
          height: "100%",
          cursor: "pointer",
        }}
      >
        {theme === "system" ? (
          window.matchMedia("(prefers-color-scheme: dark)").matches ? (
            <IconMoon />
          ) : (
            <IconSun />
          )
        ) : theme === "light" ? (
          <IconSun />
        ) : (
          <IconMoon />
        )}
      </span>
    </Dropdown>
  );
};

const LocaleSwitcher = () => {
  const pathname = usePathname();

  return (
    <Dropdown
      menu={{
        items: Object.entries(languages).map(([lang, setting]) => ({
          key: lang,
          label: (
            <Link href={pathname ?? "/"} locale={lang}>
              {setting.flag}&nbsp;&nbsp;{setting.name}
            </Link>
          ),
        })),
      }}
      trigger={["click"]}
    >
      <span
        style={{
          marginRight: 15,
          width: "20px",
          height: "100%",
          cursor: "pointer",
        }}
      >
        <IconTranslation />
      </span>
    </Dropdown>
  );
};

const DashboardNavbar = ({
  adminLevel,
}: {
  adminLevel: number | undefined;
}) => {
  const {
    token: {
      colorPrimary,
      colorPrimaryBg,
      colorBgContainer,
      colorText,
      colorTextTertiary,
    },
  } = theme.useToken();
  const router = useRouter();
  const { auth } = useAuth();
  const t = useTranslations("sidebar");
  const fullPath = usePathname();

  const [adminDetails, setAdminDetails] = useState<any>({});

  useEffect(() => {
    const member = localStorage.getItem("admin");
    if (member) {
      const memberJson = JSON.parse(member);
      setAdminDetails(memberJson);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("admin");
    resetAuth();
    router.push("/auth/sign-in");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <span
          style={{
            color: "#ed3939",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
          onClick={handleLogout}
        >
          <LoginOutlined /> Log out
        </span>
      ),
      key: "0",
    },
  ];

  let menu: any = [
    // {
    //   icon: <HomeOutlined />,
    //   key: "dashboard",
    //   label: (
    //     <Link href={withLocalePath(fullPath, "/dashboard")}>
    //       {t("dashboard")}
    //     </Link>
    //   ),
    //   title: t("dashboard"),
    // },
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
          icon: <TeamOutlined />,
          key: "member-activity",
          label: (
              <Link href={withLocalePath(fullPath, "/dashboard/member/activity")}>
                  Member Activity
              </Link>
          ),
          title: "Member Activity",
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
          icon: <ContactsOutlined />,
          key: "crypto",
          label: (
              <Link href={withLocalePath(fullPath, "/dashboard/crypto")}>
                  Crypto
              </Link>
          ),
          title: "Crypto",
      });
      menu.push({
          icon: <ContactsOutlined />,
          key: "fiat",
          label: (
              <Link href={withLocalePath(fullPath, "/dashboard/fiat")}>
                 Fiat
              </Link>
          ),
          title: "Fiat",
      });
      menu.push({
          icon: <ContactsOutlined />,
          key: "trade",
          label: (
              <Link href={withLocalePath(fullPath, "/dashboard/trade")}>
                  Trade
              </Link>
          ),
          title: "Trade",
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
          key: "admin-activity",
          label: (
              <Link href={withLocalePath(fullPath, "/dashboard/admin/activity")}>
                  Admin Activity
              </Link>
          ),
          title: "Admin Activity",
      });

  return (
    <Header
      style={{
        padding: "16px 24px",
        margin: 0,
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: colorBgContainer,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            height: "64px",
            cursor: "pointer",
          }}
          onClick={() => router.push("/dashboard")}
        >
          <LogoXTBIndonesia />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "4px 0",
            overflow: "hidden",
          }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={currentPath(fullPath)}
            defaultOpenKeys={currentOpenKey(fullPath)}
            items={menu}
            style={{ width: "100%" }}
          />

          <Dropdown menu={{ items }} trigger={["click"]}>
            <div
              onClick={(e) => e.preventDefault()}
              style={{ marginRight: 15, cursor: "pointer" }}
            >
              <Space>
                <Avatar
                  style={{
                    color: colorPrimary,
                    backgroundColor: colorPrimaryBg,
                  }}
                  icon={<UserOutlined />}
                />
                <span
                  style={{
                    color: colorText,
                    fontSize: "14px",
                    lineHeight: "1.5715",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  title="Admin"
                >
                  {adminDetails?.name || "Admin"}
                </span>
              </Space>
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default DashboardNavbar;
