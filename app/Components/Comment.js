import React from 'react'
import { Box, Input } from 'theme-ui'
import Image from 'next/image'
function Comment(props) {
    const send = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-8 h-8 text-teal-500 hover:cursor-pointer">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>

    return (
        <Box sx={{ display: 'flex', height: '66px', alignItems: 'center',borderTop:'1px solid lightgray' }}>
            <Box ><Image src='https://storage.googleapis.com/lookal/mainuser.jpg' width='52' height='52' style={{ borderRadius: '50%' }} /></Box>
            <Box sx={{ width: '80%',display:'flex'}}>
                <Input 
                style={{ borderRadius: '2em', marginLeft: '1em', border: 'none', backgroundColor: 'gainsboro', color: 'black' }} placeholder='Add a comment' autofillBackgroundColor="aquarmarine">
                </Input>
            </Box>
            <Box>
                {send}
            </Box>
        </Box>
    )
}

export default Comment