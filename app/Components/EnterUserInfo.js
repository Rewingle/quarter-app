import React, { useState } from 'react'
import { Input, Box, Select } from 'theme-ui'


function EnterUserInfo(props) {

  const [word, setWord] = useState(null)

  return (
    <Box>
      <Box sx={{ fontWeight: '700', fontStyle: 'italic', fontSize: '22px' }}>LET'S GET TO KNOW YOU</Box>
      <br />
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Box sx={{ width: '84px', height: '84px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bg-gradient-to-r from-teal-400 to-cyan-500">
          <Box sx={{ fontWeight: '700', color: 'white', fontSize: '42px' }}>{word}</Box>
          
        </Box>
      </Box>
      <Box>Current Profile Picture</Box>
      <br />
      <Input placeholder='First Name' onChange={(e) => setWord(e.target.value.substring(0, 1).toUpperCase())} />
      <hr />
      <Input placeholder='Last Name' />
      <hr />
      <Select />

    </Box>
  )
}

export default EnterUserInfo