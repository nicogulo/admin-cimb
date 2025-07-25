/* eslint-disable react/display-name */

import { useEffect } from "react"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

import useAuth from "@hooks/useAuth"
import { getAuth } from "@utils/auth"
import { getRedirectHref } from "@utils/redirection"

export const withAuthSSR =
    (getServerSidePropsFunc: GetServerSideProps) => async (context: GetServerSidePropsContext) => {
        const auth = getAuth({ req: context.req, res: context.res })
        const url = getRedirectHref(context.resolvedUrl)

        if (!auth.isLoggedIn) {
            return {
                redirect: {
                    destination: url,
                    permanent: false
                }
            }
        }

        return getServerSidePropsFunc(context)
    }

// eslint-disable-next-line react/function-component-definition
export const withAuthClient = (WrappedComponent: React.ComponentType) => () => {
    const router = useRouter()
    const { auth } = useAuth()

    useEffect(() => {
        const url = getRedirectHref(router.asPath)
        const authCookie = getAuth()

        if (!authCookie.isLoggedIn && !auth.isLoggedIn) {
            router.push(url)
        }
    }, [auth.isLoggedIn, router])

    return <WrappedComponent />
}
