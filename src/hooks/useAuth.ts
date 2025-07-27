"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { message } from "antd"

import { API_URL, PORT_KEYCLOCK } from "@config/config"
import { getAuth, resetAuth, setAuth } from "@utils/auth"

import dayjs from "dayjs"

const useAuth = () => {
    // Flag agar alert hanya muncul sekali per window expired
    const windowExpired = React.useRef<boolean>(false)
    // State untuk alert dan countdown (pakai useRef agar sinkron antar event)
    const countdownTimeout = React.useRef<NodeJS.Timeout | null>(null)
    const countdown = React.useRef<number>(10)
    const alertActive = React.useRef<boolean>(false)
    const router = useRouter()
    const { isLoggedIn, token, hash } = getAuth()

    useEffect(() => {
        if (typeof window === "undefined") return

        let idleTimeout: NodeJS.Timeout | null = null
        let lastActivity = Date.now()
        let hasRefreshed = false

        const getExpired = () => {
            const auth = getAuth()
            if (auth.expired === undefined) return undefined
            // expired sudah milisecond
            if (typeof auth.expired === "string") return parseInt(auth.expired)
            if (typeof auth.expired === "number") return auth.expired
            return undefined
        }

        const checkSession = () => {
            const now = Date.now()
            const cookieExpired = getExpired()
            // Reset flag jika window refresh belum tercapai (window expired baru)
            if (cookieExpired && now < cookieExpired) {
                hasRefreshed = false
                alertActive.current = false
                countdown.current = 10
                windowExpired.current = false
                if (countdownTimeout.current) clearInterval(countdownTimeout.current)
                message.destroy("session-expired")
            }
            // Saat menyentuh expired, munculkan alert dan countdown hanya sekali per window
            if (
                cookieExpired &&
                now >= cookieExpired &&
                now < cookieExpired + 10000 &&
                !alertActive.current &&
                !windowExpired.current
            ) {
                alertActive.current = true
                windowExpired.current = true
                countdown.current = 10
                message.warning({
                    content: `Session expired! Auto logout in <b id='countdown-session'>${countdown.current}</b> seconds. Move mouse or press any key to stay logged in.`,
                    duration: 10,
                    key: "session-expired"
                })
                // Countdown update
                countdownTimeout.current = setInterval(() => {
                    countdown.current--
                    const cdEl = document.getElementById("countdown-session")
                    if (cdEl) cdEl.innerText = countdown.current.toString()
                    if (countdown.current <= 0) {
                        if (countdownTimeout.current) clearInterval(countdownTimeout.current)
                    }
                }, 1000)
            }
            // Logout hanya jika idle 10 detik setelah expired
            if (cookieExpired && now > cookieExpired + 10000) {
                if (countdownTimeout.current) clearInterval(countdownTimeout.current)
                message.destroy("session-expired")
                resetAuth()
                router.push("/auth/sign-in")
                message.error("Your session has expired. Please sign in again.")
                hasRefreshed = false
                alertActive.current = false
            }
        }

        const refreshToken = async () => {
            const email = localStorage.getItem("email")
            const password = localStorage.getItem("password")
            if (email && password) {
                try {
                    const response = await fetch(
                        `${API_URL}${PORT_KEYCLOCK}/realms/face-repository/protocol/openid-connect/token`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: new URLSearchParams({
                                client_id: "face-backend",
                                username: email,
                                password: password,
                                grant_type: "password",
                                client_secret: "IRyPpcinGoi6pARHgNgjregZjFgCbD1m"
                            }).toString()
                        }
                    )
                    const res = await response.json()
                    if (res?.access_token) {
                        // expired harus berupa timestamp (milisecond)
                        const expiredTime = (Date.now() + res.expires_in * 1000).toString()
                        setAuth({ token: res.access_token, expired: expiredTime })
                        message.success("Session refreshed!")
                        hasRefreshed = true
                        // Reset alert, countdown, dan windowExpired setelah refresh
                        alertActive.current = false
                        windowExpired.current = false
                        countdown.current = 10
                        if (countdownTimeout.current) clearInterval(countdownTimeout.current)
                        message.destroy("session-expired")
                    }
                } catch (err: any) {
                    message.error("Failed to refresh session")
                }
            }
        }

        const onActivity = () => {
            lastActivity = Date.now()
            const cookieExpired = getExpired()
            // Jika alert aktif dan ada aktivitas, close alert dan refresh token
            if (
                cookieExpired &&
                lastActivity > cookieExpired &&
                lastActivity <= cookieExpired + 10000 &&
                alertActive.current &&
                !hasRefreshed
            ) {
                if (countdownTimeout.current) clearInterval(countdownTimeout.current)
                message.destroy("session-expired")
                alertActive.current = false
                refreshToken()
            }
        }

        window.addEventListener("mousemove", onActivity)
        window.addEventListener("keydown", onActivity)
        window.addEventListener("click", onActivity)
        window.addEventListener("touchstart", onActivity)

        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) onActivity()
        })

        idleTimeout = setInterval(checkSession, 1000)

        return () => {
            window.removeEventListener("mousemove", onActivity)
            window.removeEventListener("keydown", onActivity)
            window.removeEventListener("click", onActivity)
            window.removeEventListener("touchstart", onActivity)
            document.removeEventListener("visibilitychange", () => {})
            if (idleTimeout) clearInterval(idleTimeout)
        }
    }, [])

    return {
        auth: {
            isLoggedIn,
            token: token ?? undefined,
            hash: hash ?? undefined,
            expired: getAuth().expired ?? undefined
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
            const response = await fetch(
                `${API_URL}${PORT_KEYCLOCK}/realms/face-repository/protocol/openid-connect/token`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        client_id: "face-backend",
                        username: payload.email,
                        password: payload.password,
                        grant_type: "password",
                        client_secret: "IRyPpcinGoi6pARHgNgjregZjFgCbD1m"
                    }).toString()
                }
            )

            const res = await response.json()
            if (!res) throw new Error("Oops! Something went wrong. Please try again later")

            if (res?.access_token) {
                // expired harus berupa timestamp (milisecond)
                const expiredTime = (Date.now() + res.expires_in * 1000).toString()
                setAuth({ token: res.access_token, expired: expiredTime })
                message.success("Sign in successful!")
                router.push(redirect || "/")
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

// export const useRegister = () => {
//     const { auth } = useAuth()

//     const handleRegister = async (payload: RegisterPayload) => {
//         try {
//             const response = await fetch(`${API_URL}/auth/sign-up`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(payload)
//             })

//             const res = await response.json()
//             if (!res) throw new Error("Oops! Something went wrong. Please try again later")

//             if (res.code === 200003000) throw new Error("Phone number already exists")

//             if (res?.hash) {
//                 setAuth({ hash: res.hash })
//                 localStorage.setItem("email", res.email)
//                 return res
//             }

//             return res
//         } catch (err: any) {
//             message.error(err.message)
//             return err
//         }
//     }

//     const handleSubmitOtp = async (payload: OtpPayload) => {
//         try {
//             const response = await fetch(`${API_URL}/auth/sign-up/verification/${auth.hash}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(payload)
//             })

//             const res = await response.json()
//             if (!res) throw new Error("Oops! Something went wrong. Please try again later")

//             return res
//         } catch (err: any) {
//             message.error(err.message)
//             return err
//         }
//     }

//     const handleResendOtp = async () => {
//         try {
//             const response = await fetch(`${API_URL}/auth/sign-up/verification/${auth.hash}/resend`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             })

//             const res = await response.json()
//             if (!res) throw new Error("Oops! Something went wrong. Please try again later")
//             if (res.hash) {
//                 setAuth({ hash: res.hash })
//             }

//             return res
//         } catch (err: any) {
//             message.error(err.message)
//             return err
//         }
//     }

//     return {
//         register: handleRegister,
//         submitOtp: handleSubmitOtp,
//         resendOtp: handleResendOtp
//     }
// }

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

// export const useForgotPassword = () => {
//     const handleForgotPassword = async (email: string) => {
//         try {
//             const response = await fetch(`${API_URL}/auth/request-change-password`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ email })
//             })

//             const res = await response.json()

//             if (!res) throw new Error("Oops! Something went wrong. Please try again later")

//             return res
//         } catch (err: any) {
//             message.error(err.message)
//             return err
//         }
//     }

//     return {
//         forgotPassword: handleForgotPassword
//     }
// }

// export const useChangePassword = () => {
//     // /auth/change-password/{hash}
//     const handleChangePassword = async (hash: string, password: string) => {
//         try {
//             const response = await fetch(`${API_URL}/auth/change-password/${hash}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ new_password: password })
//             })

//             const res = await response.json()

//             if (!res) throw new Error("Oops! Something went wrong. Please try again later")

//             return res
//         } catch (err: any) {
//             message.error(err.message)
//             return err
//         }
//     }

//     return {
//         changePassword: handleChangePassword
//     }
// }

export default useAuth
