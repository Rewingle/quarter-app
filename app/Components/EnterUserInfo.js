import React, { useState } from 'react'
import { Input, Box, Select, Button } from 'theme-ui'


function EnterUserInfo(props) {
  const camera = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-50">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
  const user = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-50">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>

  const [word, setWord] = useState(null)

  return (
    <Box>
      <Box sx={{ fontWeight: '700', fontStyle: 'italic', fontSize: '22px' }}>LET'S GET TO KNOW YOU</Box>
      <br />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', '&:hover': { cursor: 'pointer' } }} onClick={() => alert("WORK IN PROGRESS")}>
          <Box sx={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'gray', position: 'absolute', bottom: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{camera}</Box>
          <Box sx={{ width: '88px', height: '88px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bg-gradient-to-r from-teal-400 to-cyan-500">
            <Box sx={{ fontWeight: '700', color: 'white', fontSize: '42px' }}>{word?word:user}</Box>
          </Box>

        </Box>
      </Box>
      <Box sx={{ textAlign: 'center',fontWeight:'600' }}>UPLOAD PROFILE PICTURE</Box>

      <br />
      <Input placeholder='First Name' sx={styles.textArea} onChange={(e) => setWord(e.target.value.substring(0, 1).toUpperCase())} className='placeholder:text-black h-12 ' />
      <br />
      <Input placeholder='Last Name' sx={styles.textArea} className='placeholder:text-black h-12 '/>
      <br />
      <Button sx={{float:'right'}} className="bg-gradient-to-r from-teal-400 to-cyan-500">Continue</Button>


    </Box>
  )
}
const styles = {
  textArea: {
    width: '100%',
    backgroundColor: 'rgb(229, 229, 229)',
    border: 'none',
    color: 'black',

},
}
export default EnterUserInfo