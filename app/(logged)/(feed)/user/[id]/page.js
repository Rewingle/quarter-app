'use client'
import React from 'react'
import { Box, Card, Container,Button } from 'theme-ui'
import Image from 'next/image'

export default function page({ params }) {
  return <div style={styles.page}>
    <Card sx={styles.container} className='drop-shadow-lg'>
      <Container sx={styles.picContainer}>
        <Box sx={styles.pic}>
          <Image src='https://quarter-app.s3.eu-central-1.amazonaws.com/dummyperson.jpg' height='122' width='122' style={{ borderRadius: '50%' }} />
        </Box>
        <Box sx={styles.userInfo}>
          <Box sx={styles.name}>Ahmet Dolunay</Box>
          <Box sx={styles.location}>
            Acıbadem, Kadıköy
          </Box>
        </Box>
        <Box sx={styles.message}>
          <Button className='bg-teal-500'>Message</Button>
        </Box>
      </Container>
    </Card>
  </div>;
}

const styles = {
  page: {

  },
  container: {
    px: [0, 0, 0, 5, 5, 5],
    py: 3
  },
  picContainer: {

    display: 'grid',
    gridTemplateColumns: '1fr 4fr 2fr',
    height: '8em',

  },
  message:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    bacckgroundColor:'red'
  },
  pic: {

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userInfo: {
    p:4

  },
  name: {
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: '30px',
  },
  location: {

  }

}
