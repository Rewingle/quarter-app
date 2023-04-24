'use client'
import React, { useState } from 'react'
import { Box, Container, Flex, Image, Input } from 'theme-ui';
import Sticky from 'react-stickynode'
import Link from 'next/link';
import { signOut } from "next-auth/react"
//import { useSession } from "next-auth/react";
import ProfilePicHolder from './ProfilePicHolder';
import { useStore } from '../../store/store'

export default function Header() {
    const homeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-neutral-900">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
    const discover = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-neutral-900">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
    </svg>
    const notifications = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-neutral-900">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
    const messages = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-neutral-900">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
    const account = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
    const settings = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    const help = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
    </svg>
    const logout = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>

    const menu = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
    const dropArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.4} stroke="currentColor" className="w-3 h-3 text-teal-50">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>


    const {fullname, userName,profilePic, address} = useStore()



    const [mobileMenu, setMobileMenu] = useState(false);
    const [minilogo, setMiniLogo] = useState(false)
    const [accountMenu, toggleAccountMenu] = useState(false)


    const toggleMobileMenu = () => {
        setMobileMenu(!mobileMenu)
    }
    const openMobileMenu = () => {

    }
    const closeMobileMenu = () => {
        setMobileMenu(false);
        setMiniLogo(!minilogo)
    };
    return (
        <Box>
            <Box sx={styles.headerWrapper}>
                <Sticky enabled={true} top={0} activeClass="is-sticky" innerZ={10}>
                    <Box as="header"
                        sx={styles.header}
                        className={mobileMenu ? 'is-mobile-menu' : ''}>


                        <Container>
                            <Box className='headerInner' sx={styles.headerInner}>

                                <Box sx={styles.logo}>

                                    <Link href="/feed">
                                        <Image src='https://quarter-app.s3.eu-central-1.amazonaws.com/quartermini-big.png' alt="quarter logo" width={50} height={50} sx={styles.miniLogoStyle} />
                                        <Image src='https://quarter-app.s3.eu-central-1.amazonaws.com/quarterlogo.png' alt="quarter logo" sx={styles.logoStyle} />
                                    </Link>
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

                                        <Link href='/'><li ><a href=''>{homeIcon}</a></li></Link>
                                        <Link href='/discover'><li ><a href=''>{discover}</a></li></Link>
                                        <Link href='/notifications'><li ><a href=''>{notifications}</a></li></Link>
                                        <Link href='/messages'><li ><a href=''>{messages}</a></li></Link>


                                    </Box>

                                </Flex>
                                <Box sx={styles.searchContainer}>
                                    <Input sx={styles.search} placeholder='Search Quarter'></Input>
                                </Box>
                                <Box sx={styles.profile} onClick={() => { toggleAccountMenu(!accountMenu) }}>
                                    <Container sx={{ position: 'relative' }}>
                                        <div style={{ backgroundColor: 'dimgray', borderRadius: '50%', zIndex: 50, bottom: 0, right: 0, height: '14px', width: '14px', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {dropArrow}
                                        </div>
                                        {profilePic.length == 1 ? <ProfilePicHolder height={44} width={44} character={profilePic} />
                                            :
                                            <Image src={profilePic} width={46} height={46} className='aspect-square rounded-full' />}
                                    </Container>

                                </Box>
                                <Box sx={styles.mobileMenu}>
                                    {menu}
                                </Box>

                            </Box>


                        </Container>
                    </Box>
                </Sticky >
            </Box >

            {accountMenu ? <Box sx={styles.accountMenu}>
                <Box sx={styles.menuItems}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        {profilePic.length == 1? <ProfilePicHolder height={44} width={44} character={profilePic} />
                            :
                            <Image src={profilePic} width={46} height={46} className='aspect-square rounded-full' />}
                        <Box sx={{ marginLeft: '1em', fontWeight: '600', fontSize: '18px' }}>{fullname}</Box>
                    </Box>
                    <br />
                    <hr />

                    <ul style={{ fontSize: '18px' }}>
                        <Link href={'/user/' + userName}><li>{account} <div>Profile</div></li></Link>
                        <Link href='/settings'><li>{settings} <div>Settings</div> </li></Link>
                        <Link href='/support'><li>{help} <div>Help and Support</div></li></Link>
                        <li onClick={() => { signOut({ callbackUrl: '/' }) }}>{logout}<div>Log out</div></li>
                    </ul>
                </Box>
            </Box> : null}


        </Box>
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
    searchContainer: {
        outline: 'none',
        color: 'black',
    },
    search: {
        backgroundColor: 'lightgray',
        borderRadius: '2em',
        border: 'none',
        outline: 'none',
        marginLeft: ['2em', '0em', '0em', '0em', '0em']
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
        '&:hover': {
            cursor: 'pointer'
        }

    },
    mobileMenu: {
        display: ['block', 'block', 'block', 'none', 'none', 'none'],
        marginLeft: ['3em', 'none', 'none', 'none', 'none']
    },
    logoStyle: {
        width: '8em',
        ':hover': {
            cursor: 'pointer'
        },
        '@media only screen and (max-width: 768px)': {
            display: 'none'
        }
    },
    miniLogoStyle: {
        display: 'none',
        float: 'left',
        marginRight: '2em',
        '@media only screen and (max-width: 768px)': {
            display: 'block'
        }
    },
    accountMenu: {
        display: ['none', 'none', 'none', 'flex', 'flex', 'flex'],
        backgroundColor: 'white',
        zIndex: 1000,
        width: '300px',
        height: '280px',
        position: 'fixed',
        borderRadius: '8px',
        right: 200,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        p: 3,
        '& li': {
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            transition: '0.3s',
            ':hover': {
                backgroundColor: 'gainsboro',
                borderRadius: '8px',
                cursor: 'pointer'
            },
            '& div': {
                marginLeft: '1em'
            }
        }
    },
    menuItems: {
        width: '100% '
    },
}


