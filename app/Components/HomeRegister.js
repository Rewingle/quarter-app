'use client'

import React from 'react'
import { useRef } from "react";
import { Box, Button, Container, Input, Flex } from 'theme-ui'
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react';

function Login() {

    const userName = useRef("");
    const pass = useRef("");

    const onSubmit = async () => {
        const result = await signIn("credentials", {
            username: userName.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/",
        });
    };
    return (
        <Box sx={styles.registerForm}>
            <Box sx={{ fontSize: 24 }}>Discover Neighbors</Box>
            <Box sx={{ fontSize: 24, fontWeight: 600, color: 'blue' }}>with Quarter</Box>


            <Box sx={styles.formContainer}>
                <br />
                <Input sx={styles.email} placeholder='Email address' type='email' className='placeholder:text-black h-12 ' onChange={(e)=>(userName.current = e.target.value)}></Input>
                <br />
                <Input sx={styles.email} placeholder='Password' type='password' className='placeholder:text-black h-12' onChange={(e)=>(pass.current = e.target.value)}></Input>
                <br />
                <Button sx={styles.button} className="bg-gradient-to-r from-cyan-500 to-blue-500" onClick={onSubmit}>Continue</Button>
                <br />
                <br />
                <Container sx={{ fontSize: 14, }}>
                    <span>By signing up, you agree to our <a href='/privacy-policy' style={{ color: 'blue' }}>Privacy Policy</a>,
                        <a href='/cookie-policy' style={{ color: 'blue' }}>Cookie Policy</a>,</span>
                    <span> <a href='/member-agreement' style={{ color: 'blue' }}>Member Agreement</a>, and that we may share your personal</span><span> information with our partners to verify your account.</span>
                </Container>
            </Box>
            <br />
            <br />
            <Flex sx={styles.login}>
                Have an account? <span style={{ color: 'blue' }} onClick={()=>signIn()}>Login</span>
            </Flex>


        </Box>
    )
}
const styles = {

    email: {
        width: '100%',
        backgroundColor: 'rgb(229, 229, 229)',
        border: 'none',
        color: 'black',

    },
    login: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '600',
        fontSize: 18
    },
    button: {
        width: '100%',
        height: '40px',
        color: 'white',
        fontSize: '16',
    },
    registerForm: {
        backgroundColor: 'white',
        height: ['100vh', null, null, '520px'],
        width: ['100vw', null, null, '420px'],
        borderRadius: '16px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        zIndex: 10,

        p: 4
    },


}

export default Login