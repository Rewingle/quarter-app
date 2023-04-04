'use client'
import './globals.css'
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from 'theme-ui'
import theme from '../theme/theme'

export default function RootLayout({ children }) {

    return (
        <SessionProvider>
            <html lang="en">
                <head>
                    <title>Quarter | Meet with your Neighbors</title>
                    <meta name="desc" content="genereate" />
                    <link rel="icon" href="/favicon.ico" />
                </head>
                <body>


                    <main>
                        <ThemeProvider theme={theme}>{children}</ThemeProvider>
                    </main>


                </body>

            </html>
        </SessionProvider>
    )
}