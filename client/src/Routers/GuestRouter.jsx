import React from 'react'
import Login from '../Guest/page/Login/Login'
import Registration from '../Guest/page/Registration/Registration'
import { Route, Routes } from 'react-router-dom'
import GuestHomeElements from '../Guest/page/GuestHomeElements/GuestHomeElements'
import ViewFAQ from '../Guest/page/ViewFAQ/ViewFAQ'

const GuestRouter = () => {
  return (
    <div>
      <Routes>
      <Route path="" element={<GuestHomeElements />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="viewfaq" element={<ViewFAQ/>} />
      </Routes>
    </div>
  )
}

export default GuestRouter