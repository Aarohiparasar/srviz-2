import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Box, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  LocalOffer as LocalOfferIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const QuoteSuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Handle case where state is not available
  if (!state) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          Quote information not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  // Destructure the response data
  const { quoteId, pricing, leadStatus } = state;
  const { basePrice, adjustments = {}, finalPrice } = pricing || {};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getAdjustmentLabel = (key) => {
    const labels = {
      seasonal: 'Seasonal Surcharge',
      earlyBird: 'Early Bird Discount',
      lastMinute: 'Last Minute Surcharge',
      group: 'Group Discount',
      weekend: 'Weekend Surcharge'
    };
    return labels[key] || key;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Your Quote is Ready!
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Quote ID: <strong>#{quoteId}</strong>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={4}>
          {/* Pricing Summary */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalOfferIcon color="primary" sx={{ mr: 1 }} />
                  Quote Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List disablePadding>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Base Price" 
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                    <Typography variant="body1" fontWeight="medium">
                      {formatCurrency(basePrice)}
                    </Typography>
                  </ListItem>

                  {Object.entries(adjustments).map(([key, value]) => (
                    value !== 0 && (
                      <ListItem key={key} sx={{ px: 0, pl: 2 }}>
                        <ListItemText 
                          primary={getAdjustmentLabel(key)}
                          primaryTypographyProps={{ 
                            variant: 'body2',
                            color: value < 0 ? 'success.main' : 'text.primary'
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          color={value < 0 ? 'success.main' : 'error.main'}
                          fontWeight="medium"
                        >
                          {value < 0 ? '' : '+'}{formatCurrency(value)}
                        </Typography>
                      </ListItem>
                    )
                  ))}

                  <Divider sx={{ my: 2 }} />

                  <ListItem sx={{ px: 0 }}>
                    <ListItemText 
                      primary="Total Price" 
                      primaryTypographyProps={{ 
                        variant: 'h6',
                        fontWeight: 'bold'
                      }}
                    />
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {formatCurrency(finalPrice)}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Status Card */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Booking Status
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip 
                    label={leadStatus} 
                    color="primary"
                    variant="outlined"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Your quote is valid for 7 days
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => window.print()}
            startIcon={<LocalOfferIcon />}
            size="large"
          >
            Print Quote
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            startIcon={<ArrowBackIcon />}
            size="large"
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuoteSuccessPage;