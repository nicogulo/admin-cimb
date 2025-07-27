import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Home from "@modules/Home"
import { withAuthSSR } from "@hoc/withAuth"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = withAuthSSR(async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "id", ["common"]))
        }
    }
})

export default Home
