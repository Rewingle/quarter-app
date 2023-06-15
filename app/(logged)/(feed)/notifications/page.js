'use client'
import React, { useState, useEffect } from 'react'
import { Box, Card } from 'theme-ui'
import { useSession } from 'next-auth/react'
import DotLoader from 'react-spinners/DotLoader'
import ProfilePicHolder from '../../../Components/ProfilePicHolder'
import Link from 'next/link'

function page(props) {
    const notifIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-neutral-900">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
    const closebtn = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    const accept = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
    const deny = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>

    const { data: session, status } = useSession()

    if (status === "loading") {

        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><DotLoader color='#14B8A6' size={30} /></div>
    }

    const userId = session.user.name.split(',')[0]

    const [notifications, setNotifications] = useState()
    const [isAccepted, setAccepted] = useState()
    useEffect(() => {
        const getNotifications = async () => {
            await fetch('/api/getNotifications', {
                method: 'POST',
                body: JSON.stringify({ userId: userId })
            }).then(res => res.json().then(data => { console.log(data), setNotifications(data.notifications) })).catch(err => console.log(err))
        }
        getNotifications()
    }, [])
    const acceptRequest = async (friendId) => {
        await fetch('/api/acceptFriend', {
            method: 'POST',
            body: JSON.stringify({ userId: userId, friendId: friendId })
        }).then(() => setAccepted(friendId))
    }
    return (
        <Box sx={{ width: '100%', px: [0, 0, 0, 5, 5, 5] }}>
            <Box sx={{ fontWeight: 600, fontSize: '22px', fontStyle: 'italic', display: 'flex', alignItems: 'left', opacity: 0.8, mb: 2 }}><Box sx={{ ml: 2 }}>{notifIcon}</Box>Notifications</Box>
            <ul>
                {notifications ? notifications.map(({ type, date, senderInfo }) => (
                    <Box>
                        {senderInfo._id == isAccepted ? null
                            :
                            <Card className='drop-shadow-lg' sx={{ width: '100%', height: '8em', backgroundColor: 'white' }}>
                                <Box sx={{ display: 'block', p: 2 }}>
                                    {type == 'friend-request' ? <Box sx={{ fontWeight: 600, fontSize: '18px', fontStyle: 'italic', float: 'left', left: 0 }}>
                                        NEW FRIEND REQUEST
                                    </Box> : null}
                                    <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right', float: 'right', right: 0 }}>
                                        <Box sx={{ ':hover': { cursor: 'pointer', backgroundColor: 'gainsboro', borderRadius: '50%' } }}>{closebtn}</Box>

                                    </Box>

                                </Box>
                                <br />
                                <hr />
                                <Box sx={{ display: 'block' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', height: '5em', px: 2, float: 'left', left: 0 }}>
                                        <ProfilePicHolder src={senderInfo.profilePic} height={56} width={56} />
                                        <Box>
                                            <Link href={'/user/' + senderInfo.userName}>
                                                <Box sx={{ ml: 2, fontWeight: 600, fontSize: '20px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', ':hover': { textDecorationLine: 'underline' } }}>
                                                    {senderInfo.firstName + ' ' + senderInfo.lastName}
                                                </Box>
                                            </Link>
                                        </Box>
                                    </Box>
                                    <Box sx={{ float: 'right', right: 0, display: 'flex', ml: 2, alignItems: 'center', justifyContent: 'center', height: '5em' }}>
                                        <Box sx={{ backgroundColor: '#14b8a6', borderRadius: '50%', mr: 3, opacity: 0.7, p: 1, ':hover': { cursor: 'pointer', opacity: 1 } }} onClick={() => { acceptRequest(senderInfo._id) }}>{accept}</Box>
                                        <Box sx={{ backgroundColor: '#ef4444', borderRadius: '50%', mr: 3, opacity: 0.7, p: 1, ':hover': { cursor: 'pointer', opacity: 1 } }} onClick={() => { denyRequest() }}>{deny}</Box>
                                    </Box>
                                </Box>

                            </Card>}
                    </Box>

                )) : null}
            </ul>

        </Box>
    )
}

export default page