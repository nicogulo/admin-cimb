import type { AppProps } from "next/app"
import Head from "next/head"
import { appWithTranslation } from "next-i18next"

import { ThemesProvider } from "@components/ThemesProvider"
import AntdStyleRegistry from "@utils/style-registry/antd"
import EmotionStyleRegistry from "@utils/style-registry/emotion"

import "@styles/globals.css"

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <AntdStyleRegistry>
            <EmotionStyleRegistry>
                <ThemesProvider>
                    <Head>
                        <title>CIMB Admin Dashboard</title>
                    </Head>
                    <Component {...pageProps} />
                </ThemesProvider>
            </EmotionStyleRegistry>
        </AntdStyleRegistry>
    )
}

export default appWithTranslation(App)
