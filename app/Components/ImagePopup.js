import React from 'react'
import { Box } from 'theme-ui'

function ImagePopup(props) {


    return (props.trigger) ? (
        <Box style={styles.popup} onClick={() => { props.setTrigger(false) }}>
            <Box sx={styles.popupInner}>
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
       
        width: '100%',
        maxWidth: '640px',
        maxHeight:'640px',
        zIndex:100,
        backgroundColor: 'white',
        borderRadius: '1em'
    },
    content:{
        padding: '1em',
    },

}
export default ImagePopup