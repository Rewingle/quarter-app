'use client'
import React, { useState } from 'react'
import { Box, Button, Container, Input, Flex, Select } from 'theme-ui'
import { signIn } from 'next-auth/react';
import DotLoader from 'react-spinners/DotLoader'
import SelectAddress from './SelectAddress';
import { sign } from 'crypto';
//import { MongoClient } from 'mongodb';

function Login() {


    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [tempUser, setTempUser] = useState([{email: "",password: ""}])


    const handleSubmit = async (e) => {
        setLoading(true)
        if (!email || !email.includes('@') || !password) {
            alert('Invalid details');
            return;
        }
        //POST form values
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        //Await for data for any desirable next steps
        const data = await res.json();
        if (data.userId) {
         /*    setId(data.userId)
            setLoading(false)
            return */
            alert("User Already Exist");
            signIn()
            setLoading(false)
        }
        else{
            setTempUser({email: email, password: password})
            setLoading(false)
        }

    }

    return (
        <Box sx={styles.form}>
            <Box sx={styles.registerForm}>



                {!loading ? !tempUser.email ? <Box sx={styles.formContainer}>
                    <Box sx={{ fontSize: 24 }}>Discover Neighbors</Box>
                    <Box sx={{ fontSize: 24, fontWeight: 600, color: '#2DD4BF' }}>with Quarter</Box>
                    <br />
                    <Input sx={styles.email} placeholder='Email address' type='email' className='placeholder:text-black h-12 ' onChange={(e) => setEmail(e.target.value)}></Input>
                    <br />
                    <Input sx={styles.email} placeholder='Password' type='password' className='placeholder:text-black h-12' onChange={(e) => setPassword(e.target.value)}></Input>
                    <br />
                    <Button sx={styles.button} className="bg-gradient-to-r from-teal-400 to-cyan-500" onClick={() => handleSubmit()}>Continue</Button>
                    <br />
                    <br />
                    <Container sx={{ fontSize: 14, }}>
                        <span>By signing up, you agree to our <a href='/privacy-policy' style={{ color: 'blue' }}>Privacy Policy</a>,
                            <a href='/cookie-policy' style={{ color: 'blue' }}>Cookie Policy</a>,</span>
                        <span> <a href='/member-agreement' style={{ color: 'blue' }}>Member Agreement</a>, and that we may share your personal</span><span> information with our partners to verify your account.</span>
                    </Container>
                    <br />


                </Box>
                    : <SelectAddress tempUser={tempUser}/>
                    : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DotLoader color='#14B8A6' size={30} /></div>}

            </Box>
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
        backgroundColor: 'white',
        borderRadius: ['0px', '0px', '0px', '16px'],
        p: 2,
        marginTop: [null, null, null, 3],
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
    form: {
        zIndex: 5,
        height: ['20em', null, null, '520px']
    },
    registerForm: {
        backgroundColor: 'white',
        height: ['60vh', null, null, '460px'],
        width: ['100vw', null, null, '420px'],
        borderRadius: ['0px', '0px', '0px', '16px'],
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        zIndex: 10,

        p: 4,
        py: [3, 5, 5, 4, 4]
    },


}

export default Login