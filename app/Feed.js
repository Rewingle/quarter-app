'use client'
import next from "next";
import React from "react";
import { Container, Box, Text, Grid } from "theme-ui";
import { signIn, signOut, useSession } from 'next-auth/react';
import Header from "./Components/Header";
import RightBar from "./Components/RightBar";
import LeftBar from "./Components/LeftBar";
import Post from "./Components/Post/Post";
import PostData from "./Components/Post/PostData";

export default function Feed() {
    const { data: session } = useSession();

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            alert("Unauth")
        },
    })

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <React.Fragment>
            <Header></Header>
            <Box as="section" id="feed" sx={styles.grid}>
                <LeftBar />
                <Box sx={styles.feedBar}>
                    <Box sx={styles.feedBarContainer}>

                        <Container sx={{ justifyContent: 'center', display: 'flex' }}>
                            <ul style={{width:'42em'}}>
                                {PostData.map(({fullname,profilePic,text,image,location,date,likes},index)=>(
                                    <React.Fragment>
                                    <li key={index}><Post fullname={fullname} profilePic={profilePic} text={text} image={image} location={location} date={date} likes={likes}/></li>
                                    <br/>
                                    </React.Fragment>
                                ))}
                            </ul>
                            
                        </Container>
                    </Box>

                </Box>
                <RightBar />
            </Box>
        </React.Fragment>
    )
}


const styles = {
    grid: {
        display: ['flex', 'flex', 'flex', 'flex', 'grid'],
        gridTemplateColumns: '1fr 2fr 1fr'
    },

    feedBar: {
        width: '100%',
        p: 3,

    },
    feedBarContainer: {
        width: '100%',
        height: '100vh'
    },

}