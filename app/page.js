'use client'
import React, { useState, useEffect } from "react"
import Feed from './Feed'
import Image from 'next/image';
import Home from "./Home";
import { ThemeProvider } from 'theme-ui'
import Theme from '../theme/theme';
import { signOut, useSession } from "next-auth/react";


function Page() {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500);

  }, []);


  const { data: session } = useSession();
  //LOAD FIRST TO WAIT SESSION THEN IF NOT SHOW HOME PAGE
  return (

    <ThemeProvider theme={Theme}>
      {
        !isLoading ?
          session?.user ? <Feed />
            :
            <Home />
          : <div></div>
      }


    </ThemeProvider>


  )

}
export default Page

