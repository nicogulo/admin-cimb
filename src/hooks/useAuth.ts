"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { message } from "antd"

import { API_URL } from "@config/config"
import { getAuth, resetAuth, setAuth } from "@utils/auth"

const useAuth = () => {
    const { isLoggedIn, token, hash } = getAuth()

    return {
        auth: {
            isLoggedIn,
            token: token ?? undefined,
            hash: hash ?? undefined
        }
    }
}

interface LoginPayload {
    email: string
    password: string
}

interface RegisterPayload {
    full_name: string
    phone_number: string
    email: string
    password: string
}

interface OtpPayload {
    otp: string
}

export const useLogin = () => {
    const router = useRouter()
    const redirect = router.query.redirect as string

    const handleLogin = async (payload: LoginPayload) => {
        try {
            const response = await fetch(`${API_URL}/auth/sign-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const res = await response.json()
            if (!res) throw new Error("Oops! Something went wrong. Please try again later")

            if (res?.token) {
                setAuth({ token: res.token })
                return res
            }

            return res
        } catch (err: any) {
            message.error(err.message)
            return err
        }
    }

    useEffect(() => {
        if (redirect) {
            router.prefetch(redirect, redirect)
        }

        router.prefetch("/")
    }, [router, redirect])

    return {
        login: handleLogin
    }
}

export const useRegister = () => {
    const { auth } = useAuth()

    const handleRegister = async (payload: RegisterPayload) => {
        try {
            const response = await fetch(`${API_URL}/auth/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const res = await response.json()
            if (!res) throw new Error("Oops! Something went wrong. Please try again later")

            if (res.code === 200003000) throw new Error("Phone number already exists")

            if (res?.hash) {
                setAuth({ hash: res.hash })
                localStorage.setItem("email", res.email)
                return res
            }

            return res
        } catch (err: any) {
            message.error(err.message)
            return err
        }
    }

    const handleSubmitOtp = async (payload: OtpPayload) => {
        try {
            const response = await fetch(`${API_URL}/auth/sign-up/verification/${auth.hash}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const res = await response.json()
            if (!res) throw new Error("Oops! Something went wrong. Please try again later")

            return res
        } catch (err: any) {
            message.error(err.message)
            return err
        }
    }

    const handleResendOtp = async () => {
        try {
            const response = await fetch(`${API_URL}/auth/sign-up/verification/${auth.hash}/resend`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const res = await response.json()
            if (!res) throw new Error("Oops! Something went wrong. Please try again later")
            if (res.hash) {
                setAuth({ hash: res.hash })
            }

            return res
        } catch (err: any) {
            message.error(err.message)
            return err
        }
    }

    return {
        register: handleRegister,
        submitOtp: handleSubmitOtp,
        resendOtp: handleResendOtp
    }
}

export const useLogout = () => {
    const router = useRouter()

    const handleLogout = (force?: boolean) => {
        resetAuth()
        localStorage.removeItem("email")
        if (force) {
            router.push("/auth/sign-in")
        }
    }

    return {
        logout: handleLogout
    }
}

export const useForgotPassword = () => {
    const handleForgotPassword = async (email: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/request-change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            const res = await response.json()

            if (!res) throw new Error("Oops! Something went wrong. Please try again later")

            return res
        } catch (err: any) {
            message.error(err.message)
            return err
        }
    }

    return {
        forgotPassword: handleForgotPassword
    }
}

export const useChangePassword = () => {
    // /auth/change-password/{hash}
    const handleChangePassword = async (hash: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/change-password/${hash}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ new_password: password })
            })

            const res = await response.json()

            if (!res) throw new Error("Oops! Something went wrong. Please try again later")

            return res
        } catch (err: any) {
            message.error(err.message)
            return err
        }
    }

    return {
        changePassword: handleChangePassword
    }
}

export default useAuth
