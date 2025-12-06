import { Button, Card, Stack, TextField, List, ListItem, ListItemText } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './faq.module.css';

const Faq = () => {
  const [faq, setFaq] = useState('');
  const [faqList, setFaqList] = useState([]);

  // Fetch FAQs when component mounts
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("http://localhost:5002/fetchfaq");
      if (response.data.success) {
        setFaqList(response.data.faqs);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleAddFaq = async () => {
    const datas = { faqName: faq };
    try {
      const res = await axios.post("http://localhost:5002/faq", datas);
      console.log(res.data);
      fetchFaqs(); // Refresh FAQ list
      setFaq(''); // Clear input field
    } catch (error) {
      console.error("Error adding FAQ:", error);
    }
  };

  return (
    <div className={style.main}>
      <Card className={style.Privacycard}>
        <Stack direction={'row'} gap={4}>
          <TextField
            id="standard-basic"
            label="FAQ"
            variant="standard"
            value={faq}
            onChange={(e) => setFaq(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddFaq} variant="contained" sx={{ px: 6 }}>
            Save
          </Button>
        </Stack>
      </Card>

      {/* Display FAQs */}
      <Card className={style.Privacycard} sx={{ mt: 2 }}>
        <h3>FAQs</h3>
        <List>
          {faqList.length > 0 ? (
            faqList.map((item) => (
              <ListItem key={item._id}>
                <ListItemText primary={item.faqName} />
              </ListItem>
            ))
          ) : (
            <p>No FAQs available</p>
          )}
        </List>
      </Card>
    </div>
  );
};

export default Faq;
