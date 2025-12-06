import React from 'react'
import EditProfile from '../User/Pages/EditProfile/EditProfile'
import MyProfile from '../User/Pages/MyProfile/MyProfile'
import ChangePassword from '../User/Pages/ChangePassword/ChangePassword'
import { Route, Routes } from 'react-router-dom'
import Animation from '../Animation'
import History from '../User/Pages/History/History'
import Complaint from '../User/Pages/complaint/Complaint'

const UserRouter = () => {
  return (
    <div><Routes>
      <Route path="/" element={<Animation />} />
    <Route path="editprofile" element={<EditProfile />} />
    <Route path="myprofile" element={<MyProfile />} />
    <Route path="changepassword" element={<ChangePassword />} />
    <Route path="history" element={<History />} />
    <Route path="complaint" element={<Complaint />} />
  </Routes></div>
  )
}

export default UserRouter