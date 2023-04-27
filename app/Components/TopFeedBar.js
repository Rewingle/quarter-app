'use client'
import React from 'react'
import { Box, Button, Select } from 'theme-ui'
import { useSession } from 'next-auth/react'

function TopFeedBar() {
    console.log('TOP FEED BAR')
    const tag = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
    const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>

    const { data: session } = useSession()
    const styles = {
        screen: {
            display: ['none', 'none', 'none', 'block', 'block']
        },
        mobile: {
            display: ['flex', 'flex', 'block', 'none', 'none'],
            justifyContent: 'center',
            fontStyle: 'italic',
            fontWeight: '600'

        }
    }
    return (
        <Box style={{ marginBottom: '1em', display: 'inline-block', width: '100%' }}>
            <Box sx={styles.screen}>
                <Box style={{ float: 'left', left: 0 }}>
                    <Button sx={{ backgroundColor: '#7A577A', borderRadius: '8px', opacity: 0.8, ':hover': { opacity: 1 } }}>
                        UPCOMING EVENTS
                    </Button>
                </Box>
                <Box style={{ float: 'right', right: 0 }}>
                    <Select className="drop-shadow-lg" style={{ opacity: 0.8, width: '6em' }}>
                        <option value=''>FILTER </option>
                        <option value=''>HELP </option>
                        <option value=''>ADVICE </option>
                        <option value=''>MISSING </option>
                        <option value=''>SALE </option>
                    </Select>
                </Box>
            </Box>
            <Box sx={styles.mobile}>

                <Box sx={{ display: 'flex' }}>
                    {locationIcon}
                    {session.user.name.split(',')[6].toUpperCase() + ' ' + session.user.name.split(',')[5].toUpperCase()}
                </Box>
            </Box>
        </Box>
    )

}

export default TopFeedBar