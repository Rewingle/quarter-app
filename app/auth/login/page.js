"use client";
import { signIn } from "next-auth/react";
import { useRef,useState } from "react";
import { Input, Button, Box } from "theme-ui";
import Link from "next/link";
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

const LoginPage = () => {
    const userName = useRef("");
    const pass = useRef("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                    <TextField sx={{width:'100%',backgroundColor:'#f2f2f2'}} id="outlined-basic" label="Email" variant="outlined" />
                    <br />
                    <FormControl sx={{ width: '100%', my: 3, backgroundColor: '#f2f2f2' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
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
                    </FormControl>
                    <div><a href="/forgot-password" className="text-sky-400 font-semibold opacity-80">Forgot Password?</a></div>
                    <br />
                    <Button sx={styles.button} className="bg-gradient-to-r from-cyan-500 to-blue-500" onClick={onSubmit}>Login</Button>
                    <br />
                    For testing use only;
                    <br />
                    Email: test@admin.com
                    <br />
                    Password: test1234


                </Box>

                <br />
                <br />
                <br />
                <hr />
                <Box sx={{ textAlign: 'center' }}>new to Quarter?   <Link href="/register/address" style={{ color: 'blue', fontWeight: '600' }}>Sign Up</Link> </Box>
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
