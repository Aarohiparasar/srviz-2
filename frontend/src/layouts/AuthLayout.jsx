import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[50],
}));

const AuthCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  padding: theme.spacing(4, 3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6, 5),
  },
}));

const AuthLayout = () => {
  return (
    <AuthContainer>
      <Box mb={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          TravelEase
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Plan your perfect trip with us
        </Typography>
      </Box>
      <AuthCard>
        <Outlet />
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthLayout;
