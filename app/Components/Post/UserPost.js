'use client'
import React, { useState } from 'react'
import { Box, Button, Flex, Input, Card, Textarea } from 'theme-ui'
import Image from 'next/image'
import Popup from '../Popup'
import { useSession } from 'next-auth/react'
import ProfilePicHolder from '../ProfilePicHolder'
import DotLoader from 'react-spinners/DotLoader'

function UserPost() {
    const image = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 opacity-60">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
    const add = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    const tag = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
    const event = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
    </svg>
    const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>

    //SET USER INFO
    const { data: session } = useSession()
    const fullName = session.user.name.split(',')[0] + ' ' + session.user.name.split(',')[1]
    const userName = session.user.name.split(',')[2]
    const address = session.user.name.split(',')[5] + ',' + session.user.name.split(',')[4]


    const [text, setText] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [buttonPopup, setButtonPopup] = useState(false)

    //GET CURRENT DATE
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const current = new Date();
    const date = `${current.getDate()} ${monthNames[current.getMonth()]}`;

    const handlePost = async (text) => {
        if (text != '') {
            setLoading(true);
            await fetch('/api/postComment', {
                method: 'POST', body: JSON.stringify({
                    date: date,
                    likes: 0,
                    location: address,
                    profilePic: null,
                    text: text,
                    comment: [],
                    userName: userName,
                    fullName: fullName
                })
            })
            setLoading(false)
        }
        else {
            alert('asd')
        }

    }

    return (
        <Box sx={styles.main}>


            <Flex>

                <Card sx={styles.post} className="drop-shadow-lg">
                    <Flex sx={{ width: '100%', top: 0, height: '3em', justifyContent: 'center', alignItems: 'center' }}>
                        <Box >{!session.user.image ? <ProfilePicHolder height={44} width={44} character={fullName.substring(0, 1).toUpperCase()} />
                            :
                            <Image src={session.user.image} width={44} height={44} sx={{ borderRadius: '50%' }} />}</Box>
                        <Input sx={{ borderRadius: '2em', width: '80%', marginLeft: '2em' }} placeholder='What are you thinking ?' onClick={() => setButtonPopup(true)}></Input>

                    </Flex>
                    <br />
                    <hr />
                </Card>

                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    {!isLoading ?
                        <form>


                            <Box sx={styles.inputContainer}>
                                <Textarea sx={styles.input} rows={1} wrap='soft' onChange={(e) => { setText(e.target.value) }}
                                    placeholder='What are you thinking?' autofillBackgroundColor="aquarmarine">
                                </Textarea>
                            </Box>

                            <Box sx={styles.buttonsContainer}>
                                <Box sx={{ display: 'flex', alignItems: 'center',width:['10em','10em','10em',null,null], opacity: 0.7, backgroundColor: '#3B8C66', color: 'white', px: 2, borderRadius: '1em', ':hover': { opacity: 1, cursor: 'pointer' } }}><Box sx={{ p: 1 }}>{image}</Box><Box sx={{ ml: 1, fontWeight: '600' }}>ADD PHOTO </Box></Box>
                                <Box sx={{ ml: [0, 0, 0, 3, 3],mt:[3,3,3,0,0],width:['8em','8em','8em',null,null], display: 'flex', alignItems: 'center', opacity: 0.7, backgroundColor: '#F24405', color: 'white', px: 2, borderRadius: '1em', ':hover': { opacity: 1, cursor: 'pointer' } }}><Box sx={{ p: 1 }}>{tag}</Box><Box sx={{ ml: 1, fontWeight: '600' }}>ADD TAG </Box></Box>
                                <Box sx={{ ml: [0, 0, 0, 3, 3],mt:[3,3,3,0,0],width:['12em','12em','12em',null,null], display: 'flex', alignItems: 'center', opacity: 0.7, backgroundColor: '#7A577A', color: 'white', px: 2, borderRadius: '1em', ':hover': { opacity: 1, cursor: 'pointer' } }}><Box sx={{ p: 1 }}>{event}</Box><Box sx={{ ml: 1, fontWeight: '600' }}>ORGANISE EVENT </Box></Box>

                            </Box>
                            <br />
                            <Box sx={{fontSize:'14px',color:'#06b6d4',fontWeight:'600'}}>Your location:</Box>
                            <Box sx={{ display: 'flex',width:'100%' }}>
                                
                                <Box sx={{ display: 'flex',width:'80%',fontSize:'14px',alignItems:'center' }}>{locationIcon}{address}</Box>
                                <Box sx={{width:'20%'}}><Button sx={{ fontWeight: '600',float:'right' }} type='submit' className="bg-gradient-to-r from-teal-400 to-cyan-500" onClick={() => handlePost(text)}>POST</Button></Box>
                            </Box>
                        </form> : <DotLoader color='#14B8A6' size={32} />}
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
    input: {
        border: 'none',
        outline: 'none',
        resize: 'none',
        height: '10em',
        '&::placeholder': {
            textAlign: 'center',
            fontSize: '24px'
        }
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
        width: '100%',
        backgroundColor: '#f2f2f2',
        color: 'black',
        outline: 'none'
    },
    buttonsContainer: {
        display: ['block', 'block', 'block', 'flex', 'flex'],
        mt: 3,
    }


}

export default UserPost