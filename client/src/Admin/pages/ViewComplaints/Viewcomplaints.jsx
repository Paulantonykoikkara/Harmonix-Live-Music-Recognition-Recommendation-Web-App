import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import style from "./Viewcomplaints.module.css";

const Viewcomplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:5002/Complaint");
      setComplaints(response.data.complaint);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleReplyChange = (id, value) => {
    setReplyText({ ...replyText, [id]: value });
  };

  const handleAddReply = async (id) => {
    try {
      await axios.put(`http://localhost:5002/updateComplaint/${id}`, {
        reply: replyText[id] || "No reply yet",
      });
      fetchComplaints(); // Refresh after update
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  return (
    <div className={style.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="complaints table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 18, fontWeight: "bold" }}>User ID</TableCell>
              <TableCell sx={{ fontSize: 18, fontWeight: "bold" }}>Complaint Content</TableCell>
              <TableCell sx={{ fontSize: 18, fontWeight: "bold" }}>Reply</TableCell>
              <TableCell sx={{ fontSize: 18, fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.length > 0 ? (
              complaints.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.userId}</TableCell>
                  <TableCell>{item.content}</TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="Enter reply"
                      value={replyText[item._id] || item.reply || ""}
                      onChange={(e) => handleReplyChange(item._id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddReply(item._id)}
                    >
                      Submit Reply
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No complaints available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Viewcomplaints;