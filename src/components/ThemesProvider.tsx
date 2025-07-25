"use client"

import { PropsWithChildren, useEffect, useState } from "react"
import { ThemeProvider, useTheme } from "next-themes"
import { ConfigProvider, Spin } from "antd"

import styled from "@emotion/styled"
import themes from "@utils/themes"

const LoadingPage = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.05);
`

export const ThemesProvider = (props: PropsWithChildren) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
                <WithThemes>
                    <LoadingPage>
                        <Spin size="large" />
                    </LoadingPage>
                </WithThemes>
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {props.children}
        </ThemeProvider>
    )
}

export const WithThemes = ({ children }: PropsWithChildren) => {
    const [themeSystem, changeSystemTheme] = useState("system")
    const { theme: nowTheme } = useTheme()

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)")
        media.addEventListener("change", (e) => {
            changeSystemTheme(e.matches ? "dark" : "light")
        })
    }, [themeSystem])

    return (
        <ConfigProvider
            theme={
                nowTheme === "system"
                    ? themeSystem === "dark"
                        ? themes.darkTheme
                        : themes.lightTheme
                    : nowTheme === "dark"
                      ? themes.darkTheme
                      : themes.lightTheme
            }
        >
            {children}
        </ConfigProvider>
    )
}
