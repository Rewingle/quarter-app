'use client'
import React, { useState } from 'react'
import { Box, Textarea } from 'theme-ui'
import ProfilePicHolder from '../ProfilePicHolder'
import { useSession } from 'next-auth/react'
import DotLoader from 'react-spinners/DotLoader'

function Comment(props) {

    const send = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-8 h-8 text-teal-500 hover:cursor-pointer">
        <path strokeLinecap="round" strokelinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
    const image = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 opacity-60">
        <path strokeLinecap="round" strokelinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>

    const { data: session } = useSession()
    const fullName = session.user.name.split(',')[1] + ' ' + session.user.name.split(',')[2]
    const character = fullName.substring().substring(0, 1).toUpperCase()
    const userName = session.user.name.split(',')[3]

    const [comment, setComment] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const handleComment = async (postId, currentComment, fullName, userName) => {
        if (currentComment != '') {
            setLoading(true);
            await fetch('/api/postComment', {
                method: 'POST', body: JSON.stringify({
                    postId: postId,
                    userName: userName,
                    fullName: fullName,
                    profilePic: session.user.image,
                    comment: currentComment
                })
            })
            setLoading(false)
        }
        else{
            alert('asd')
        }

    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', height: '66px', width: '100%', alignItems: 'center' }}>
                <Box ><ProfilePicHolder width={42} height={42} character={character} /></Box>
                <Box sx={{ width: '80%' }}>
                    <Box sx={{ position: 'relative' }}>
                        <Box style={styles.inputContainer}>
                            <Textarea sx={styles.input} rows={1} wrap='soft' onChange={(e) => { setComment(e.target.value) }}
                                placeholder='Add a comment' autofillBackgroundColor="aquarmarine">
                            </Textarea>
                        </Box>
                        <Box sx={styles.addImage} >{image}</Box>

                    </Box>
                </Box>
                {!isLoading ? <Box sx={{ marginLeft: '1em' }} onClick={() => { handleComment(props.postId, comment, fullName, userName) }}>
                    {send}
                </Box> : <Box sx={{ marginLeft: '2em' }}><DotLoader color='#14B8A6' size={18} /></Box>}

            </Box>

        </React.Fragment>
    )
}

const styles = {
    addImage: {
        position: 'absolute',
        top: '2',
        right: '0',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    inputContainer: {
        borderRadius: '2em',
        marginLeft: '1em',
        width: '100%',
        backgroundColor: '#f6f6f6',
        color: 'black',
        outline: 'none'
    },
    input: {
        width: ['85%', '85%', '85%', '90%', '90%', '90%'],
        border: 'none',
        outline: 'none',
        height: '2.6em',
        resize: 'none',
        textarea: {
            resize: 'none'
        }
    }
}
export default Comment