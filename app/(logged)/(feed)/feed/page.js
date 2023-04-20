import React from "react";
//import { Container, Box } from "theme-ui";
import Post from "../../../Components/Post/Post.js";
import { getFeed } from '../../../../lib/getFeed.js';
import UserPost from "../../../Components/Post/UserPost.js";
import { Button } from "theme-ui";
import TopFeedBar from "../../../Components/TopFeedBar.js";

export default async function Page() {



    let posts = await getFeed();
    if (posts.length == 0) {
        console.log('yokkk')

        return <ul style={{ width: '42em' }}><UserPost /><div style={{ diplay: 'flex', textAlign: 'center', fontWeight: '600', fontSize: '18px', opacity: '0.6' }}>It seems like there are no posts in your neighborhood :/</div></ul>
    }
    return (
        <ul style={{ width: '42em' }}>

            <UserPost />

            <TopFeedBar/>
            
            {posts ? posts?.map(({ _id, fullName, userName, profilePic, text, tags, image, comments, location, date, likes }, index) => (
                <li key={index}>
                    <li ><Post postId={_id} comments={comments} fullName={fullName} userName={userName} profilePic={profilePic} text={text} tags={tags} image={image} location={location} date={date} likes={likes} /></li>
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