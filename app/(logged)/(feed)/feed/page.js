
import React from "react";
//import { Container, Box } from "theme-ui";
import Post from "../../../Components/Post/Post.js";
import { getFeed } from '../../../../lib/getFeed.js';
import UserPost from "../../../Components/Post/UserPost.js";

export default async function Page() {



    let posts = await getFeed();


    return (
        <ul style={{ width: '42em' }}>
            <UserPost />

            {posts?posts?.map(({ fullname, profilePic, text, image, location, date, likes }, index) => (
                <React.Fragment>
                    <li key={index}><Post fullname={fullname} profilePic={profilePic} text={text} image={image} location={location} date={date} likes={likes} /></li>
                    <br />
                </React.Fragment>
            )):<div>WE CANT FIND POSTS</div>}


        </ul>
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