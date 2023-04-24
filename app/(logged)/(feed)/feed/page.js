'use client'
import React from "react";
//import { Container, Box } from "theme-ui";
import UserPost from "../../../Components/Post/UserPost.js";
import TopFeedBar from "../../../Components/TopFeedBar.js";
import Feed from "../../../Components/Feed.js";
import { useStore } from '../../../../store/store.js'
import { useEffect } from "react";

export default function Page() {

    console.log('PAGEE')


    return (
        <div style={{ width: '42em' }}>

            <UserPost />

            <TopFeedBar />

            <Feed />


        </div>
    )
}
