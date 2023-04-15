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

            {posts ? posts?.map(({ _id,fullName, userName, profilePic, text, image, comments, location, date, likes }, index) => (
                <li key={index}>
                    <li ><Post postId={_id} comments={comments} fullName={fullName} userName={userName} profilePic={profilePic} text={text} image={image} location={location} date={date} likes={likes} /></li>
                    <br />
                </li>
            )) : <div>WE CANT FIND POSTS</div>}


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