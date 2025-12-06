import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './manageuser.module.css';

const Manageuser = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from API
  const fetchUser = () => {
    axios
      .get(`http://localhost:5002/user`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.user);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={style.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 20, fontFamily: 'monospace' }}>UserName</TableCell>
              <TableCell align="right" sx={{ fontSize: 20, fontFamily: 'monospace' }}>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{user.registrationUsername}</TableCell>
                <TableCell align="right">{user.registrationEmail}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Manageuser;
