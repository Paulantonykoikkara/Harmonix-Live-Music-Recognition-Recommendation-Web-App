import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
const navigate = useNavigate()
  const handleLogin = () => {
    const datas = {
      email,
      password
    };
    axios.post("http://localhost:5002/Login", datas).then((res) => {
        console.log(res.data);
        console.log(res.data);
        const {id,login} = res.data
        console.log(login);
        
        if(login === "User"){
          console.log('hi');
          
         sessionStorage.setItem("uid",id)
         navigate("/user")
 
        }

        if(login === "Admin"){
          console.log('hi');
          
         sessionStorage.setItem("aid",id)
         navigate("/admin")
 
        }
 
         
    });
  }
  return (
    <div className={style.main}>
      <Card className={style.Privacycard}>
        <Stack direction={'column'} gap={4}>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 30, textAlign: "center" }}>LOGIN</Typography>
          <TextField id="standard-basic" label="UserName" variant="standard" fullWidth onChange={(e) => setEmail(e.target.value)} />
          <TextField id="standard-basic" label="Password" variant="standard" fullWidth onChange={(e) => setPassword(e.target.value)} />
          <Button variant="contained" sx={{ px: 6, fontFamily: 'cursive' }} onClick={handleLogin}>Sign In</Button>
          <Link to={'/'} style={{ textDecoration: "none",color: "white" }}><Button variant="contained" sx={{ px: 6, fontFamily: 'cursive' }}>Back</Button></Link>
        </Stack>
      </Card>
    </div>
  )
}


export default Login