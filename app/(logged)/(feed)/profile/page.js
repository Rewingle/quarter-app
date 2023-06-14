'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import DotLoader from 'react-spinners/DotLoader'
import ProfilePicHolder from '../../../Components/ProfilePicHolder'
import { Card, Box, Container, Button, Link } from 'theme-ui'
import { keyframes } from '@emotion/react'

function page() {

    const addFriend = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
    const more = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-60 hover:cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
    const home = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 opacity-80">
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
    const edit = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    const setting = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>

    const { data: session, status } = useSession()

    if (status === "loading") {

        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><DotLoader color='#14B8A6' size={30} /></div>
    }

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()
    const [friends, setFriends] = useState()

    const userId = session.user.name.split(',')[0]
    const userName = session.user.name.split(',')[3]

    useEffect(() => {
        const getUserInfo = async () => {
            await fetch('/api/getProfile',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        userName: userName,
                        userId: userId
                    })
                }).then(res => res.json().then(data => {
                    setUser(data.user);
                    setFriends(data.friends)
                    if (data.posts) {
                        setPosts(data.posts)
                    }
                }))
        }
        getUserInfo()
    }, [])

    const UserInfoSkeleton = () => {
        const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
        return (
            <React.Fragment>
                <Container sx={styles.picContainer}>
                    <Box sx={styles.pic}>
                        <Box sx={{ borderRadius: '50%', width: '92px', height: '92px', backgroundColor: 'gainsboro' }}></Box>
                    </Box>
                    <Box sx={{ width: '100%', animation: `${fadeIn} 2s backwards infinite` }}>
                        <Box sx={{ py: 4 }}>
                            <Box sx={{ width: '12em', height: '2em', backgroundColor: '#d4d4d4', borderRadius: '1em' }}></Box>
                            <Box sx={{ display: 'flex', mt: 2 }}>
                                <Box sx={{ width: '16em', height: '1em', backgroundColor: '#e4e4e7', borderRadius: '1em' }}></Box>

                            </Box>
                        </Box>
                    </Box>
                </Container>
                <Box sx={{ display: 'flex', px: 4, py: 2, alignItems: 'center', animation: `${fadeIn} 2s backwards infinite` }}>
                    <Button sx={{ display: 'flex', width: '8em', height: '2em', opacity: 0.8, borderRadius: '0.5em', backgroundColor: '#e4e4e7' }}></Button>
                    <Button sx={{ display: 'flex', backgroundColor: '#d4d4d4', width: '6em', height: '2em', color: 'gray', borderRadius: '0.5em', marginLeft: '1em' }}></Button>
                    <Box sx={{ marginLeft: '1em', borderRadius: '50%', backgroundColor: 'gainsboro', p: 1 }}>{more}</Box>
                </Box>
            </React.Fragment>
        )


    }

    return (
        <Box sx={{ width: '100%', px: [0, 0, 0, 5, 5, 5] }}>
            <Card sx={styles.container} className='drop-shadow-lg'>
                {user ? <React.Fragment>
                    <Container sx={styles.picContainer}>
                        <Box sx={styles.pic}>
                            {user ? <ProfilePicHolder width={92} height={92} src={user.profilePic} /> : null}
                        </Box>
                        <Box sx={styles.userInfo}>
                            <Box sx={{ py: 4 }}>
                                <Box sx={styles.name}>{user ? user.firstName + ' ' + user.lastName : null}</Box>
                                <Box sx={styles.location}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>{home}</Box><Box sx={{ ml: 2 }}>{user ? user.address.neighborhood + ' ' + user.address.district : null}</Box>

                                </Box>
                            </Box>
                        </Box>


                    </Container>
                    <Box sx={styles.edit}>

                        <Button sx={{ display: 'flex', opacity: 0.8, backgroundColor: 'rgb(206, 206, 206)', color: 'black', fontWeight: 600, ':hover': { opacity: 1 }, borderRadius: '0.5em' }}>{edit}Edit profile</Button>
                        <Link href='/settings'><Box sx={{ display: 'flex', opacity: 0.8, alignItems: 'center', backgroundColor: 'rgb(206, 206, 206)', borderRadius: '50%', p: 2, ml: 2, ':hover': { opacity: 1, cursor: 'pointer' } }}>{setting}</Box></Link>
                    </Box>
                </React.Fragment> : <UserInfoSkeleton />}
            </Card>
            <Box>
                <Card sx={styles.container}>
                    <Box sx={{ fontWeight: 600, fontSize: '22px', fontStyle: 'italic', display: 'flex', alignItems: 'center', opacity: 0.7, mb: 2 }}>Friends</Box>
                    <Box className='drop-shadow-lg' sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', backgroundColor: 'white', borderRadius: '1em' }}>
                        {friends ? friends.map(({ firstName, lastName, userName, profilePic }, index) => (
                            <Box>

                                <Box key={index} className='drop-shadow-lg' sx={{ p: 1, width: '120px', height: '120px', backgroundColor: 'white', borderRadius: '1em' }}>
                                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}><ProfilePicHolder src={profilePic} width={44} height={44} /></Box>
                                    <Box sx={{textAlign:'center',textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',':hover':{cursor:'pointer',textDecoration:'underline'}}}>{firstName + ' ' + lastName }</Box>
                                </Box>
                            </Box>
                        ))
                            :
                            null
                        }


                    </Box>
                </Card>
            </Box>
        </Box>
    )
}

const styles = {

    container: {
        px: [0, 0, 0, 3, 3, 3],
        py: 3,
        width: '100%',
        borderRadius: '1em',
        backgroundColor: 'white'
    },
    slider: {
        height: '200px',
        width: '200px',
        backgroundColor: 'red',
        transform: 'translate3d(-50%,0,0)'
    },
    picContainer: {
        display: 'grid',
        gridTemplateColumns: ['2fr 5fr', '2fr 5fr', '2fr 5fr', '5fr 5fr', '5fr 5fr', '2fr 5fr'],
        height: '8em',

    },
    edit: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'right'

    },
    pic: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    userInfo: {

        width: '100%',

    },
    name: {
        fontWeight: '700',
        fontStyle: 'italic',
        fontSize: '30px',
        textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
    },
    location: {
        display: 'flex'
    }

}


export default page