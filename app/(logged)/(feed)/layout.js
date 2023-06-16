'use client'
import Header from '../../Components/Header'
import React from 'react'
import { Box, Button, Card, Container } from 'theme-ui'
import { useSession } from 'next-auth/react'
import DotLoader from 'react-spinners/DotLoader'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import NearbyPeople from '../../Components/NearbyPeople'
import Image from 'next/image'

export default function LoggedLayout({ children }) {

    const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
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
    const discover = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-neutral-900">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
    </svg>
    const notifications = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-neutral-900">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>


    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login')

        }

    })

    if (status === "loading") {

        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><DotLoader color='#14B8A6' size={30} /></div>
    }
    const userId = session.user.name.split(',')[0]
    const neighborhood = session.user.name.split(',')[6]
    const district = session.user.name.split(',')[5]
    const province = session.user.name.split(',')[4]

    return (
        <React.Fragment>
            <Header />
            <Box as="section" id="feed" sx={styles.grid}>
                <Box sx={styles.leftBar}>
                    <Box sx={{ position: 'fixed' }}>
                        <Box sx={{ float: 'right', position: 'absolute', display: 'flex' }}><span style={{ float: 'left' }}>{locationIcon}</span><span>{neighborhood.toUpperCase() + ' ' + district.toUpperCase()}</span></Box>
                        <Box sx={{ marginTop: '6em' }}>
                            <ul style={styles.leftBarList}>

                                <Box><Link href="/feed"><li><div >{homeIcon}</div><span></span><div>Home</div></li></Link></Box>
                                <Box><Link href="/notifications"><li><div >{bell}</div><span></span><div>Notifications</div></li></Link></Box>
                                <Box><Link href="/message"><li><div >{message}</div><span></span><div>Messages</div></li></Link></Box>
                                <Box><Link href="/business"><li><div >{store}</div><span></span><div>Business</div></li></Link></Box>
                            </ul>
                        </Box>
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
                                <li>
                                    <Box sx={{ width: '300px', height: '200px', borderRadius: '8px', backgroundColor: 'white', position: 'relative' }} className='drop-shadow-lg'>
                                        <Image src={'https://quarter-app.s3.eu-central-1.amazonaws.com/site-content/surveyno.jpg'} width={300} height={200} style={{ borderRadius: '8px' }}></Image>
                                        <Box sx={{ position: 'absolute', top: 0, left: 0, zIndex: 5,color:'white',p:4,fontSize:'18px',fontWeight:600 }}>
                                            <Box>Complete a quick survey </Box>
                                            <Box>to help improve the </Box>
                                            <Box>Quarter experience</Box>
                                        </Box>
                                        <Box sx={{ position: 'absolute', bottom: 0, left: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '300px' }}>
                                            <Button sx={{ borderRadius: '2em', backgroundColor: 'white', color: 'black', fontWeight: 600, zIndex: 100, width: '10em', mb: 2 }} onClick={()=>{alert('Work in progress')}}>Start survey</Button>
                                        </Box>

                                    </Box>
                                </li>
                                <br />
                                <li>
                                    <Box sx={{ width: '300px', height: '200px', borderRadius: '8px', backgroundColor: 'white', position: 'relative' }} className='drop-shadow-lg'>
                                        <Image src={'https://quarter-app.s3.eu-central-1.amazonaws.com/site-content/banner2.jpg'} width={300} height={200} style={{ borderRadius: '8px' }}></Image>
                                        <Box sx={{ position: 'absolute', width: '300px', height: '3.5em', opacity: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1, backgroundColor: '#292524', color: 'white', bottom: 0, left: 0, zIndex: 5, borderRadius: '0 0 8px 8px' }}>
                                            <Link href={'/discover'}><Button sx={{ borderRadius: '2em', color: 'white', fontWeight: 600, zIndex: 100 }}>Workshops</Button></Link>
                                        </Box>
                                    </Box>
                                </li>
                                <br />
                                <Card sx={{ borderRadius: '1em', backgroundColor: 'white', py: 2 }} className="drop-shadow-lg">
                                    <Box sx={{ fontWeight: 600, fontSize: '22px', fontStyle: 'italic', p: 2, textAlign: 'center', mb: 2 }}>People you may know</Box>
                                    <NearbyPeople address={{ 'province': province, 'district': district, 'neighborhood': neighborhood }} userId={userId} />
                                </Card>
                            </ul>

                        </Container>
                    </Box>

                </Box>
            </Box>
            <Box sx={styles.mobileFooter}>
                <Box>
                    <Box style={styles.content}>
                        <Box sx={{ px: 3, '&:hover': { cursor: 'pointer' } }}><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Link href={'/feed'}>{homeIcon}</Link></Box>Home</Box>
                        <Box sx={{ px: 3, '&:hover': { cursor: 'pointer' } }}><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Link href={'/discover'}>{discover}</Link></Box>Discover</Box>
                        <Box sx={{ px: 3, '&:hover': { cursor: 'pointer' } }}><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{store}</Box>Business</Box>
                        <Box sx={{ px: 3, '&:hover': { cursor: 'pointer' } }}><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifications}</Box>Notifications</Box>

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
        height: '10em',
        width: '7em',
        width: '100%',
        ': div': {
            backgroundColor: 'red'
        }
    },
    rightBar: {
        display: ['none', 'none', 'none', 'block', 'block'],
        py: 3,


    },
    rightBarContainer: {
        position: 'fixed',
        height: '100vh'
    },
    mobileFooter: {
        display: 'none',
        position: 'fixed',
        width: '100vw',
        backgroundColor: 'red',
        left: 0,
        bottom: 0,
        textAlign: 'center',
        backgroundColor: 'white',
        boxShadow: '4px 4px 8px 4px rgba(0, 0, 0, 0.25)',
        '@media only screen and (max-width: 768px)': {
            display: 'block'
        }
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '4em',
        fontSize: '14px',
        '& li': {
            marginleft: '1em'
        }
    }
}