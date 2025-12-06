import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ChangePassword = () => {
    const Uid = sessionStorage.getItem('uid');
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [storedPassword, setStoredPassword] = useState('');
    const [message, setMessage] = useState('');

    // Fetch user password (hashed) from database
    const fetchChangePassword = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/UserMain/${Uid}`);
            const data = response.data.user;
            console.log(data);
            
            setStoredPassword(data.registrationPassword); // Hashed password from DB
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    // Update Password
    const updateChangePasswordUser = async () => {
        if (!currentPassword || !newPassword || !rePassword) {
            setMessage("All fields are required");
            return;
        }

        if (newPassword !== rePassword) {
            setMessage("New Password and Confirm Password do not match");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5002/updateChangePasswordUser/${Uid}`, {
                
                password: newPassword,
            });

            setMessage(response.data.message);
            fetchChangePassword(); // Refresh password
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchChangePassword();
    }, []);

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ p: 5, backgroundColor: 'aliceblue', width: 300, height: 350, mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant='h4' textAlign={'center'} sx={{ p: 2 }}>Change Password</Typography>
                <Stack>
                    <TextField label="Old Password" type="password" variant="outlined" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </Stack>
                <Stack>
                    <TextField label="New Password" type="password" variant="outlined" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </Stack>
                <Stack>
                    <TextField label="Re-Enter New Password" type="password" variant="outlined" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                </Stack>
                {message && <Typography color="error" textAlign="center">{message}</Typography>}
                <Stack direction='column'>
                    <Button variant="contained" fullWidth onClick={updateChangePasswordUser}>Save</Button>
                </Stack>
            </Card>
        </Box>
    );
};

export default ChangePassword;
