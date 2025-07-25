/* eslint-disable import/prefer-default-export */
import { OptionsType } from "cookies-next/lib/types"

import { APP_ENV } from "@config/config"

import { isBrowser } from "./browser"
import { getCookie, removeCookie, setCookie } from "./cookies"

const isDevelopment = APP_ENV?.toLocaleLowerCase() === "development"
const hashKey = isDevelopment ? "dev_auth_hash_admin" : "auth_hash_admin"
const tokenKey = isDevelopment ? "dev_auth_token_admin" : "auth_token_admin"

export const getAuth = (options?: OptionsType) => {
    const authHash = getCookie(hashKey, options) ?? undefined
    const authToken = getCookie(tokenKey, options) ?? undefined

    const checkAuth = Boolean((authHash && authToken) || authToken)

    return {
        token: checkAuth ? authToken : undefined,
        hash: authHash || undefined,
        isLoggedIn: checkAuth || false
    }
}

export const setAuth = ({ hash, token }: Auth) => {
    if (hash) setCookie(hashKey, hash)
    if (token) setCookie(tokenKey, token)

    return true
}

if (isBrowser && isDevelopment) {
    window.setAuth = setAuth
}

export const resetAuth = () => {
    removeCookie(hashKey)
    removeCookie(tokenKey)

    return true
}
