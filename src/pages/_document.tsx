import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Favicon - ICO as primary (standard) */}
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

                {/* Theme color */}
                <meta name="theme-color" content="#667eea" />
                <meta name="msapplication-TileColor" content="#667eea" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
