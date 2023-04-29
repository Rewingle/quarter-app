import React from 'react'
import Image from 'next/image'
import { Box } from 'theme-ui'

function ProfilePicHolder(props) {
    
  /* 
    REQUIRED PROPS
    WIDTH, HEIGHT, SRC OR CHARACTER
  */
  return (
    <div>
      {props.src ? <Image src={props.src} width={props.width} height={props.height} style={{ borderRadius: '50%' }} /> 
      : 
      <Box sx={{ width: props.width, height: props.height, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bg-gradient-to-r from-teal-400 to-cyan-500">
        <Box sx={{ fontWeight: '700', color: 'white', fontSize: '18px' }}>{props.character}</Box>
      </Box>
      }
    </div>
  )
}

export default ProfilePicHolder