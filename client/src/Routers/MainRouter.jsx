import React from "react";
import { Route, Routes } from "react-router-dom";
import GuestHomePage from "../Guest/GuestHomePage";

import UserHomePage from "../User/UserHomePage";
import Home from "../Admin/pages/home/Home";


const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<GuestHomePage />} />
        <Route path="admin/*" element={<Home/>} />
        <Route path="user/*" element={<UserHomePage />} />
       
      </Routes>
    </div>
  );
};

export default MainRouter;
