import React from 'react'

function Popup(props) {
    const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>

    return (props.trigger) ? (
        <div style={styles.popup}>
            <div style={styles.popupInner}>
                <div style={styles.closeBtn} onClick={() => { props.setTrigger(false) }}>{closeIcon}</div>
                <div style={styles.content}>
                    {props.children}
                </div>

            </div>
        </div>
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
        '&:hover': {
            cursor: 'pointer'
        }
    }
}
export default Popup