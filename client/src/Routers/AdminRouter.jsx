import React from "react";

import { Route, Routes } from "react-router-dom";
import AddPrivacy from "../Admin/pages/AddPrivacy/AddPrivacy";
import Faq from "../Admin/pages/FAQ/Faq";
import Viewcomplaints from "../Admin/pages/ViewComplaints/Viewcomplaints";
import HomeElement from "../Admin/pages/HomeElements/HomeElement";
import Manageuser from "../Admin/pages/ManageUser/Manageuser";


const AdminRouter = () => {
  return (
    <div>
      <Routes>
     
      <Route path="" element={< HomeElement />} />
        <Route path="addprivacy" element={<AddPrivacy />} />
        <Route path="FAQ" element={<Faq />} />
        <Route path="ViewComplaints" element={<Viewcomplaints/>} />
        <Route path="Manageuser" element={<Manageuser/>} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
