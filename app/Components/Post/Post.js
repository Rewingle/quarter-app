'use client'
import React, { useState } from 'react'
import { Box, Card, Container } from 'theme-ui'
import Image from 'next/image'
import Comment from './Comment'
import Link from 'next/link'
import ProfilePicHolder from '../ProfilePicHolder'


function Post(props) {
    const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
    const like = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
    </svg>
    const more = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 opacity-60 hover:cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
    const comment = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>

    console.log(props.profilePic)
    const [showComments, setShowComments] = useState(false)
    const isProfilePicExist = props.profilePic.length == 1

    const handleShowComments = async () => {
        setShowComments(!showComments)
        console.log(props.comments)
    }

    return (
        <Card sx={styles.post} className="drop-shadow-lg">
            <Box sx={{ width: '100%', top: 0, display: 'flex' }}>
                <Box sx={styles.userInfo}>
                    <div style={{ gridRow: '1/span 2', width: '46px', height: '46px' }}>
                        {isProfilePicExist ? <ProfilePicHolder width={46} height={46} character={props.profilePic} /> : <Image src={props.profilePic} width='46' height='46' style={{ borderRadius: '50%' }} />}</div>
                    <Box sx={{ marginLeft: '1em' }}>
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            <Box sx={styles.fullName}><Link href={'/user/' + props.userName}>{props.fullName}</Link></Box>
                            <Box sx={{ float: 'right' }}></Box>
                        </Box>

                        <Box sx={{ fontSize: '16px', fontWeight: 'lighter', display: 'flex', opacity: 0.7 }}><span>{locationIcon}</span><span>{props.location} , {props.date}</span> <span style={{float:'right'}}></span></Box>
                    </Box>

                </Box>
                <Box sx={{ float: 'right' }}>{more}</Box>
            </Box>


            <Container sx={{ p: 1 }}>{props.text}</Container>
            {props.image ? <Box>
                <img src={props.image}></img>
            </Box> : null}

            <Box sx={{ mt: 1 }}>
      
                <Box sx={{ display: 'flex', marginBottom: '1em', float: 'right' }}>
                    
                    <Box sx={{ display: 'flex', p: 1, borderRadius: '16px', ':hover': { backgroundColor: '#f6f6f6', cursor: 'pointer' } }}><span>{like}</span> <span style={{ marginLeft: '0.4em' }}>{props.likes}</span></Box>

                    <Box onClick={() => { handleShowComments() }} sx={{ display: 'flex', p: 1, borderRadius: '16px', alignItems: 'center', justifyContent: 'center', ':hover': { backgroundColor: '#f6f6f6', cursor: 'pointer' } }}><span style={{ marginLeft: '1em' }}>{comment}</span><span style={{ marginLeft: '0.4em' }}>{props.comments ? props.comments.length : null}</span><span style={{ marginLeft: '0.2em' }}>Comments</span></Box>

                </Box>

            </Box>
            <hr style={{ marginTop: '1.4em' }} />
            {showComments ?
                <Box>
                    {props.comments ? props.comments.map(({ fullName, text, profilePic }, userName) => (
                        <Box sx={{ mt: '30px' }} key={userName}>

                            <Box sx={{ display: 'flex', justifyContent: 'right' }}>

                                <Box sx={{ mr: 2 }}>
                                    <Box sx={{ textAlign: 'right', display: 'flex', justifyContent: 'right', fontWeight: 600, ':hover': { cursor: 'pointer', textDecoration: 'underline' } }}>{fullName}</Box>
                                    <Box sx={{ textAlign: 'right', display: 'flex', justifyContent: 'right', backgroundColor: '#f8f8f8', p: 1, fontSize: '15px', borderRadius: '12px' }}>{text}</Box>
                                    <Box sx={{ display: 'flex', fontSize: '13px', fontWeight: 600, justifyContent: 'right' }}><Box>Date</Box><Box sx={{ marginLeft: '2em', ':hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Like</Box><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2 }}>{more}</Box></Box>

                                </Box>
                                {profilePic.length == 1?<ProfilePicHolder width={44} height={44} character={profilePic} />:<ProfilePicHolder src={profilePic} width={44} height={44} />}
                            </Box>
                        </Box>
                    )) : null}

                </Box>
                :
                null
            }



            <Comment profilePic={props.profilePic} character={props.fullName} postId={props.postId} userName={props.userName} fullName={props.fullName} />
        </Card>
    )
}
const styles = {
    post: {
        width: ['100%', '100%', '100%', '100%', '90%', '100%'],
        backgroundColor: 'white',
        borderRadius: '1em',
        p: 3
    },
    userInfo: {
        width: '100%',
        justifyContent: 'left',
        display: 'flex',
        gridTemplateColumns: 'auto auto',
        '&:div': {
            textAlign: 'center'
        }
    },
    fullName: {
        fontWeight: 600,
        fontSize: '17px',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        },
    }
}
export default Post