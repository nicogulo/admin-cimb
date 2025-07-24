"use client";

import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";

import styled from "@emotion/styled";
import { WithThemes } from "@/components/ThemesProvider";
import { API_URL } from "@/config/config";
import { setAuth } from "@/utils/auth";
import { withLocalePath } from "@/utils/locale";
import { usePathname, useRouter } from "next/navigation";
import LogoXTBIndonesia from "@/icons/antnext";
import AddAdminLog from "@/components/AdminLogCompenent";

const ButtonA = styled(Button)`
  width: 100%;
`;

type FieldType = {
  email?: string;
  password?: string;
};

const SignInPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fullPath = usePathname();
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const res = await response.json();
      if (!res) {
        throw new Error("Oops! Something went wrong. Please try again later");
      }

      if (res?.token) {
        localStorage.setItem('admin', JSON.stringify({
          id : res.id,
          name : res.name,
          email: res.email,
          status: res.status,
          level: res.level,
          token: res.token,
        }));
        setAuth({
          token: res.token,
        });
        await AddAdminLog("sign_in", null, null);
        router.push(withLocalePath(fullPath, "/dashboard"));
        return;
      }
    } catch (err: any) {
      message.error(err.message);
      setLoading(false);
      return err;
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <WithThemes>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          //background-image: url("/background.svg");
          // background-size: cover
        }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            width: "350px",
            margin: "0 auto",
            borderRadius: "8px",
            background: "#ffffff",
            padding: "20px",
            boxShadow: "0px 4px 49px -10px rgba(0, 0, 0, 0.5)",
            WebkitBoxShadow: "0px 4px 49px -10px rgba(0, 0, 0, 0.5)",
            MozBoxShadow: " 0px 4px 49px -10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              margin: "16px 0 32px 0",
            }}
          >
            <LogoXTBIndonesia/>
          </div>
          <div
            style={{
              textAlign: "center",
              margin: "16px 0 32px 0",
            }}
          >
            <h3>Sign In</h3>
            <p>Sign in to access your dashboard</p>
          </div>
          <Form.Item<FieldType>
            style={{
              marginBottom: "16px",
              textAlign: "center",
            }}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              style={{ padding: "12px", width: "100%" }}
              type="email"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item<FieldType>
            style={{
              marginBottom: "16px",
              textAlign: "center",
            }}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              style={{ padding: "12px", width: "100%" }}
              type="password"
              placeholder="password"
            />
          </Form.Item>
          <Form.Item>
            <ButtonA
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Submit
            </ButtonA>
          </Form.Item>
        </Form>
      </div>
    </WithThemes>
  );
};

export default SignInPage;
