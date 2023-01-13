'use client'
import next from "next";
import React from "react";
import { Container, Box, Text, Grid } from "theme-ui";
import { signIn, signOut, useSession } from 'next-auth/react';
import Header from "./Components/Header";

export default function Feed() {
    const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>



    return (
        <React.Fragment>
            <Header></Header>
            <Box as="section" id="feed" sx={styles.grid}>
                <Box sx={styles.leftBar}>
                    <Box sx={styles.leftBarContainer}>
                        
                        <Box><span style={{ float: 'right', fontWeight: '600' }}>ACIBADEM, KADIKOY</span><span style={{ float: 'right' }}>{homeIcon}</span></Box>
                        <Container sx={styles.leftBarInner}>

                            <ul>
                                <li><a href="">Home</a></li>
                                <li><a href="">Notifications</a></li>
                                <li><a href="">Messages</a></li>
                                <li><a href="">Business</a></li>
                            </ul>
                        </Container>
                    </Box>

                </Box>
                <Box sx={styles.feedBar}>
                    <Box sx={styles.feedBarContainer}>
                        <Container>
                            <ul>

                            </ul>
                        </Container>
                    </Box>

                </Box>
                <Box sx={styles.rightBar}>
                    <Box sx={styles.rightBarContainer}>
                        <Container sx={styles.rightBarInner}>
                            <ul>
                                <li><a>asda</a></li>
                                <li>adsasd</li>
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
        display: ['flex', 'flex', 'flex', 'flex', 'grid'],
        gridTemplateColumns: '1fr 2fr 1fr'
    },
    leftBar: {
        display: ['none', 'none', 'none', 'none', 'block'],
        p: 3,
        float: 'left',
        backgroundColor: 'red',
    },
    leftBarContainer: {
        py: 3,
        position:'fixed',
        backgroundColor: 'green'
    },
    leftBarInner: {
        justifyContent: 'right',
        display: 'flex',
        fontWeight: '600',
        fontSize: '22px',
        '& li': {
            textAlign: 'right',
            marginTop: '0.5em',
            width: '10em',
            borderRadius: '1em 0 0 1em',
            transition: '0.3s',
            '&:hover': {
                backgroundColor: 'gainsboro'
            }
        }
    },
    feedBar: {
        width: '100%',
        p: 3,

    },
    feedBarContainer: {
        backgroundColor: 'aquamarine',
        width: '100%',
        height: '100vh'
    },
    rightBar: {
        display: ['none', 'none', 'none', 'none', 'block'],
        p: 3,
        float: 'right'
    },
    rightBarContainer: {
        position: 'fixed',
        width: '100%',
        height: '100vh'
    }
}