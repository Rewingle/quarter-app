import React, { useState } from 'react'
import { Box, Container, Flex, Image, Input } from 'theme-ui';
import Sticky from 'react-stickynode'

import { getProviders, signOut } from "next-auth/react"

export default function Header() {
    const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-neutral-900">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
    const discover = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-neutral-900">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
    </svg>
    const notifications = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-neutral-900">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
    const messages = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-neutral-900">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
    const account = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-neutral-900">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    const menu = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>


    const [mobileMenu, setMobileMenu] = useState(false);


    const toggleMobileMenu = () => {
        setMobileMenu(!mobileMenu)
    }
    const openMobileMenu = () => {

    }
    const closeMobileMenu = () => {
        setMobileMenu(false);
    };
    return (
        <Box sx={styles.headerWrapper}>
            <Sticky enabled={true} top={0} activeClass="is-sticky" innerZ={10}>
                <Box as="header"
                    sx={styles.header}
                    className={mobileMenu ? 'is-mobile-menu' : ''}>


                    <Container>
                        <Box className='headerInner' sx={styles.headerInner}>

                            <Box sx={styles.logo}>
                                <a href=''>
                                    <Image src='https://quarter-app.s3.eu-central-1.amazonaws.com/quarterlogo-mini.png' alt="lookal logo" sx={styles.logoStyle} />
                                </a>
                            </Box>

                            <Flex
                                as="nav"
                                sx={styles.navbar}
                                className={mobileMenu ? 'navbar active' : 'navbar'}
                            >
                                <Box
                                    as="ul"
                                    sx={styles.navList}
                                >
                                    {/* {menuItems.map(({ path }, i) => (
                                        <li key={i}>
                                            <a href=''>{path}</a>
                                        </li>
                                    ))} */}

                                    <li ><a href=''>{homeIcon}</a></li>
                                    <li ><a href=''>{discover}</a></li>
                                    <li ><a href=''>{notifications}</a></li>
                                    <li ><a href=''>{messages}</a></li>


                                </Box>

                            </Flex>
                            <Box sx={styles.searchContainer}>
                                <Input sx={styles.search} placeholder='Search Quarter'></Input>
                            </Box>
                            <Box sx={styles.profile} onClick={() => { signOut() }}>
                                {account}
                            </Box>
                            <Box sx={styles.mobileMenu}>
                                {menu}
                            </Box>

                        </Box>


                    </Container>
                </Box>
            </Sticky >
        </Box >
    )
}

const styles = {
    headerWrapper: {
        '.is-sticky': {
            header: {
                backgroundColor: 'white',
                py: [10],
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
            },

        },
    },
    header: {
        backgroundColor: 'white',
        left: 0,
        right: 0,
        py: [20],
        /* transition: 'all 0.3s ease-in-out 0s',
        '&.is-mobile-menu': {
          backgroundColor: '#10132d',
    
        }, */
    },
    headerInner: {
        display: 'grid',
        gridTemplateColumns: '2fr 4fr 1.4fr 0.3fr 0.3fr',
        pr: [3, 3, 3, 6, 6, 6],
        pl: [3, 3, 3, 6, 6, 6],
        alignItems: 'center',


        '@media only screen and (max-width: 1062px)': {
            '.navbar': {
                position: 'absolute',
                top: '100%',
                backgroundColor: '#10132d',
                width: '100%',
                left: 0,
                p: '20px 30px',
                display: 'block',
                boxShadow: '0 6px 13px rgba(38,78,118,0.1)',
                opacity: 0,
                visibility: 'hidden',
                transition: 'all 0.3s ease-in-out 0s',
                '&.active': {
                    opacity: 1,
                    visibility: 'visible',
                },
                ul: {
                    display: 'block',
                    'li + li': {
                        marginTop: 5,
                    },
                },
                button: {
                    marginTop: 8,
                    width: '100%',
                },
            },
        },
    },
    searchContainer:{
        outline: 'none',
        color: 'black',
    },
    search: {
        backgroundColor: 'lightgray',
        borderRadius: '2em',
        border:'none',
        outline: 'none',
        marginLeft:['2em','0em','0em','0em','0em']
    },
    logo: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
    },
    navbar: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    navList: {
        display: ['flex'],
        listStyle: 'none',
        p: 0,
        '& li': {
            margin: '0px 40px',
            borderRadius: '8px',
            width: '2em', height: '2em',
            '&:hover': {
                backgroundColor: '#f2f2f2'
            },
        },

        '.nav-item': {
            cursor: 'pointer',
            fontWeight: 400,
            padding: 0,
            margin: '0 20px',
        },
        '.active': {
            color: 'black',
        },
    },
    profile: {
        marginLeft: 'auto',
        display: ['none', 'none', 'none', 'flex', 'flex', 'flex'],

    },
    mobileMenu:{
        display:['block','block','block','block','none','none'],
        marginLeft:['3em','none','none','none','none']
    },
    logoStyle: {
        width: '8em',
        ':hover': {
            cursor: 'pointer'
        }
    }
}


