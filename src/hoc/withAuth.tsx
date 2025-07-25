/* eslint-disable react/display-name */

import { useEffect } from "react"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

import useAuth from "@hooks/useAuth"
import { getAuth } from "@utils/auth"
import { getRedirectHref } from "@utils/redirection"

export const withAuthSSR = (getServerSideProps: GetServerSideProps) => async (props: GetServerSidePropsContext) => {
    const auth = getAuth({ req: props.req, res: props.res })
    const url = getRedirectHref(props.resolvedUrl, props.locale)

    if (!auth.isLoggedIn) {
        return {
            redirect: {
                destination: url,
                permanent: false
            }
        }
    }

    return getServerSideProps(props)
}

// eslint-disable-next-line react/function-component-definition
export const withAuthClient = (WrappedComponent: React.ComponentType) => () => {
    const router = useRouter()
    const { auth } = useAuth()

    useEffect(() => {
        const url = getRedirectHref(router.asPath, router.locale)
        const authCookie = getAuth()

        if (!authCookie.isLoggedIn && !auth.isLoggedIn) {
            router.push(url)
        }
    }, [auth.isLoggedIn, router])

    return <WrappedComponent />
}
