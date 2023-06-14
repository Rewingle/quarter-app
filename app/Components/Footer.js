'use client'
import React from 'react'
import { Box } from 'theme-ui'

function Footer() {
  return (
    <Box style={{ width: '100%', height: '18em', backgroundColor: '#209989', justifyContent: 'center', display: 'flex', alignItems: 'center',color:'white',py:2, float: 'bottom' }}>
      <Box sx={{ display: 'flex', gridTemplateColumns: '1fr 1fr 1fr',gridTemplateRows:'masonary', gridGap: '6em',px:4,py:2,backgroundColor:'#209989' }}>
        <Box>
          <Box sx={{ fontWeight: 600, fontSize: '22px' }}>Quarter</Box>
          <ul sx={{ fontSize: '12px' }}>
            <li>About</li>
            <li>News</li>
            <li>Media Assets</li>
            <li>Blog</li>
            <li>Help</li>
            <br></br>
            <li>Privacy</li>
            <li>Legal & Terms</li>
            <li>Cookies</li>
          </ul> </Box>
        <Box>
          <Box sx={{ fontWeight: 600, fontSize: '22px' }}>Business</Box>
          <ul sx={{ fontSize: '12px' }}>
            <li>Guidelines</li>
            <li>Small business</li>
            <li>Ad Terms</li>
            <li>Help</li>

          </ul> </Box>
        <Box>
          <Box sx={{ fontWeight: 600, fontSize: '22px' }}>More</Box>
          <ul sx={{ fontSize: '12px' }}>
            <li>Career</li>
            <li>Events</li>
            <li>Capstone Project</li>

          </ul> </Box>
      </Box>

    </Box>
  )
}

export default Footer