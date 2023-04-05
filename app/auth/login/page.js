"use client";
import { signIn } from "next-auth/react";
import { Input, Button, Box, Checkbox, Label } from "theme-ui";
import Link from "next/link";
import { useForm } from 'react-hook-form'
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginPage = () => {
    
    const onSubmit = async (data) => {

        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: true,
            callbackUrl: "/feed",
        })
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    return (
        <div
            className={
                "flex justify-center items-center h-screen"
            }

        >
            <Box sx={styles.loginForm}>
                <Box sx={styles.formContainer}>

                    <h1 className="font-bold text-3xl italic">Welcome back</h1>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register("email", {
                            required: true,
                            pattern: /\S+@\S+\.\S+/
                        })} sx={styles.email} variant="primary" placeholder='Email address' type='email' className='placeholder:text-black h-12 '></Input>
                        <br />
                        <Input {...register("password", { required: true, pattern: /^(?=\D*\d)[a-zA-Z0-9]{6,32}$/ })} sx={styles.email} placeholder='Password' type='password' className='placeholder:text-black h-12' ></Input>
                        <br />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Label>
                                <Checkbox sx={styles.checkbox}/>
                                Remember me
                            </Label>
                            <Box className="text-cyan-600 font-semibold opacity-80 "><Link href="/forgot-password">Forgot Password?</Link></Box>
                        </Box>
                        <br />
                        <br />

                        <Button sx={styles.button} className="bg-gradient-to-r from-teal-400 to-cyan-500">Login</Button>


                    </form>

                </Box>

                <br />
                <br />
                <br />
                <hr />
                <Box sx={{ textAlign: 'center' }}>new to Quarter?   <Link href="/signup" style={{ color: '#06b6d4', fontWeight: '700' }}>Sign Up</Link> </Box>

            </Box>
        </div>
    );
};
const styles = {
    loginForm: {
        backgroundColor: 'white',
        height: ['100vh', null, null, '520px'],
        width: ['100vw', null, null, '420px'],
        borderRadius: '16px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        zIndex: 10,
        p: 4,
    },
    email: {
        width: '100%',
        backgroundColor: 'rgb(229, 229, 229)',
        border: 'none',

    },
    checkbox:{
        '&:focus':{
            outline:'none'
        }
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
        fontSize: '18px',
        fontWeight: '700',
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
export default LoginPage;
