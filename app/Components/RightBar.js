import React from 'react'
import {Box,Container} from 'theme-ui'
function RightBar() {
    return (
        <Box sx={styles.rightBar}>
            <Box sx={styles.rightBarContainer}>
                <Container sx={styles.rightBarInner}>
                    <ul>
                        <li>-PEOPLE YOU MAY KNOW</li>
                        <li>-ADS</li>
                        <li>-SHOWCASE BANNER</li>
                    </ul>

                </Container>
            </Box>

        </Box>
    )
}
const styles={
    rightBar: {
        display: ['none', 'none', 'none', 'none', 'block'],
        p: 3,
        float: 'right'
    },
    rightBarContainer: {
        position: 'fixed',
        width: '100%',
        height: '100vh'
    }

}
export default RightBar