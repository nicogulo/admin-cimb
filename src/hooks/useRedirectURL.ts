import { useEffect } from "react"
import { useRouter } from "next/router"

import { sanitizeUrl } from "@utils/url"

const isValidDomain = (hostname: string, domain: string) => hostname === domain || hostname.endsWith(`.${domain}`)

const isWhitelistedUrl = (url: string, whitelistDomains: string[]) => {
    try {
        const urlObj = new URL(url, window.location.origin)
        return (
            ["http:", "https:"].includes(urlObj.protocol) &&
            whitelistDomains.some((domain) => isValidDomain(urlObj.hostname, domain))
        )
    } catch {
        return false
    }
}

const getWhitelistDomains = (hostname: string) => {
    const domains = ["poccimb.com"]
    if (hostname === "localhost") domains.push("localhost")
    return domains
}

const useRedirectURL = () => {
    const router = useRouter()
    const redirect = router.query.redirect ? String(router.query.redirect) : ""
    const sanitizedRedirect = sanitizeUrl(redirect)

    const hostname = typeof window !== "undefined" ? window.location.hostname : ""
    const whitelistDomains = getWhitelistDomains(hostname)
    const isWhitelisted = isWhitelistedUrl(sanitizedRedirect, whitelistDomains)

    useEffect(() => {
        if (router.isReady && redirect && !isWhitelisted) {
            router.replace(router.pathname, undefined, { shallow: true })
        }
    }, [isWhitelisted, redirect, router])

    return isWhitelisted ? sanitizedRedirect : ""
}

export default useRedirectURL
