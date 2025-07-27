import React, { useState } from "react"
import { useRouter } from "next/router"
import { Button, Card, Form, Input, message, Typography } from "antd"

import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { API_URL, PORT_KEYCLOCK } from "@config/config"
import styled from "@emotion/styled"
import useAdminLog from "@hooks/useAdminLog"
import Icons from "@icons/icon"
import CompanyLogo from "@icons/Images/CompanyLogo"
import { setAuth } from "@utils/auth"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useLogin } from "@hooks/useAuth"

const { Title, Text } = Typography

const LoginContainer = styled.div`
    min-height: 100vh;
    display: flex;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const ImageSection = styled.div`
    flex: 1;
    background: url("/images/bg-sign-in.jpg") center/cover;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        display: none;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
    }
`

const ImageOverlay = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    padding: 2rem;

    h2 {
        color: white;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        font-weight: 600;
    }

    p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.2rem;
        max-width: 400px;
        line-height: 1.6;
    }
`

const FormSection = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: white;
    min-height: 100vh;

    @media (max-width: 768px) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem;

        .ant-card {
            box-shadow: none;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
    }
`

const LoginCard = styled(Card)`
    width: 100%;
    max-width: 420px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: none;
    transition: all 0.3s ease;

    .ant-card-body {
        padding: 3rem 2rem;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        margin: 1rem;

        .ant-card-body {
            padding: 2rem 1.5rem;
        }
    }
`

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
`

const StyledButton = styled(Button)`
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    background: #d5001c;
    color: #fff;
    border: none;
    box-shadow: 0 2px 8px rgba(213, 0, 28, 0.08);

    &:hover,
    &:focus {
        background: #e53935 !important;
        color: #fff;
        box-shadow: 0 2px 8px rgba(213, 0, 28, 0.12);
    }
`

const StyledInput = styled(Input)`
    height: 48px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;

    &:focus,
    &:hover {
        border-color: #d5001c;
        box-shadow: 0 0 0 2px rgba(213, 0, 28, 0.12);
    }
`

const StyledPasswordInput = styled(Input.Password)`
    height: 48px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;

    &:focus,
    &:hover {
        border-color: #d5001c;
        box-shadow: 0 0 0 2px rgba(213, 0, 28, 0.12);
    }
`

const SignIn: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { addLog } = useAdminLog()
    const { theme } = useTheme()
    const { login } = useLogin()
    const isDarkMode = theme === "dark"

    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            const res = await login({
                email: values.email,
                password: values.password
            })

            // const response = await fetch(
            //     `${API_URL}${PORT_KEYCLOCK}/realms/face-repository/protocol/openid-connect/token`,
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/x-www-form-urlencoded"
            //         },

            //         body: new URLSearchParams({
            //             client_id: "face-backend",
            //             username: values.email,
            //             password: values.password,
            //             grant_type: "password",
            //             client_secret: "IRyPpcinGoi6pARHgNgjregZjFgCbD1m"
            //         }).toString()
            //     }
            // )

            // const res = await response.json()
            // console.log("Response:", res)
            // if (!res) {
            //     throw new Error("Oops! Something went wrong. Please try again later")
            // }

            // if (res?.access_token) {
            //     // localStorage.setItem(
            //     //     "admin",
            //     //     JSON.stringify({
            //     //         id: res.id,
            //     //         name: res.name,
            //     //         email: res.email,
            //     //         status: res.status
            //     //     })
            //     // )

            //     setAuth({
            //         token: res.access_token,
            //         expired: res.expires_in
            //     })

            //     // Log the sign-in activity
            //     // await addLog("User signed in", null, {
            //     //     email: values.email,
            //     //     timestamp: new Date().toISOString()
            //     // })

            //     message.success("Sign in successful!")
            //     router.push("/")
            // } else {
            //     throw new Error(res?.message || "Sign in failed")
            // }
        } catch (error: any) {
            message.error(error.message || "Sign in failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const onFinishFailed = (_errorInfo: any) => {
        // Handle form submission error
    }

    return (
        <LoginContainer>
            <ImageSection>
                <ImageOverlay>
                    <h2>Welcome Back</h2>
                    <p>
                        Manage your business with our powerful admin dashboard. Access analytics, monitor performance,
                        and streamline your operations.
                    </p>
                </ImageOverlay>
            </ImageSection>
            <FormSection>
                <LoginCard>
                    <LogoContainer>
                        <Image
                            src={isDarkMode ? "/images/logo-dark.png" : "/images/logo-light.png"}
                            alt="Company Logo"
                            width={60}
                            height={60}
                        />
                    </LogoContainer>
                    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                        <Title level={2} style={{ margin: 0, color: "#1a202c" }}>
                            Sign In
                        </Title>
                        <Text style={{ color: "#64748b", fontSize: "16px" }}>
                            Welcome back! Please sign in to your account
                        </Text>
                    </div>
                    <Form
                        name="signin"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    type: "string",
                                    message: "Please enter a valid email!"
                                }
                            ]}
                        >
                            <StyledInput
                                prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
                                placeholder="Enter your email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password!"
                                }
                            ]}
                        >
                            <StyledPasswordInput
                                prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
                                placeholder="Enter your password"
                            />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <StyledButton type="primary" htmlType="submit" loading={loading} disabled={loading} block>
                                {loading ? "Signing In..." : "Sign In"}
                            </StyledButton>
                        </Form.Item>
                    </Form>
                </LoginCard>
            </FormSection>
        </LoginContainer>
    )
}

export default SignIn
