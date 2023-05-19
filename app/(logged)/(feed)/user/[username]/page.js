'use client'
import React, { useEffect, useState } from 'react'
import { Box, Card, Container, Button } from 'theme-ui'
import Image from 'next/image'
import ProfilePicHolder from '../../../../Components/ProfilePicHolder'

export default function page({ params }) {
  const addFriend = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </svg>
  const more = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-60 hover:cursor-pointer">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
  const home = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 opacity-80">
  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
</svg>


  const [user, setUser] = useState()
  useEffect(() => {
    const getUserInfo = async () => {
      await fetch('/api/getUserInfo',
        {
          method: 'POST',
          body: JSON.stringify({
            userName: params.username
          })
        }).then(res => res.json().then(data => { setUser(data) }))
    }
    getUserInfo()
  }, [])

  return <Box sx={{ width: '100%', px: [0, 0, 0, 5, 5, 5] }}>
    <Card sx={styles.container} className='drop-shadow-lg'>
      <Container sx={styles.picContainer}>
        <Box sx={styles.pic}>
          {user ? <ProfilePicHolder width={92} height={92} src={user.profilePic} /> : null}
        </Box>
        <Box sx={styles.userInfo}>
          <Box sx={{ py: 4 }}>
            <Box sx={styles.name}>{user ? user.firstName + ' ' + user.lastName : null}</Box>
            <Box sx={styles.location}>
              <Box sx={{display:'flex',alignItems:'center'}}>{home}</Box><Box sx={{ml:2}}>{user ? user.address.neighborhood + ' ' + user.address.district : null}</Box>

            </Box>
          </Box>
        </Box>


      </Container>
      <Box sx={styles.buttons}>
        <Button className='bg-teal-500 font-bold' sx={{ display: 'flex',opacity:0.8,':hover':{opacity:1}, borderRadius: '0.5em' }}>{addFriend}Add friend</Button>
        <Button className='font-semibold' sx={{ display: 'flex',backgroundColor:'gainsboro',color:'gray',':hover':{color:'black'}, borderRadius: '0.5em', marginLeft: '1em' }}>Message</Button>
        <Box sx={{marginLeft:'1em',borderRadius:'50%',backgroundColor:'gainsboro',p:1}}>{more}</Box> 
      </Box>
    </Card>
  </Box>
}

const styles = {

  container: {
    px: [0, 0, 0, 3, 3, 3],
    py: 3,
    width: '100%',
    borderRadius: '1em',
    backgroundColor: 'white'
  },
  picContainer: {
    display: 'grid',
    gridTemplateColumns: ['2fr 5fr', '2fr 5fr', '2fr 5fr', '5fr 5fr', '5fr 5fr', '2fr 5fr'],
    height: '8em',

  },
  buttons: {
    display: 'flex',
    px: 4, py: 2,

    alignItems: 'center',
  },
  pic: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  userInfo: {

    width: '100%',

  },
  name: {
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: '30px',
    textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
  },
  location: {
    display:'flex'
  }

}
