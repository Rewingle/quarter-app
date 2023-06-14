'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Post from './Post/Post'
import { Card, Box } from 'theme-ui'
import DotLoader from 'react-spinners/DotLoader'
import { keyframes } from '@emotion/react'
import InfiniteScroll from "react-infinite-scroll-component"

function Feed() {
    const more = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 opacity-40 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
    const unhappy = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>

    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [fetchBetween, setFetchBetween] = useState({ from: 0, to: 10 })
    const [hasMore, setHasMore] = useState(true)

    const { data: session, status } = useSession()
    if (status === "loading") {

        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><DotLoader color='#14B8A6' size={30} /></div>
    }
    const userId = session.user.name.split(',')[0]
    const neighborhood = session.user.name.split(',')[6]
    const district = session.user.name.split(',')[5]
    useEffect(() => {
        const getPosts = async () => {

            await fetch('/api/getFeed', {
                method: 'POST', body: JSON.stringify({
                    location: neighborhood + ' ' + district,
                    userId: userId,
                    postsBetween: fetchBetween
                })
            }).then(res => res.json().then(data => {
                if (!data.hasMore) {
                    setHasMore(false)
                }
                setPosts(data.posts);
                setFetchBetween({ from: fetchBetween.from + 10, to: fetchBetween.to + 10 });
                setLoading(false)
            })).catch((err) => console.log(err))
        }
        getPosts()
    }, [])

    const fetchMorePosts = async () => {
        await fetch('/api/getFeed', {
            method: 'POST', body: JSON.stringify({
                location: neighborhood + ' ' + district,
                userId: userId,
                postsBetween: fetchBetween
            })
        }).then(res => res.json().then(data => {
            if (!data.isLastPost) {
                setHasMore(false)
            }
            const newPosts = posts.concat(data.posts);
            setPosts(newPosts);
            setFetchBetween({ from: fetchBetween.from + 10, to: fetchBetween.to + 10 });
        })).catch((err) => console.log(err))
    }

    const SkeletonLoading = () => {
        const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
        const styles = {
            skeleton: {

                width: ['100%', '100%', '100%', '100%', '90%', '100%'],
                backgroundColor: 'white',
                borderRadius: '1em',
                p: 3,
                height: '12em'

            }
        }
        return (

            <Card sx={styles.skeleton} className="drop-shadow-lg">
                <Box sx={{ width: '100%', top: 0, display: 'flex', animation: `${fadeIn} 2s backwards infinite` }}>

                    <Box sx={{ width: '100%', justifyContent: 'left', display: 'flex', gridTemplateColumns: 'auto auto', '&:div': { textAlign: 'center' } }}>
                        <div style={{ gridRow: '1/span 2', width: '46px', height: '46px', backgroundColor: 'lightgray', borderRadius: '50%' }}></div>
                        <Box sx={{ marginLeft: '1em' }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Box sx={{ width: '10em', borderRadius: '1em', backgroundColor: '#d2d2d2', height: '22px' }}></Box>
                                <Box sx={{ float: 'right' }}></Box>
                            </Box>

                            <Box sx={{ display: 'flex', height: '16px', width: '16em', backgroundColor: '#e4e4e7', borderRadius: '1em', mt: 1 }}></Box>
                        </Box>

                    </Box>
                    <Box sx={{ float: 'right' }}>{more}</Box>
                </Box>
                <Box sx={{ backgroundColor: 'gainsboro', width: '100%', height: '6em', borderRadius: '1em', mt: 1, animation: `${fadeIn} 2s backwards infinite` }}>
                </Box>
            </Card>
        )
    }

    return (

        <>

            {!loading ? posts.length > 0 ?
                <InfiniteScroll style={{ overflow: 'hidden' }} dataLength={posts.length}
                    next={fetchMorePosts}
                    hasMore={hasMore}
                    loader={<DotLoader color='#14B8A6' size={30}
                        endMessage={
                            <div>There are no other posts in your neighborhood.</div>
                        } />}>
                    {posts.map(({ _id, fullName, profilePic, text, image, commentsCount, location, date, likes, isLiked, userName }, index) => (
                        <React.Fragment>
                            <li style={{ listStyle: 'none' }} key={index}><Post userId={userId} postId={_id} fullName={fullName} profilePic={profilePic} text={text} commentsCount={commentsCount} image={image} location={location} date={date} likes={likes} isLiked={isLiked} userName={userName} /></li>
                            <br />
                        </React.Fragment>
                    ))}
                </InfiniteScroll>
                : <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}><Box sx={{ display: 'flex', fontSize: '18px', mt: 4 }}>There are no posts in your neighborhood {unhappy} </Box></Box> : <SkeletonLoading />}

        </>



    )
}

export default Feed