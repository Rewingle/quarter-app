'use client'
import React from 'react'
import { Box, Flex, Container, Input } from 'theme-ui'


function page() {
    return (
        <Box sx={styles.main}>
         
            <Box sx={styles.prompt}>LETS FIND YOUR NEIGHBORHOOD</Box>
            <Input placeholder='Start typing...'></Input>
        </Box>
    )
}

const styles = {
    main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}


export default page