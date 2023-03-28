'use client'
import React, { useState } from 'react'
import { Box, Button, Container, Input, Flex, Select } from 'theme-ui'
import { signIn } from 'next-auth/react';
import DotLoader from 'react-spinners/DotLoader'
import SelectAddress from './SelectAddress';
import { sign } from 'crypto';
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
//import { MongoClient } from 'mongodb';

function Login() {
    const danger = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>

    const eye = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>

    const noeye = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>



    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [tempUser, setTempUser] = useState(null)
    const [userValid, setUserValid] = useState(false)


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        setLoading(true);
        await fetch('/api/auth/checkUser', {
            method: 'POST', body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => {
            if (res.status == 422) {
                alert('User exist')
                signIn()
            }
            else {
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
                        <TextField sx={{ width: '100%', backgroundColor: '#f2f2f2' }} id="outlined-basic" label="Email" variant="outlined" helperText="Invalid email" onChange={(e) => setEmail(e.target.value)} />
                        <FormControl sx={{ width: '100%', my: 3, backgroundColor: '#f2f2f2' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput onChange={(e) => setPassword(e.target.value)}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText id="component-error-text">Error</FormHelperText>
                        </FormControl>

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

export default Login