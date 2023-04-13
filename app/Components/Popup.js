import React from 'react'
import { Box } from 'theme-ui'

function Popup(props) {
    const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>

    return (props.trigger) ? (
        <Box style={styles.popup}>
            <Box sx={styles.popupInner}>
                <Box sx={styles.closeBtn} onClick={() => { props.setTrigger(false) }}>{closeIcon}</Box>
                <Box sx={styles.content}>
                    {props.children}
                </Box>

            </Box>
        </Box>
    ) : null
}

const styles = {
    popup: {
        zIndex: 100,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.2)',
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupInner: {
        position: 'relative',
        padding: '2em',
        width: '100%',
        maxWidth: '640px',
        
        backgroundColor: 'white',
        borderRadius: '1em'
    },
    content:{
        padding: '1em',
    },
    closeBtn: {
        position: 'absolute',
        top: '1em',
        right: '1em',
        p:1,
        ':hover':{
            cursor:'pointer',
            backgroundColor:'rgb(242, 242, 242)',
            borderRadius:'50%',
            
        }
    }
}
export default Popup