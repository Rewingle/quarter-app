import React from "react";
import { Container, Box, Text, Grid } from "theme-ui";
import { signIn, signOut, useSession } from 'next-auth/react';
import Post from "../../Components/Post/Post";
import UserPost from "../../Components/Post/UserPost";
import PostData from "../../Components/Post/PostData";
//import { connectToDatabase } from '../../../lib/mongo/index.js'

/* async function getPosts() {
 
  const { db } = await connectToDatabase();
  const data = await db.collection("users").find({}).limit(10).toArray();
  const users = JSON.parse(JSON.stringify(data));
  console.log(users)
  const filtered = users.map(user => {
    const likes = JSON.parse(JSON.stringify(user.likes));
    return {
      _id: user._id,
      fullname: user.fullname,
      date: user.date,
      location: user.location,
      profilePic: user.profilePic,
      text: user.text,
      likes: user.likes,
    }
  });
  
  return filtered
}
 */

export default function Feed() {

    //let posts = getPosts()

    return (
        <React.Fragment>

            <Box sx={styles.feedBar}>
                
                <Box sx={styles.feedBarContainer}>

                    <Container sx={{ justifyContent: 'center', display: 'flex' }}>
                        <ul style={{ width: '42em' }}>
                            <UserPost />
                            {PostData.map(({ fullname, date, location, profilePic,image, text, likes}, index) => (
                                <React.Fragment>
                                    <li key={index}><Post fullname={fullname} profilePic={profilePic} text={text} image={image} location={location} date={date} likes={likes} /></li>
                                    <br />
                                </React.Fragment>
                            ))}
                        </ul>

                    </Container>
                </Box>



            </Box>
        </React.Fragment>
    )
}


const styles = {
    grid: {
        display: ['flex', 'flex', 'flex', 'flex', 'grid'],
        gridTemplateColumns: '2fr 3fr 2fr'
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