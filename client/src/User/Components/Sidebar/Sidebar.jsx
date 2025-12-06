import React from 'react'
import style from './sidebar.module.css'
import { Link } from 'react-router-dom'
import { Box, Card } from '@mui/material'
const Sidebar = () => {
  return (
    <Card sx={{backgroundColor:'rgb(246, 228, 241);',width:'200px',height:'100vh'}}>
      <Box sx={{display:'flex',flexDirection:'column',marginLeft:'10px',gap:'50px ',fontFamily:'cursive',fontSize:'20px',marginTop:'100px'}}>
          <Box   sx={{ 
    '&:hover': { backgroundColor: 'lightpink'}, 
    padding: '10px',
    borderRadius: '5px'
  }}><Link className={style.link_text} to={'/user/editprofile'}>Edit Profile</Link></Box>   
          <Box   sx={{ 
    '&:hover': { backgroundColor: 'lightpink' }, 
    padding: '10px',
    borderRadius: '5px' 
  }}> <Link  className={style.link_text} to={'/user/myprofile'}>My Profile</Link></Box>
          <Box   sx={{ 
    '&:hover': { backgroundColor: 'lightpink' }, 
    padding: '10px',
    borderRadius: '5px' 
  }}> <Link className={style.link_text} to={'/user/changepassword'}>Change Password</Link></Box>
      </Box>
     
    </Card>
  )
}

export default Sidebar