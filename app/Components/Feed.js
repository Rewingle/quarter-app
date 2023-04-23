'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Post from './Post/Post'
import { Card, Box } from 'theme-ui'
import DotLoader from 'react-spinners/DotLoader'

function Feed() {
    const more = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 opacity-40 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
    console.log('FEEDERO')
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)

    const { data: session,status } = useSession()
    if (status === "loading") {

        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><DotLoader color='#14B8A6' size={30} /></div>
    }
 /*    useEffect(() => {
        const getPosts = async () => {
            const userId = session.user.name.split(',')[0]
            const neighborhood = session.user.name.split(',')[6]
            const district = session.user.name.split(',')[5]

            console.log(neighborhood + ',' + district)
            console.log(userId)

            await fetch('/api/getFeed', {
                method: 'POST', body: JSON.stringify({
                    location: neighborhood + ',' + district,
                    userId: userId
                })
            }).then(res => res.json().then(data => { console.log(data); setPosts(data); setLoading(false) })).catch((err) => console.log(err))
        }
        getPosts()
    }, [])
 */
    const SkeletonLoading = () => {
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
                <Box sx={{ width: '100%', top: 0, display: 'flex' }}>
                    <Box sx={{ width: '100%', justifyContent: 'left', display: 'flex', gridTemplateColumns: 'auto auto', '&:div': { textAlign: 'center' } }}>
                        <div style={{ gridRow: '1/span 2', width: '46px', height: '46px', backgroundColor: 'lightgray', borderRadius: '50%' }}></div>
                        <Box sx={{ marginLeft: '1em' }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                                <Box sx={{ width: '6em', borderRadius: '1em', backgroundColor: 'lightgray', height: '22px' }}></Box>
                                <Box sx={{ float: 'right' }}></Box>
                            </Box>

                            <Box sx={{ display: 'flex', height: '16px', width: '16em', backgroundColor: 'lightgray', borderRadius: '1em', mt: 1 }}></Box>
                        </Box>

                    </Box>
                    <Box sx={{ float: 'right' }}>{more}</Box>
                </Box>
                <Box sx={{ backgroundColor: 'lightgray', width: '100%', height: '6em', borderRadius: '1em', mt: 1 }}>
                </Box>
            </Card>
        )
    }

    return (

        <>
          <div>asdsad</div>

        </>



    )
}

export default Feed