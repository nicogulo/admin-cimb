import { withAuthSSR } from "@hoc/withAuth"
import AdminRole from "@modules/Admin/Role"

import { GetServerSideProps } from "next"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "id", ["common"]))
        }
    }
}

export default AdminRole
