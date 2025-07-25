import React from "react"
import { useRouter } from "next/router"
import { Dropdown } from "antd"

import Icons from "@icons/icon"
import IconTranslation from "@icons/Images/Translation"

const LocaleSwitcher = () => {
    const router = useRouter()

    const handleLanguageChange = (lang: string) => {
        const { pathname, asPath, query } = router
        router.push({ pathname, query }, asPath, { locale: lang })
    }

    const languageMapping = {
        en: { name: "English", flag: "🇺🇸" },
        id: { name: "Bahasa Indonesia", flag: "🇮🇩" }
    }

    const currentLocale = router.locale || "en"

    return (
        <Dropdown
            menu={{
                items: Object.entries(languageMapping).map(([lang, setting]) => ({
                    key: lang,
                    label: (
                        <div
                            onClick={() => handleLanguageChange(lang)}
                            style={{
                                cursor: "pointer",
                                padding: "8px 12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            }}
                        >
                            <span>{setting.flag}</span>
                            <span>{setting.name}</span>
                            {currentLocale === lang && <span style={{ color: "#1890ff" }}>✓</span>}
                        </div>
                    )
                }))
            }}
            trigger={["click"]}
            placement="bottomRight"
        >
            <span
                style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)"
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                }}
            >
                <Icons icon={<IconTranslation />} width={16} height={16} />
                <span style={{ fontSize: "12px" }}>
                    {languageMapping[currentLocale as keyof typeof languageMapping]?.flag || "🌐"}
                </span>
            </span>
        </Dropdown>
    )
}

export default LocaleSwitcher
