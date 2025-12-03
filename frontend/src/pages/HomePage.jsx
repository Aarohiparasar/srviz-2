// src/pages/HomePage.jsx
import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Event, Flight, Hotel, BeachAccess } from '@mui/icons-material';

const features = [
  {
    icon: <Flight fontSize="large" color="primary" />,
    title: 'Amazing Destinations',
    description: 'Discover the most beautiful places around the world with our curated travel packages.'
  },
  {
    icon: <Hotel fontSize="large" color="primary" />,
    title: 'Best Accommodations',
    description: 'Stay in top-rated hotels and resorts that match your preferences and budget.'
  },
  {
    icon: <BeachAccess fontSize="large" color="primary" />,
    title: 'Unforgettable Experiences',
    description: 'Create lasting memories with our handpicked activities and tours.'
  }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 12,
          textAlign: 'center',
          mb: 8,
          backgroundImage: 'linear-gradient(rgba(14, 165, 233, 0.9), rgba(2, 132, 199, 0.9)), url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Your Dream Vacation Awaits
          </Typography>
          <Typography variant="h5" component="p" paragraph>
            Discover amazing destinations and create unforgettable memories with TravelEase
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/events')}
            sx={{ mt: 3, px: 4, py: 1.5 }}
          >
            Explore Events
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Events Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Popular Events
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" paragraph>
            Check out our most popular travel events
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/images/event-${item}.jpg`}
                    alt={`Event ${item}`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                      Amazing Destination {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Experience the beauty of this amazing destination with our exclusive travel package.
                    </Typography>
                    <Button 
                      size="small" 
                      color="primary"
                      onClick={() => navigate(`/events/event-${item}`)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => navigate('/events')}
            >
              View All Events
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready for Your Next Adventure?
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Join thousands of travelers who have already experienced the best trips of their lives.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          color="primary"
          onClick={() => navigate('/events')}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;