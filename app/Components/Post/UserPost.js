import React, { useState } from 'react'
import { Box, Button, Flex, Input, Card } from 'theme-ui'
import Image from 'next/image'
import Popup from '../Popup'
function UserPost(props) {
    const image = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 opacity-60">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
    const add = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    const [buttonPopup, setButtonPopup] = useState(false)


    return (
        <Box sx={styles.main}>


            <Flex>

                <Card sx={styles.post} className="drop-shadow-lg">
                    <Flex sx={{ width: '100%', top: 0, height: '3em',justifyContent:'center',alignItems:'center' }}>
                        <Box ><Image src='https://quarter-app.s3.eu-central-1.amazonaws.com/dummyperson.jpg' width='52' height='52' style={{ borderRadius: '50%' }} /></Box>
                        <Input sx={{borderRadius:'2em',width:'80%',marginLeft:'2em'}} placeholder='What are you thinking ?' onClick={()=>setButtonPopup(true)}></Input>
                        
                    </Flex>
                    <br/>
                    <hr/>
                </Card>

                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <Input style={styles.input} placeholder='What are you thinking?'></Input>
                    <div onClick={() => alert('add location')}>
                        <p>Add a location</p>
                    </div>

                    <Button>POST</Button>
                </Popup>
            </Flex>



        </Box>
    )
}

const styles = {
    main: {
        borderRadius: '1em',
        height: '5em',
        marginBottom: '3em',
        marginTop: '2em',
        
    },
    post: {
        width: ['100%', '100%', '100%', '100%', '90%', '100%'],
        backgroundColor: 'white',
        borderRadius: '1em',
        p: 3
    },
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
        backgroundColor: 'lightgray'
    }

}

export default UserPost