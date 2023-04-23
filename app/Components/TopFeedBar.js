'use client'
import React from 'react'
import { Box,Button, Select } from 'theme-ui'


function TopFeedBar() {
    console.log('TOP FEED BAR')
    return (
        <Box style={{ marginBottom: '1em', display: 'inline-block', width: '100%' }}>
            <div style={{ float: 'left', left: 0 }}>
                <Button sx={{backgroundColor:'#7A577A',borderRadius:'8px'}}>
                    UPCOMING EVENTS
                </Button>
            </div>
            <div style={{ float: 'right', right: 0 }}>
                <Select className="drop-shadow-lg" style={{ opacity: 0.8 }}>
                    <option value="">FILTER BY TAGS  </option>
                </Select>
            </div>
        </Box>
    )
}

export default TopFeedBar