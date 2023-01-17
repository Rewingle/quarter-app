'use client'

import React, { useEffect, useState } from 'react'
import { useRef } from "react";
import { Box, Button, Container, Input, Flex } from 'theme-ui'
import { signIn } from 'next-auth/react';

function Login() {

    const email = useRef("");
    const pass = useRef("");

    /* const handleSubmit = () => {

        const data = { email: email, password: pass }
        axios.post('/api/auth/register', data).then(
            (res) => { console.log(res.message);console.log('asdasda') }
        ).catch((e) => { console.log(e.message) })
    }
 */
    return (
        <Box sx={styles.registerForm}>
            <Box sx={{ fontSize: 24 }}>Discover Neighbors</Box>
            <Box sx={{ fontSize: 24, fontWeight: 600, color: '#2DD4BF' }}>with Quarter</Box>

            <form>
                <Box sx={styles.formContainer}>
                    <br />
                    <Input sx={styles.email} placeholder='Email address' type='email' className='placeholder:text-black h-12 ' onChange={(e) => (email.current = e.target.value)}></Input>
                    <br />
                    <Input sx={styles.email} placeholder='Password' type='password' className='placeholder:text-black h-12' onChange={(e) => (pass.current = e.target.value)}></Input>
                    <br />
                    <Button sx={styles.button} className="bg-gradient-to-r from-teal-400 to-cyan-500">Continue</Button>
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

            </form>
            <Flex sx={styles.login}>
                Have an account? <Button sx={{ marginLeft: '0.6em', backgroundColor: '#2DD4BF', color: 'white' }} onClick={() => signIn()} className="bg-gradient-to-r from-teal-400 to-cyan-500">Login</Button>
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '600',
        fontSize: 18,
        '& span': {

            '&:hover': {
                curser: 'pointer',

            }
        }
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
        borderRadius: ['0px', '0px', '0px', '16px'],
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        zIndex: 10,

        p: 4,
        py: [5, 5, 5, 4, 4]
    },


}

export default Login