import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { withAuthSSR } from "@hoc/withAuth"
import Transactions from "@modules/Transactions"

export const getServerSideProps: GetServerSideProps = withAuthSSR(async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "id", ["common"]))
        }
    }
})

export default Transactions
