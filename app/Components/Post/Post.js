"use client"
import React, { useState } from 'react'
import { Box, Card, Container } from 'theme-ui'
import Image from 'next/image'
import Comment from './Comment'
import Link from 'next/link'
import ProfilePicHolder from '../ProfilePicHolder'
import { keyframes } from '@emotion/react'
import ImagePopup from '../ImagePopup'

function Post(props) {
    const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
    const like = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
    </svg>
    const liked = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-teal-500">
        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
    </svg>

    const more = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 opacity-60 hover:cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
    const moreBig = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 opacity-60 hover:cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
    const comment = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>



    const [showComments, setShowComments] = useState(false)
    const [commentsLoading, setCommentsLoading] = useState(false)
    const [comments, setComments] = useState(null)
    const [isLiked, setLiked] = useState(props.isLiked)
    const [likeCount, setLikeCount] = useState(props.likes)
    const isProfilePicExist = props.profilePic.length == 1
    const [newComment, setNewComment] = useState(null)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [hasMoreComments, setHasMoreComments] = useState(false)
    const [commentsBetween, setCommentsBetween] = useState(1)

    const handleShowComments = async () => {
        if (props.commentsCount == 0) {
            return
        }
        // FETCH COMMENTS IF ITS YOUR FIRST TIME CLICKING "COMMENTS" BUTTON. OTHERWISE USE FIRST FETCHED COMMENTS, TO GET NEW COMMENTS YOU HAVE TO REFRESH
        if (!showComments) {

            if (!comments) {
                setShowComments(!showComments)
                setCommentsLoading(true)
                await fetch('/api/getComments', {
                    method: 'POST', body: JSON.stringify({
                        commentsBetween: commentsBetween,
                        postId: props.postId
                    })
                }).then(res => res.json().then(data => { setComments(data.comments); console.log(data); setHasMoreComments(data.hasMore); setCommentsBetween(commentsBetween + 1); setCommentsLoading(false) })).catch((err) => { console.log(err); setCommentsLoading(false) })

            }
            else {
                setShowComments(!showComments)
            }

        }
        else {
            setShowComments(!showComments)
        }



    }
    const getMoreComments = async () => {
        await fetch('/api/getComments', {
            method: 'POST', body: JSON.stringify({
                commentsBetween: commentsBetween,
                postId: props.postId
            })
        }).then(res => res.json().then(data => {
            const newComments = data.comments.concat(comments)
            setComments(newComments);
            console.log(comments);
            setHasMoreComments(data.hasMore);
            //setCommentsBetween(commentsBetween + 1);
            setCommentsLoading(false);
        })).catch((err) => { console.log(err); setCommentsLoading(false) })

    }
    const handleLike = async () => {
        if (isLiked) {
            const res = await fetch('/api/unlikePost', {
                method: 'POST', body: JSON.stringify({
                    postId: props.postId,
                    userId: props.userId
                })
            }).then(() => { setLiked(false); setLikeCount(likeCount - 1); return })
        }
        else {
            const res = await fetch('/api/likePost', {
                method: 'POST', body: JSON.stringify({
                    postId: props.postId,
                    userId: props.userId
                })
            }).then(() => { setLiked(true); setLikeCount(likeCount + 1); return })
        }

    }

    const CommentsSkeleton = () => {
        const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
        return (
            <Box sx={{ display: 'flex', justifyContent: 'right', width: '100%', animation: `${fadeIn} 2s backwards infinite` }}>

                <Box sx={{ mr: 2 }}>
                    <Box sx={{ textAlign: 'right', display: 'flex', justifyContent: 'right', height: '24px' }}><Box sx={{ backgroundColor: '#d4d4d4', width: '12em', borderRadius: '12px' }}></Box></Box>
                    <Box sx={{ textAlign: 'right', display: 'flex', justifyContent: 'right', backgroundColor: '#e4e4e7', p: 1, borderRadius: '12px', width: '22em', height: '30.5px', mt: 1 }}></Box>

                </Box>
                <Box sx={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#d6d3d1' }}></Box>
            </Box>
        )


    }

    return (
        <>
            <ImagePopup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <Box>


                    <Box className={`next-image-wrapper`} sx={{ position: 'relative', height: '32em' }}>

                        <Image src={props.image} fill style={{ objectFit: 'contain' }} />

                    </Box>
                    <Box>{props.location}<br />{props.date}</Box>
                </Box>
            </ImagePopup>
            <Card sx={styles.post} className="drop-shadow-lg">
                <Box sx={{ width: '100%', top: 0, display: 'flex' }}>
                    <Box sx={styles.userInfo}>
                        <div style={{ gridRow: '1/span 2', width: '46px', height: '46px' }}>
                            <ProfilePicHolder width={46} height={46} src={props.profilePic} /> </div>
                        <Box sx={{ marginLeft: '1em' }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Box sx={styles.fullName}><Link href={'/user/' + props.userName}>{props.fullName}</Link></Box>
                                <Box sx={{ float: 'right' }}></Box>
                            </Box>

                            <Box sx={{ fontSize: '16px', fontWeight: 'lighter', display: 'flex', opacity: 0.7 }}><span>{locationIcon}</span><span>{props.location} , {props.date}</span> <span style={{ float: 'right' }}></span></Box>
                        </Box>

                    </Box>
                    <Box sx={{ float: 'right' }}>{moreBig}</Box>
                </Box>


                <Container sx={{ p: 1, mt: 2 }}>{props.text}</Container>

                {props.image ? <Box onClick={() => { setButtonPopup(true) }} sx={{ display: 'flex', mt: 2, justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#f8f8f8', ':hover': { cursor: 'pointer' } }}>

                    <Image src={props.image} height={640} width={420} />
                </Box> : null}

                <Box sx={{ mt: 1 }}>

                    <Box sx={{ display: 'flex', marginBottom: '1em', float: 'right' }}>

                        <Box onClick={() => { handleLike() }} sx={{ display: 'flex', p: 1, borderRadius: '16px', ':hover': { backgroundColor: '#f6f6f6', cursor: 'pointer' } }}><span>{isLiked ? liked : like}</span> {isLiked ? <span style={{ marginLeft: '0.4em', fontWeight: '600' }}>{likeCount}</span> : <span style={{ marginLeft: '0.4em', fontWeight: '600' }}>{likeCount}</span>}</Box>

                        <Box onClick={() => { handleShowComments() }} sx={{ display: 'flex', p: 1, borderRadius: '16px', alignItems: 'center', justifyContent: 'center', ':hover': { backgroundColor: '#f6f6f6', cursor: 'pointer' }, fontWeight: '600' }}><span style={{ marginLeft: '1em' }}>{comment}</span><span style={{ marginLeft: '0.4em' }}>{props.commentsCount > 0 ? props.commentsCount : null}</span><span style={{ marginLeft: '0.2em' }}>Comments</span></Box>

                    </Box>

                </Box>
                <hr style={{ marginTop: '1.4em' }} />

                {showComments ? !commentsLoading ?

                    <Box>
                        {hasMoreComments ? <Box onClick={() => { setCommentsBetween(commentsBetween + 1);getMoreComments() }} sx={{':hover':{textDecoration:'underline',cursor:'pointer',color:'#0284c7'},mt:2,fontWeight:600,display:'flex'}}>More Comments</Box> : null}
                        {comments ? comments.map(({ fullName, text, profilePic, date, userName }, index) => (
                            <Box sx={{ mt: '30px' }} key={index}>

                                <Box sx={{ display: 'flex', justifyContent: 'right' }}>

                                    <Box sx={{ mr: 2 }}>
                                        <Box sx={{ textAlign: 'right', display: 'flex', justifyContent: 'right', fontWeight: 600, ':hover': { cursor: 'pointer', textDecoration: 'underline' } }}><Link href={'/user/' + userName}>{fullName}</Link></Box>
                                        <Box sx={{ textAlign: 'right', display: 'flex', justifyContent: 'right', backgroundColor: '#f8f8f8', p: 1, fontSize: '15px', borderRadius: '12px' }}>{text}</Box>
                                        <Box sx={{ display: 'flex', fontSize: '13px', fontWeight: 600, justifyContent: 'right' }}><Box>{date}</Box><Box sx={{ marginLeft: '2em', ':hover': { cursor: 'pointer', textDecoration: 'underline' } }}>Like</Box><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2 }}>{more}</Box></Box>

                                    </Box>
                                    <ProfilePicHolder src={profilePic} width={44} height={44} />
                                </Box>
                            </Box>
                        )) : null}
                    </Box>
                    : <CommentsSkeleton />
                    : null
                }
                {newComment ? newComment.fullName : null}
                <Comment profilePic={props.profilePic} character={props.fullName} postId={props.postId} userName={props.userName} fullName={props.fullName} newComment={setNewComment} />
            </Card>
        </>
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