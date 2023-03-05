import React from 'react'
import { Box, Card, Container } from 'theme-ui'
import Image from 'next/image'
import Comment from './Comment'

function Post(props) {
    const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
    const like = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
    </svg>

    return (
        <Card sx={styles.post} className="drop-shadow-lg">
            <Box sx={{ width: '100%', top: 0 }}>
                <Box sx={styles.userInfo}>
                    <div style={{ gridRow: '1/span 2', width: '46px', height: '46px' }}>
                        <Image src={props.profilePic} width='46' height='46' style={{ borderRadius: '50%' }} /></div>
                    <div style={{ marginLeft: '1em' }}>
                        <div style={{ fontWeight: '600', fontSize: '16px' }}>{props.fullname}</div>
                        <div style={{ fontSize: '16px', fontWeight: 'lighter', display: 'flex', opacity: 0.7 }}><span>{locationIcon}</span><span>{props.location} , {props.date}</span></div>
                    </div>

                </Box>
            </Box>


            <Container sx={{ p: 2 }}>{props.text}</Container>
            {props.image ? <Box>
                <img src={props.image}></img>
            </Box> : null}
            <br />
            <Box sx={{ display: 'flex', marginBottom: '1em' }}><span>{like}</span> <span>{props.likes}</span></Box>

            <Comment profilePic={props.profilePic} />
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
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        '&:div': {
            textAlign: 'center'
        }
    }
}
export default Post