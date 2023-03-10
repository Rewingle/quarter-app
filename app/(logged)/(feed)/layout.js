'use client'
import Header from '../../Components/Header'
import React from 'react'
import { Box, Container } from 'theme-ui'
import { useSession } from 'next-auth/react'
import DotLoader from 'react-spinners/DotLoader'
import {redirect} from 'next/navigation'

export default function LoggedLayout({ children }) {

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login')
            
        },
    })

    if (status === "loading") {

        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><DotLoader color='#14B8A6' size={30} /></div>
    }

    const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>

    const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>

    const bell = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
    const message = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
    const store = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>

    return (
        <React.Fragment>
            <Header />
            <Box as="section" id="feed" sx={styles.grid}>
                <Box sx={styles.leftBar}>
                    <Box sx={{ position: 'fixed' }}>
                        <div style={{ float: 'right' }}><span style={{ float: 'left' }}>{locationIcon}</span><span>ACIBADEM KADIKOY</span></div>
                        <ul style={styles.leftBarList}>

                            <a href=""><li><div >{homeIcon}</div><span></span><div>Home</div></li></a>
                            <a href=""><li><div >{bell}</div><span></span><div>Notifications</div></li></a>
                            <a href=""><li><div >{message}</div><span></span><div>Messages</div></li></a>
                            <a href=""><li><div >{store}</div><span></span><div>Business</div></li></a>
                        </ul>

                    </Box>


                </Box>
                <Box sx={styles.feedBar}>
                    <Box sx={styles.feedBarContainer}>
                        <Container sx={{ justifyContent: 'center', display: 'flex' }}>
                            {children}
                        </Container>
                    </Box>
                </Box>



                <Box sx={styles.rightBar}>
                    <Box sx={styles.rightBarContainer}>
                        <Container sx={styles.rightBarInner}>
                            <ul>
                                <li>-PEOPLE YOU MAY KNOW</li>
                                <li>-ADS</li>
                                <li>-SHOWCASE BANNER</li>
                            </ul>

                        </Container>
                    </Box>

                </Box>
            </Box>

        </React.Fragment>
    )


}
const styles = {
    grid: {
        display: ['flex', 'flex', 'flex', 'grid', 'grid'],
        gridTemplateColumns: '2fr 3fr 2fr'
    },
    leftBar: {
        display: ['none', 'none', 'none', 'flex', 'flex'],
        py: 3,
        justifyContent: 'right',
        width: '100%',
        '& li': {
            justifyContent: 'right',
            display: 'flex',
            flexDirection: 'row',
            '&:span': {
                flexGrow: 1,
            },
            '&:div': {
                flexGrow: 0,
            },
            marginTop: 2,
            width: '8em',
            borderRadius: '1em 1em 1em 1em',
            transition: '0.3s',
            px: 3,
            '&:hover': {
                backgroundColor: 'gainsboro',

            }
        }
    },
    feedBar: {
        width: '100%',
        p: 3,

    },
    feedBarContainer: {
        width: '100%',
        height: '100vh'
    },
    leftBarList: {
        fontSize: '24px',
        marginTop: '4em',
        height: '10em',

    },
    rightBar: {
        display: ['none', 'none', 'none', 'block', 'block'],
        p: 3,

    },
    rightBarContainer: {
        position: 'fixed',

        height: '100vh'
    }
}