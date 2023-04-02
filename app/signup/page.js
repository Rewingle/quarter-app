'use client'
import React from 'react'
import HomeRegister from '../Components/HomeRegister'
import {Box} from 'theme-ui'

function page() {
  return (
    <Box className={'flex justify-center items-center h-screen bg-black'}>
        <HomeRegister/>   
    </Box>
  )
}

export default page