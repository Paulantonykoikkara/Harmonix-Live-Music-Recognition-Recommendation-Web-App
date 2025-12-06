import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';

// Custom styled card
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
  margin: theme.spacing(2),
}));

const ViewFAQ = () => {
  const [faqs, setFaqs] = useState([]);

  const fetchFaq = async () => {
    try {
      const response = await axios.get('http://localhost:5002/fetchfaq');
      setFaqs(response.data.faqs);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          mb: 6,
          fontWeight: 'bold',
          color: '#1976d2',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        Frequently Asked Questions
      </Typography>

      {faqs.length > 0 ? (
        <Grid container spacing={3}>
          {faqs.map((faq) => (
            <Grid item xs={12} sm={6} md={4} key={faq._id}>
              <StyledCard>
                <CardContent sx={{ padding: 3 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'medium',
                      color: '#333',
                      mb: 1,
                      minHeight: '3rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {faq.faqName}
                  </Typography>
                  {/* You can add more content here if your FAQ has additional fields */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: 'italic' }}
                  >
                    FAQ ID: {faq._id}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            No FAQs available at the moment
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ViewFAQ;