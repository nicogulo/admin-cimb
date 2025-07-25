import React from "react"

// Favicon component untuk display logo sebagai React component
export const FaviconSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="4" y="4" width="24" height="24" rx="4" fill="#667eea" opacity="0.1" />
            <rect x="8" y="8" width="16" height="16" rx="2" fill="#667eea" opacity="0.3" />
            <rect x="12" y="12" width="8" height="8" rx="1" fill="#667eea" />
        </svg>
    )
}

// Favicon path untuk HTML links (sekarang menggunakan ICO sebagai standar)
export const faviconPath = "/favicon.ico"

// Favicon sebagai data URL untuk digunakan dinamis (jika diperlukan)
export const faviconDataURL = `data:image/x-icon;base64,...` // Generated ICO data

export default FaviconSVG
