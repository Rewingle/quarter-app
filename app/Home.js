import React from 'react'
import Image from 'next/image'
import { Box, Input } from 'theme-ui';
import Login from './Components/HomeRegister';
function Home() {
    return (

        <div>
            <Box sx={styles.header}></Box>
            <Box sx={styles.imageContainer}>
                <Login/>
                <Image src='https://storage.googleapis.com/lookal/login-back.jpg' fill></Image>
            </Box>
            <Box sx={styles.showcase}>

            </Box>

        </div>

    )
}

const styles = {
    imageContainer: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    header: {
        position: 'absolute',
        zIndex: 20,
        backgroundColor: 'black',
        opacity: '0.8',
        width: '100vw',
        height: '4em',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    showcase:{
        width:'100vw',
        height:'420px',
        backgroundColor:'red'
    }
}

export default Home