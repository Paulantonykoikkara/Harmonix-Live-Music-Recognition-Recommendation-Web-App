import React from 'react'
import styles from './navbar.module.css'
import { Box, Card } from '@mui/material'

const Navbar = () => {
  return (

    <Card sx={{backgroundColor:'rgb(241, 237, 240);',width:'100%',height:'100px'}}>
      <Box className={styles.nav_icon}>

      </Box>

    </Card>
 
  )
}

export default Navbar