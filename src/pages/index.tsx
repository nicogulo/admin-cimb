import { useEffect } from "react"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to dashboard with locale
        router.replace("/dashboard")
    }, [router])

    return null
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "id", ["common"]))
        }
    }
}
