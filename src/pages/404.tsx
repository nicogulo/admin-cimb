import React from "react"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Button, Result } from "antd"

export default function Custom404() {
    const router = useRouter()

    const handleBackHome = () => {
        // Check if user is logged in
        const adminData = localStorage.getItem("admin")
        if (adminData) {
            // User is logged in, go to dashboard
            router.push("/dashboard")
        } else {
            // User is not logged in, go to auth page
            router.push("/auth/sign-in")
        }
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={handleBackHome}>
                        Back Home
                    </Button>
                }
            />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "id", ["common"]))
        }
    }
}
