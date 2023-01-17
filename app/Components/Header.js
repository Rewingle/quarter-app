import React, { useState } from 'react'
import { jsx, Box, Container, MenuButton, Flex, Button, Image, } from 'theme-ui';
import Sticky from 'react-stickynode'

import { getProviders, signOut } from "next-auth/react"

export default function Header() {
    const menuItems = [
        {
            path: 'https://storage.googleapis.com/lookal/home.png',

        },
        {
            path: 'https://storage.googleapis.com/lookal/compass.png',

        },
        {
            path: 'https://storage.googleapis.com/lookal/bell.png',

        },
        {
            path: 'https://storage.googleapis.com/lookal/message.png',

        }
    ];

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
                            <a href=''>
                                <Image src='https://storage.googleapis.com/lookal/logomini.png' alt="lookal logo" sx={styles.logoStyle} />
                            </a>
                            <Flex
                                as="nav"
                                sx={styles.navbar}
                                className={mobileMenu ? 'navbar active' : 'navbar'}
                            >
                                <Box
                                    as="ul"
                                    sx={styles.navList}
                                >
                                    {menuItems.map(({ path }, i) => (
                                        <li key={i}>
                                            <a href=''><Image src={path} sx={{ width: '32px', margin: '0px 40px', padding: 0 }}></Image></a>
                                        </li>
                                    ))}
                                </Box>

                            </Flex>
                            <Box sx={styles.profile}>
                                <Image src='https://storage.googleapis.com/lookal/mainuser.jpg' width='42' height='42' style={{ borderRadius: '50%', marginRight: '1em' }} />
                                <Button onClick={() => { signOut() }} sx={{ backgroundColor: '#14B8A6' }}>Logout</Button>
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
        display: 'flex',
        pr: 6,
        pl: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        '@media only screen and (max-width: 968px)': {
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
    navbar: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        color: 'white'
    },
    navList: {
        display: ['flex'],
        listStyle: 'none',
        p: 0,
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
        display: 'flex'
    },
    logoStyle: {
        width: '8em',
        ':hover': {
            cursor: 'pointer'
        }
    }
}


