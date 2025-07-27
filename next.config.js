/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config.js")

const nextConfig = {
    i18n,
    productionBrowserSourceMaps: true,
    reactStrictMode: true,
    transpilePackages: ["antd"],
    devIndicators: false,
    compiler: {
        emotion: true
    },
    api: {
        bodyParser: false
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "your-cdn-domain.com"
            },
            {
                protocol: "https",
                hostname: "your-storage-domain.com"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com"
            },
            {
                protocol: "https",
                hostname: "placehold.co"
            }
        ]
    }
}

module.exports = nextConfig
