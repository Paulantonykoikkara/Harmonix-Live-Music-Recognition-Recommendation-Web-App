import { Avatar, Button, Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./myprofile.module.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("uid"); 
    console.log(userId);
    
    if (userId) {
      axios
        .get(`http://localhost:5002/user/${userId}`)
        .then((response) =>{
console.log(response.data);

       setUser(response.data.user)
       } )
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  return (
    <div className={style.main}>
      <Card sx={{ padding: "20px", width: "350px" }}>
        <Stack direction={"column"} gap={3} alignItems="center">
          <Avatar sx={{ width: "100px", height: "100px" }} />
          <Typography variant="h6">{user?.registrationName || "User"}</Typography>
          <Typography variant="body1">Email: {user?.registrationEmail || "N/A"}</Typography>
          <Typography variant="body1">Username: {user?.registrationUsername || "N/A"}</Typography>
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </Stack>
      </Card>
    </div>
  );
};

export default MyProfile;
