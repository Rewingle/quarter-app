'use client'
import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import ProfilePicHolder from './ProfilePicHolder'
import Link from 'next/link'
import { Button } from 'theme-ui'

function NearbyPeople(props) {

    const add = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>

    const [people, setPeople] = useState(null)
    const [buttonType, setButtonType] = useState()
    const [addFriendClicked,setAddFriendClicked] = useState(false)

    const addFriend = async (friendId) => {
        await fetch('/api/manageFriend', {
            method: 'POST', body: JSON.stringify({
                userId: props.userId,
                friendId: friendId
            })
        }).then((res) => res.json().then(data => { setButtonType(data.type) }))
    }
    useEffect(() => {
        const getPeople = async () => {
            await fetch('/api/getNearbyPeople', {
                method: 'POST',
                body: JSON.stringify({ address: props.address, userId: props.userId })
            }).then(res => res.json().then(data => { console.log(data); setPeople(data) })).catch(err => console.log(err))
        }
        getPeople()
    }, [])

    return (
        <Box>
            {people ? people.map(({ user, isFriend }, index) => (
                <Box sx={{ display: 'block', height: '3em', p: 2, mt: 1 }}>
                    <Box sx={{ display: 'flex', float: 'left', left: 0 }}>
                        <ProfilePicHolder src={user.profilePic} width={38} height={38} />
                        <Box sx={{ ml: 3, width: '9em' }}>
                            <Box sx={{ fontWeight: 600, fontSize: '15px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', ':hover': { textDecorationLine: 'underline' } }} key={index}>
                                <Link href={'/user/' + user.userName}>{user.firstName + ' ' + user.lastName}</Link>
                            </Box>
                            <Box sx={{ fontSize: '12px' }}>Nearby</Box>
                        </Box>
                    </Box>

                    <Box sx={{ float: 'right', right: 0 }}>
                        {!isFriend || !addFriendClicked ? <Button onClick={() => { addFriend(user._id) }} sx={{ borderRadius: '2em', fontWeight: 600, height: '36px', justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: '14px', float: 'right' }}>{add}ADD</Button>
                            :
                            <Button onClick={() => { addFriend(user._id) }} sx={{ borderRadius: '2em', fontWeight: 600, height: '36px', justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: '14px', float: 'right' }}>REMOVE</Button>
                        }
                    </Box>
                </Box>
            )) : null}
        </Box>
    )
}

export default NearbyPeople