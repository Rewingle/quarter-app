'use client'
import Header from './Components/Header'
import './globals.css'
import { SessionProvider } from "next-auth/react"


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

           
                    <main>{children}</main>


                </body>

            </html>
        </SessionProvider>
    )
}