import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import style from './Registration.module.css'
import { Link } from 'react-router-dom'
import axios from "axios";
const Registration = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const handleAddGame = () => {
    
    const datas = {
      registrationName: name,
      registrationEmail: email,
      registrationUsername: username,
      registrationPassword: password,
    };
    axios.post("http://localhost:5002/registration", datas).then((res) => {
        console.log(res.data);
    });
  }
  return (
    <div className={style.main}>
      <Card className={style.Privacycard}>
        <Stack direction={'column'} gap={4}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 30, textAlign: "center" }}>REGISTER</Typography>
          <TextField id="standard-basic" label="Name" variant="standard" onChange={(e)=> setName(e.target.value)} fullWidth />
          <TextField id="standard-basic" label="Email" variant="standard" onChange={(e)=> setEmail(e.target.value)} fullWidth />
          <TextField id="standard-basic" label="UserName" variant="standard" onChange={(e)=> setUsername(e.target.value)} fullWidth />
          <TextField id="standard-basic" label="Password" variant="standard"onChange={(e)=> setPassword(e.target.value)} fullWidth />
          <Button onClick={handleAddGame} variant="contained" sx={{ px: 6, fontFamily: 'cursive' }}>SignUp</Button>
          <Link to={'/'} style={{ textDecoration: "none",color: "white" }}><Button variant="contained" sx={{ px: 6, fontFamily: 'cursive' }}>Back</Button></Link>
        </Stack>
      </Card>
    </div>
  )
}

export default Registration