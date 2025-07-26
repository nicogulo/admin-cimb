/* eslint-disable import/prefer-default-export */

export const getRedirectHref = (path: string, locale: string = "id") => {
    if (path === "/" || path.includes("register") || path.includes("sign-in")) {
        return `/${locale}/auth/sign-in`
    }

    return `/${locale}/auth/sign-in?redirect=${path}`
}
