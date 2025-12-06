import { Button, Card, Stack, TextField, List, ListItem, ListItemText } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './addprivacy.module.css';

const AddPrivacy = () => {
  const [privacy, setPrivacy] = useState('');
  const [privacyList, setPrivacyList] = useState([]);

  // Fetch privacy policies when the component mounts
  useEffect(() => {
    fetchPrivacyPolicies();
  }, []);

  const fetchPrivacyPolicies = async () => {
    try {
      const response = await axios.get("http://localhost:5002/fetchprivacy");
      if (response.data.success) {
        setPrivacyList(response.data.privacies);
      }
    } catch (error) {
      console.error("Error fetching privacy policies:", error);
    }
  };

  const handleAddPrivacy = async () => {
    const data = { privacyName: privacy };
    try {
      const res = await axios.post("http://localhost:5002/privacy", data);
      console.log(res.data);
      fetchPrivacyPolicies(); // Refresh the list
      setPrivacy(''); // Clear input field
    } catch (error) {
      console.error("Error adding privacy policy:", error);
    }
  };

  return (
    <div className={style.main}>
      <Card className={style.Privacycard}>
        <Stack direction={'row'} gap={4}>
          <TextField
            id="standard-basic"
            label="Privacy Policy"
            variant="standard"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddPrivacy} variant="contained" sx={{ px: 6 }}>
            Save
          </Button>
        </Stack>
      </Card>

      {/* Display Privacy Policies */}
      <Card className={style.Privacycard} sx={{ mt: 2 }}>
        <h3>Privacy Policies</h3>
        <List>
          {privacyList.length > 0 ? (
            privacyList.map((item) => (
              <ListItem key={item._id}>
                <ListItemText primary={item.privacyName} />
              </ListItem>
            ))
          ) : (
            <p>No privacy policies available</p>
          )}
        </List>
      </Card>
    </div>
  );
};

export default AddPrivacy;
