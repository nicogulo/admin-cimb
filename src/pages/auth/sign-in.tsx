import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { withNonAuthClient } from "@hoc/withNonAuth"
import SignIn from "@modules/SignIn"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "id", ["common"]))
        }
    }
}

export default withNonAuthClient(SignIn)
