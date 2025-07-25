import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { withAuthSSR } from "@hoc/withAuth"
import DashboardKYC from "@modules/DashboardKYC"

export const getServerSideProps: GetServerSideProps = withAuthSSR(async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "id", ["common"]))
        }
    }
})

export default DashboardKYC
