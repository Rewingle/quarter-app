'use client'
import './globals.css'
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from 'theme-ui'

export default function RootLayout({ children }) {
    //THEME PROVIDER IS NOT WRAPPED {children}
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
                        {children}
                    </main>


                </body>

            </html>
        </SessionProvider>
    )
}