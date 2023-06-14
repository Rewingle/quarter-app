'use client'
import React, { useState } from 'react'
import { Box, Button, Container, Input, Flex } from 'theme-ui'
import { signIn } from 'next-auth/react';
import DotLoader from 'react-spinners/DotLoader'
import SelectAddress from './SelectAddress';
import { useForm } from 'react-hook-form'
//import { MongoClient } from 'mongodb';

function HomeRegister() {
    const danger = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>


    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [tempUser, setTempUser] = useState(null)
    const [userValid, setUserValid] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    
    const onSubmit = async (data) => {
        setLoading(true);
        await fetch('/api/auth/checkUser', {
            method: 'POST', body: JSON.stringify({
                email: data.email,
           
            })
        }).then(res => {
            if (res.status == 422) {
                alert('User exist')
                signIn()
            }
            else {
                console.log(data)
                setTempUser(data);

            }
        })

        setLoading(false);
    }


    return (
        <Box sx={styles.form}>
            <Box sx={styles.registerForm}>

                {!loading ? !tempUser ? <Box sx={styles.formContainer}>
                    <Box sx={{ fontSize: 24 }}>Discover Neighbors</Box>
                    <Box sx={{ fontSize: 24, fontWeight: 600, color: '#2DD4BF' }}>with Quarter</Box>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register("email", {
                            required: true,
                            pattern: /\S+@\S+\.\S+/
                        })} sx={styles.email} name='email' placeholder='Email address' className='placeholder:text-black h-12 '></Input>

                        <br />

                        <Input {...register("password", { required: true, pattern: /^(?=\D*\d)[a-zA-Z0-9]{6,32}$/ })} sx={styles.email} name='password' placeholder='Password' type='password' className='placeholder:text-black h-12' ></Input>

                        <br />


                        <Button sx={styles.button} type='submit' className="bg-gradient-to-r from-teal-400 to-cyan-500">Continue</Button>
                        <Box sx={{ height: '2.2em', py: 2 }}>
                            {errors?.email?.type === "required" && (
                                <p style={{ fontSize: '14px', color: 'red' }}><div style={{ display: 'flex' }}><div style={{ display: 'flex' }}>{danger} Email is required</div></div></p>
                            )}
                            {errors?.email?.type === "pattern" && (
                                <p style={{ fontSize: '14px', color: 'red' }}><div style={{ display: 'flex' }}>{danger} Invalid email</div></p>
                            )}
                            {errors?.password?.type === "required" && (
                                <p style={{ fontSize: '14px', color: 'red' }}><div style={{ display: 'flex' }}>{danger} Password is required.</div></p>
                            )}
                            {errors?.password?.type === "pattern" && (
                                <p style={{ fontSize: '12px', color: 'red' }}><div style={{ display: 'flex' }}>{danger} Password must be more than 6 characters, including numbers.</div> </p>
                            )}
                        </Box>
                        <br />
                    </form>


                    <Container sx={{ fontSize: 14, }}>
                        <span>By signing up, you agree to our <a href='/privacy-policy' style={{ color: 'blue' }}>Privacy Policy</a>,
                            <a href='/cookie-policy' style={{ color: 'blue' }}>Cookie Policy</a>,</span>
                        <span> <a href='/member-agreement' style={{ color: 'blue' }}>Member Agreement</a>, and that we may share your personal</span><span> information with our partners to verify your account.</span>
                    </Container>
                    <br />


                </Box>
                    : <SelectAddress tempUser={tempUser} />
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
        height: ['60vh', null, null, '480px'],
        width: ['100vw', null, null, '420px'],
        borderRadius: ['0px', '0px', '0px', '16px'],
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        zIndex: 10,

        p: 4,
        py: [3, 5, 5, 4, 4]
    },


}

export default HomeRegister