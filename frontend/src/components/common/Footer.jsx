import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Link, Typography, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box mb={2}>
              <Typography variant="h6" color="primary" fontWeight="bold">
                TravelEase
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Making travel planning simple and enjoyable. Find the best travel packages and create unforgettable memories with us.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit">
                <Twitter />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link component={RouterLink} to="/about" color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link component={RouterLink} to="/careers" color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                Careers
              </Link>
              <Link component={RouterLink} to="/blog" color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                Blog
              </Link>
              <Link component={RouterLink} to="/contact" color="text.secondary" variant="body2">
                Contact
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="#" color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                Help Center
              </Link>
              <Link href="#" color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                Safety Information
              </Link>
              <Link href="#" color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                Cancellation Options
              </Link>
              <Link href="#" color="text.secondary" variant="body2">
                Report Issue
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Get the latest news and offers delivered to your inbox.
            </Typography>
            <Box component="form" sx={{ display: 'flex', gap: 1 }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#0ea5e9',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} TravelEase. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="text.secondary" variant="body2">
              Privacy
            </Link>
            <Link href="#" color="text.secondary" variant="body2">
              Terms
            </Link>
            <Link href="#" color="text.secondary" variant="body2">
              Sitemap
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
