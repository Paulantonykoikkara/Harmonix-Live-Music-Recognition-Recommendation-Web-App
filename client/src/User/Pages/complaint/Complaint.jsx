import { Button, Card, Stack, TextField, List, ListItem, ListItemText, Typography, Box, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./complaint.module.css";

const Complaint = () => {
  const [content, setContent] = useState("");
  const [complaintList, setComplaintList] = useState([]);
  const Uid = sessionStorage.getItem('uid');
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/Complaint/${Uid}`);
      if (response.data.complaint) {
        setComplaintList(response.data.complaint);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleAddComplaint = async () => {
    const data = { content, userId: sessionStorage.getItem("uid") };
    try {
      const res = await axios.post("http://localhost:5002/Complaint", data);
      console.log(res.data);
      fetchComplaints();
      setContent("");
    } catch (error) {
      console.error("Error adding complaint:", error);
    }
  };

  return (
    <Box className={style.main} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Card className={style.complaintCard} sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Submit a Complaint
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
          <TextField
            id="standard-basic"
            label="Enter Your Complaint"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
          />
          <Button
            onClick={handleAddComplaint}
            variant="contained"
            sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
          >
            Submit
          </Button>
        </Stack>
      </Card>

      <Card className={style.complaintCard} sx={{ mt: 3, p: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Complaints List
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {complaintList.length > 0 ? (
            complaintList.map((item) => (
              <ListItem key={item._id} sx={{ mb: 1, bgcolor: "#f9f9f9", borderRadius: 2 }}>
                <ListItemText
                  primary={<Typography variant="body1"><strong>Complaint:</strong> {item.content}</Typography>}
                  secondary={<Typography variant="body2" color="textSecondary"><strong>Reply:</strong> {item.reply || "No reply yet"}</Typography>}
                />
              </ListItem>
            ))
          ) : (
            <Typography color="textSecondary">No complaints available</Typography>
          )}
        </List>
      </Card>
    </Box>
  );
};

export default Complaint;