'use client'
import React from 'react'
import Image from 'next/image'
import { Box, Button, Container } from 'theme-ui';
import Login from './Components/HomeRegister';
import Footer from './Components/Footer';


function Home() {
    const connection = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-teal-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
    const neighbor = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-teal-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
    const event = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-teal-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>


    return (

        <div>
            <Box sx={styles.header}>
                <Box sx={styles.headerContainer}>
                    <Image src='https://quarter-app.s3.eu-central-1.amazonaws.com/quarterlogo.png' width={128} height={64} style={styles.logo}></Image>
                    <ul style={{ color: 'white', padding: '0.4em', fontWeight: '600', marginLeft: '2em' }}>
                        <li style={{ float: 'left', display: 'inline' }}><a href=''>Neighbors</a></li>
                        <li style={{ float: 'left', display: 'inline', marginLeft: '1em' }}><a href=''>Business</a></li>
                    </ul>
                </Box>


            </Box>
            <Box sx={styles.imageContainer}>
                <Login />
                <Box sx={styles.bgImage}>
                    <Image src='https://quarter-app.s3.eu-central-1.amazonaws.com/home-bg.jpg' fill></Image>
                </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <Box sx={styles.lowerContent}>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <Box><p style={{textAlign: 'center', fontSize: '24px', fontStyle:'italic',fontWeight:'600'}}>
                            
                            Your neighborhood between your fingers.</p><br/><p style={{ textAlign: 'center', fontSize: '20px'}}>Where communities come together to greet newcomers, exchange recommendations, and read the latest local news.
                            Where neighbors support local businesses and get updates from public agencies. Where neighbors borrow tools and sell couches.
                            It's how to get the most out of everything nearby. Welcome, neighbor.</p></Box>
                    </Box>

                    <Box sx={styles.showcase}>

                        <Box sx={styles.features}>
                            <ul>
                                <li>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {connection}

                                    </Box>
                                    <Box sx={{ fontWeight: '600', fontSize: '20px', display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
                                        Stay Connected
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '1em', fontStyle: 'italic' }}>
                                        <p>Share ideas and voice your concerns. Make your quarter a better place all together.</p>
                                    </Box>
                                </li>
                                <li>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {neighbor}
                                    </Box>
                                    <Box sx={{ fontWeight: '600', fontSize: '20px', display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
                                        Find Neighbors
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '1em', fontStyle: 'italic' }}>
                                        <p>Your neighbors are probably using Quarter. Sign up for find them.</p>
                                    </Box>
                                </li>
                                <li>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {event}
                                    </Box>
                                    <Box sx={{ fontWeight: '600', fontSize: '20px', display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
                                        Organise Events
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '1em', fontStyle: 'italic' }}>
                                        <p>Throw a party where only your neighbors can join or organise a chess tournament.
                                            All up to your imagination.</p>
                                    </Box>
                                </li>
                            </ul>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '4em' }}>
                <Button className='bg-gradient-to-r from-teal-400 to-cyan-500' sx={{ width: '8em', height: '3em', color: 'white', fontSize: '20px', fontWeight: '600' }}>SIGN UP</Button>
            </Box>

            <Footer />
        </div>

    )
}

const styles = {
    imageContainer: {
        height: ['70vh','70vh','70vh','100vh','100vh'],
        position: 'relative',
        display: 'flex',
        alignItems: [null,null,null,'center','center'],
        justifyContent: 'center',
    },
    lowerContent: {
        width: ['62em'],
        py: [3, 3, 3, 6],
        px: 4
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    header: {
        zIndex: 20,
        width: '100%',
        height: '4em',
        justifyContent: 'center',
    },
    headerContainer: {
        position: 'absolute',
        width: 'inherit',
        height: 'inherit',
        backgroundColor: 'black',
        opacity: 0.7,
        py: 10,
        px: 30,
        display: 'flex',

    },
    bgImage:{
        display: ['none','none','none','block','block']
    },
    showcase: {

        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    features: {
        marginTop: '8em',
        display: 'flex',
       
        justifyContent:'center',
        alignItems:'center',
        px:5,
        '& li': {
            float:'left',
            width: '16em',
            height: '16em',
        }
    }
}

export default Home