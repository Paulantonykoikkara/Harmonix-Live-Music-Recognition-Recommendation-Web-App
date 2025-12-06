import React from 'react'
import { Link } from 'react-router-dom'
import style from './GuestHomeElements.module.css'
import Button from '@mui/material/Button';
//import img1 from 'client/src/images/music_logo.jpg'
import img1 from "../../../images/music_logo.jpg";

const GuestHomeElements = () => {
  return (
    <div className={style.bgstyle}>
    <div style={{ display: 'flex', justifyContent: 'end', gap: 20, marginRight: '30px',fontFamily: 'cursive', fontSize: '20px',padding: '30px' }}>
    <div><Link to={'/user'} style={{ textDecoration: "none",color: "white" }}><Button variant="contained" sx={{ px: 6, fontFamily: 'cursive' }}><span className={style.button_style}>Rec Now</span></Button></Link></div>
    <div><Link to={'/login'} style={{ textDecoration: "none",color: "white" }}><Button variant="contained" sx={{ px: 6, fontFamily: 'cursive' }}><span className={style.button_style}>Login</span></Button></Link></div>
      <div><Link to={'/registration'} style={{ textDecoration: "none",color: "white" }}><Button variant="contained" sx={{ px: 6, fontFamily: 'cursive' }}><span className={style.button_style}>Sign Up</span></Button></Link></div>
    </div>
    <div className={style.sub_div}>
      <img src={img1} className={style.logo_style}/>
      <p className={style.item}>HarmonicX</p>
    </div>
    <div className={style.caption_div}>
      <p className={style.caption}>Discover <span className={style.span_style}>Music,</span><br/> Recognize<span className={style.span_style}> Melodies,</span><br/>  Elevate your<span className={style.span_style}> Experience.</span></p>
    </div>
    <div style={{display:'flex',justifyContent:'end',fontSize:'20px',marginRight:'50px'}}>
      <Link style={{color:'white'}} to={'/viewfaq'}>FAQ</Link></div>
    </div>
  )
}

export default GuestHomeElements
{/* <Button variant="contained" style={{marginTop: "30px"}}><Link to={'/registration'} style={{ textDecoration: "none",color: "white" }}>Sign Up</Link></Button> */}