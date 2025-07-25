/* eslint-disable import/prefer-default-export */

import Router from "next/router"
import { UrlObject } from "url"

import { sanitizeUrl as _sanitizeUrl } from "@braintree/sanitize-url"

export const removeTrailingSlash = (url: string) => {
    if (!url) {
        return undefined
    }

    return url.replace(/\/$/, "")
}

export const getQueryStringParam = (name: string, url: string) => {
    const queryString = url.split(/\?/)[1]
    const params = new URLSearchParams(queryString)
    const viewParam = params.get(name)

    return viewParam
}

export const setQueryStringParam = (name: string, value: string, url: string) => {
    const queryString = url.split(/\?/)[1]
    const params = new URLSearchParams(queryString)
    params.set(name, value)

    return `${url.split(/\?/)[0]}?${params.toString()}`
}

export const removeQueryString = (url: string) => {
    const [pureUrl] = url.split("?")

    return pureUrl
}

export const autoFormatQueryString = (url: string | UrlObject) => {
    const viewParam = getQueryStringParam("view", Router.asPath)
    let newURL = url

    if (viewParam) {
        if (typeof newURL === "string") {
            newURL = setQueryStringParam("view", viewParam, newURL)
        } else {
            newURL.pathname = setQueryStringParam("view", viewParam, newURL.pathname || "")
        }
    }

    return newURL
}

export const sanitizeUrl = (url: string) => {
    let sanitizedUrl = _sanitizeUrl(url)

    if (sanitizedUrl === "about:blank") {
        sanitizedUrl = "/"
    }

    return sanitizedUrl
}
