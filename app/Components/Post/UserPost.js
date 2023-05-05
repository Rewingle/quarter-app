'use client'
import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, Input, Card, Textarea } from 'theme-ui'
import Image from 'next/image'
import Popup from '../Popup'
import { useSession } from 'next-auth/react'
import ProfilePicHolder from '../ProfilePicHolder'
import DotLoader from 'react-spinners/DotLoader'
import { animated, useSpring } from '@react-spring/web'
import AWSS3UploadAsh from 'aws-s3-upload-ash'

function UserPost() {
    const image = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 opacity-60">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
    const bigImage = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 opacity-70 text-green-800">
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
    const remove = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    const close = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-50 cursor-pointer">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>



    //SET USER INFO
    const { data: session } = useSession()
    const id = session.user.name.split(',')[0]
    const fullName = session.user.name.split(',')[1] + ' ' + session.user.name.split(',')[2]
    const userName = session.user.name.split(',')[3]
    const address = session.user.name.split(',')[6] + ' ' + session.user.name.split(',')[5]
    const profilePic = session.user.image


    const [text, setText] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [isTagSelected, setTagSelected] = useState(false)
    const [isAddPhotoSelected, setAddPhotoSelected] = useState(false)


    //REACT SPRING
    const tagSlide = useSpring({
        height: isTagSelected ? 100 : 0,
    })
    const photoSlide = useSpring({
        height: isAddPhotoSelected ? 100 : 0,
    })
    const displaySlide = useSpring({
        display: isAddPhotoSelected ? 'block' : 'none'
    })
    const opacitySlide = useSpring({
        opacity: isAddPhotoSelected ? 1 : 0.4
    })

    //TAGS
    const tags = [
        { name: 'Help' },
        { name: 'Advice' },
        { name: 'Missing' },
        { name: 'Sale' },
        { name: 'Meeting' },
        { name: 'Education' },
        { name: 'Childcare' },
        { name: 'Government' },
        { name: 'Nature' },
        { name: 'Greeting' },
        { name: 'Question' }
    ]

    const [selectedTags, setSelectedTags] = useState([])

    //GET CURRENT DATE
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const current = new Date();
    const date = `${current.getDate()} ${monthNames[current.getMonth()]}`;

    const handlePost = async (text) => {
        setLoading(true);

        if (text != null) {

            if (file) {


                const config = {
                    bucketName: 'quarter-app',
                    dirName: 'postPics',
                    region: 'eu-central-1',
                    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
                    s3Url: 'https://quarter-app.s3.amazonaws.com/'
                }
                const S3CustomClient = new AWSS3UploadAsh(config);
                const upload = await S3CustomClient.uploadFile(file, file.type, undefined, file.name, "public-read")

                await fetch('/api/addPost', {
                    method: 'POST', body: JSON.stringify({
                        postedBy: id,
                        date: date,
                        likes: [],
                        location: address,
                        profilePic: profilePic,
                        text: text,
                        tags: selectedTags,
                        comments: [],
                        image: upload.location? upload.location : null,
                        userName: userName,
                        fullName: fullName,

                    })
                })
                setLoading(false)
                setButtonPopup(false)
                setFileDataURL(null)
            }
            else {
                await fetch('/api/addPost', {
                    method: 'POST', body: JSON.stringify({
                        postedBy: id,
                        date: date,
                        likes: [],
                        location: address,
                        profilePic: profilePic,
                        text: text,
                        tags: selectedTags,
                        comments: [],
                        image: null,
                        userName: userName,
                        fullName: fullName,

                    })
                })
                setLoading(false)
                setButtonPopup(false)

            }

        }
        else {
            alert('Invalid post')
        }
    }
    const handleRemoveTag = (name) => {

        const newTags = selectedTags.filter(item => item !== name)
        setSelectedTags(newTags)
    }


    const handleAddTag = (name) => {
        if (selectedTags.length == 3) {
            return
        }
        setSelectedTags(previous => [...previous, name])
    }
    //ADD IMAGE
    const [file, setFile] = useState(null)
    const [fileDataURL, setFileDataURL] = useState(null);

    const imageMimeType = /image\/(png|jpg|jpeg)/i;

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
    }

    return (
        <Box sx={styles.main}>


            <Flex>

                <Card sx={styles.post} className="drop-shadow-lg">
                    <Flex sx={{ width: '100%', top: 0, height: '3em', justifyContent: 'center', alignItems: 'center' }}>
                        <Box ><ProfilePicHolder width={48} height={48} src={profilePic}/></Box>
                        <Input sx={{ borderRadius: '2em', width: '80%', marginLeft: '2em' }} placeholder='What are you thinking ?' onClick={() => setButtonPopup(true)}></Input>

                    </Flex>
                    <br />
                    <hr />
                </Card>

                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    {!isLoading ?
                        <form>
                            <Box sx={{ display: 'flex', mb: '0.4em' }}>{selectedTags[0] ? <Box sx={{ opacity: '0.6', fontSize: '15px', fontWeight: '600' }}>Tags;</Box> : null}{selectedTags.map(name => <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', ':hover': { cursor: 'pointer' }, fontWeight: '600', opacity: 0.6 }} onClick={() => { handleRemoveTag(name) }}>{remove}{name}</Box>)}</Box>


                            <Box sx={styles.inputContainer}>
                                <Textarea sx={styles.input} rows={1} wrap='soft' onChange={(e) => { setText(e.target.value) }}
                                    placeholder='What are you thinking?' autofillBackgroundColor="aquarmarine">
                                </Textarea>
                            </Box>
                            <animated.div
                                style={{
                                    width: '100%',
                                    marginTop: '0.5em',
                                    borderRadius: '1em',
                                    overflow: 'hidden',
                                    height: tagSlide.height,
                                    borderRadius: 8,
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap'
                                }} >
                                    <Box sx={{ color: '#F24405', p: 2, mr: 2 }}>{tag}</Box>
                                    {tags.map(tag => (
                                        <Box name={tag.name} onClick={() => {
                                            selectedTags.includes(tag.name) ?
                                                handleRemoveTag
                                                :
                                                handleAddTag(tag.name)

                                        }} sx={{

                                            margin: '0 1em 1em 0',
                                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            p: 2,
                                            opacity: 0.7,
                                            fontWeight: '600',
                                            borderRadius: '1em',
                                            ':hover': { opacity: 1, cursor: 'pointer' }
                                        }}><Box sx={{ fontWeight: '600' }}>{tag.name}</Box></Box>
                                    ))}
                                </Box>
                            </animated.div>
                            <animated.div
                                style={{
                                    width: '100%',
                                    marginTop: '0.5em',
                                    borderRadius: '1em',
                                    overflow: 'hidden',

                                    height: photoSlide.height,
                                    display: displaySlide.display,
                                    opacity: opacitySlide.opacity,
                                    borderRadius: 8
                                }}
                            >
                                {fileDataURL ?
                                    <p className="img-preview-wrapper">

                                        <Box>
                                            <img src={fileDataURL} alt="preview" style={{ width: '5em', height: '5em', borderRadius: '1em', display: 'flex', position: 'absolute', zIndex: 1, ':hover': { cursor: 'pointer' } }} />
                                        </Box>

                                    </p> : <Box sx={{ position: 'relative' }}>
                                        <Box sx={{ border: '4px solid green', position: 'absolute', zIndex: 0, borderStyle: 'dotted', borderRadius: '1em', height: '5em', width: '100%', opacity: '0.6', display: 'flex', justifyContent: 'center', alignItems: 'center', ':hover': { cursor: 'pointer' } }}>ADD PHOTO</Box>
                                        <Input sx={{ position: 'relative', opacity: 0, zIndex: 2, height: '5em', ':hover': { cursor: 'pointer' } }}
                                            type="file"
                                            id='image'
                                            accept='.png, .jpg, .jpeg'
                                            onChange={handleFile}
                                            placeholder='ADD IMAGEEE'
                                        />
                                    </Box>}


                            </animated.div>

                            <Box sx={styles.buttonsContainer}>
                                {fileDataURL ? <Box onClick={() => { setFileDataURL(null) }} sx={{ display: 'flex', alignItems: 'center', width: ['10em', '10em', '10em', null, null], opacity: 0.7, backgroundColor: 'red', color: 'white', px: 2, borderRadius: '1em', ':hover': { opacity: 1, cursor: 'pointer' } }}><Box sx={{ p: 1 }}>{close}</Box><Box sx={{ ml: 1, fontWeight: '600', fontSize: '14px' }}>REMOVE PHOTO </Box></Box> : <Box onClick={() => { if (fileDataURL) { return }; setAddPhotoSelected(!isAddPhotoSelected) }} sx={{ display: 'flex', alignItems: 'center', width: ['10em', '10em', '10em', null, null], opacity: 0.7, backgroundColor: '#3B8C66', color: 'white', px: 2, borderRadius: '1em', ':hover': { opacity: 1, cursor: 'pointer' } }}><Box sx={{ p: 1 }}>{image}</Box><Box sx={{ ml: 1, fontWeight: '600' }}>ADD PHOTO </Box></Box>}
                                <Box onClick={() => { setTagSelected(!isTagSelected) }} sx={{ ml: [0, 0, 0, 3, 3], mt: [3, 3, 3, 0, 0], width: ['8em', '8em', '8em', null, null], display: 'flex', alignItems: 'center', opacity: 0.7, backgroundColor: '#F24405', color: 'white', px: 2, borderRadius: '1em', ':hover': { opacity: 1, cursor: 'pointer' } }}><Box sx={{ p: 1 }}>{tag}</Box><Box sx={{ ml: 1, fontWeight: '600' }}>ADD TAG </Box></Box>
                                <Box sx={{ ml: [0, 0, 0, 3, 3], mt: [3, 3, 3, 0, 0], width: ['12em', '12em', '12em', null, null], display: 'flex', alignItems: 'center', opacity: 0.7, backgroundColor: '#7A577A', color: 'white', px: 2, borderRadius: '1em', ':hover': { opacity: 1, cursor: 'pointer' } }}><Box sx={{ p: 1 }}>{event}</Box><Box sx={{ ml: 1, fontWeight: '600' }}>ORGANISE EVENT </Box></Box>

                            </Box>

                            <br />


                            <Box sx={{ display: 'flex', width: '100%' }}>

                                <Box sx={{ display: 'flex', width: '80%', fontSize: '14px', alignItems: 'center' }}>{locationIcon}{address}</Box>
                                <Box sx={{ width: '20%' }}><Button sx={{ fontWeight: '600', float: 'right', width: '6em' }} type='submit' className="bg-gradient-to-r from-teal-400 to-cyan-500" onClick={(e) => { handlePost(text) }}>POST</Button></Box>
                            </Box>
                        </form> : <DotLoader color='#14B8A6' size={32} />}


                </Popup>
            </Flex>



        </Box >
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
        zIndex: 200
    },
    tag: {

    }


}


export default UserPost