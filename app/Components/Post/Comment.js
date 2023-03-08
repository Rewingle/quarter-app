'use client'
import React from 'react'
import { Box, Input, Flex, Container } from 'theme-ui'
import Image from 'next/image'
function Comment(props) {

    const send = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-8 h-8 text-teal-500 hover:cursor-pointer">
        <path strokeLinecap="round" strokelinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
    const image = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 opacity-60">
        <path strokeLinecap="round" strokelinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', height: '66px', alignItems: 'center', borderTop: '1px solid lightgray' }}>
                <Box ><Image src='https://quarter-app.s3.eu-central-1.amazonaws.com/dummyperson.jpg' width='42' height='42' style={{ borderRadius: '50%' }} /></Box>
                <Box sx={{ width: '80%'}}>
                    <Box sx={{position: 'relative' }}>
                        <Box sx={styles.addImage} onClick={()=>{alert('addImage')}}>{image}</Box>
                        <Box style={styles.inputContainer}>
                            <Input style={styles.input}
                                placeholder='Add a comment' autofillBackgroundColor="aquarmarine">
                            </Input>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ marginLeft: '1em' }}>
                    {send}
                </Box>

            </Box>

        </React.Fragment>
    )
}

const styles = {
    addImage:{
        position: 'absolute', 
        top: '2', 
        right: '0',
        '&:hover':{
            cursor:'pointer'
        }
    },
    inputContainer:{
        borderRadius: '2em', 
        marginLeft: '1em',  
        width: '100%', 
        backgroundColor: '#f6f6f6', 
        color: 'black', 
        outline: 'none'
    },
    input:{
        width:['85%','85%','85%','90%','90%','90%'],
        border: 'none',
        outline: 'none'
    }
}
export default Comment