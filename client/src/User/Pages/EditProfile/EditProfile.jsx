import { Avatar, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./editprofile.module.css";

const EditProfile = () => {
  const [user, setUser] = useState({
    registrationName: "",
    registrationEmail: "",
    registrationUsername: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("uid"); // Fetch user ID from localStorage
    if (userId) {
      axios
        .get(`http://localhost:5002/user/${userId}`)
        .then((response) => setUser(response.data.user))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5002/user/${user._id}`, user)
      .then(() => {
        alert("Profile updated successfully!");
        setEditing(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className={style.main}>
      <Card sx={{ padding: "20px", width: "350px" }}>
        <Stack direction={"column"} gap={3} alignItems="center">
          <Avatar sx={{ width: "100px", height: "100px" }} />
          {editing ? (
            <>
              <TextField
                label="Full Name"
                name="registrationName"
                value={user.registrationName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="registrationEmail"
                value={user.registrationEmail}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Username"
                name="registrationUsername"
                value={user.registrationUsername}
                onChange={handleChange}
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6">{user.registrationName || "User"}</Typography>
              <Typography variant="body1">Email: {user.registrationEmail || "N/A"}</Typography>
              <Typography variant="body1">Username: {user.registrationUsername || "N/A"}</Typography>
              <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </Stack>
      </Card>
    </div>
  );
};

export default EditProfile;
