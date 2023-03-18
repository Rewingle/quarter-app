"use client";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { Input, Button, Box} from "theme-ui";
import Link from "next/link";

const LoginPage = () => {
    const userName = useRef("");
    const pass = useRef("");

    const onSubmit = async () => {
        const result = await signIn("credentials", {
            username: userName.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/feed",
        });
    };
    return (
        <div
            className={
                "flex justify-center items-center h-screen"
            }
            
        >
            <Box sx={styles.loginForm}>
                <Box sx={styles.formContainer}>
                    <h1 className="font-bold text-3xl">Welcome back</h1>
                    <br />
                    <Input sx={styles.email} placeholder='Email address' type='email' className='placeholder:text-black h-12 ' onChange={(e) => (userName.current = e.target.value)}></Input>
                    <br />
                    <Input sx={styles.email} placeholder='Password' type='password' className='placeholder:text-black h-12' onChange={(e) => (pass.current = e.target.value)}></Input>
                    <div><a href="/forgot-password" className="text-sky-400 font-semibold opacity-80">Forgot Password?</a></div>
                    <br/>
                    <Button sx={styles.button} className="bg-gradient-to-r from-cyan-500 to-blue-500" onClick={onSubmit}>Login</Button>
                    <br />
                    For testing use only; 
                    <br/>
                    Email: test@admin.com
                    <br/>
                    Password: test1234
             
                    
                </Box>
                
                <br/>
                <br/>
                <br/>
                <hr/>
                <Box sx={{textAlign:'center'}}>new to Quarter?   <Link href="/register/address" style={{color:'blue',fontWeight:'600'}}>Sign Up</Link> </Box>
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
export default LoginPage;
