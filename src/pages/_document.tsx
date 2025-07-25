import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Favicon - ICO as primary (standard) */}
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
                <link rel="manifest" href="/site.webmanifest" />

                {/* Additional favicon sizes */}
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

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
