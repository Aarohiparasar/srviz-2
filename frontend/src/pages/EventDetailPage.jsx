import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Paper,
  Stack,
  Rating,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import {
  ArrowBack,
  LocationOn,
  CalendarToday,
  ConfirmationNumber,
  Star,
  StarBorder,
  EmojiEvents,
  Restaurant,
  LocalBar,
  Wifi,
  DirectionsBus,
  Hotel
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8]
  }
}));

const PriceTag = styled(Typography)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(0.5, 2),
  borderRadius: 20,
  display: 'inline-block',
  fontWeight: 'bold'
}));

const FeatureIcon = ({ type }) => {
  const icons = {
    meal: <Restaurant color="primary" />,
    drink: <LocalBar color="primary" />,
    wifi: <Wifi color="primary" />,
    transport: <DirectionsBus color="primary" />,
    hotel: <Hotel color="primary" />
  };
  return icons[type] || <Star color="primary" />;
};

const BookingForm = ({ open, onClose, eventId, packageId, packageTitle }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travellers: 2,
    eventId,
    packageId
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    // 1. Create the lead
    const leadResponse = await fetch(`${API_URL}/leads/createLead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        travellers: Number(formData.travellers),
        eventId,
        packageId
      }),
    });

    if (!leadResponse.ok) {
      const errorData = await leadResponse.json();
      throw new Error(errorData.message || 'Failed to create lead');
    }

    const leadData = await leadResponse.json();
    
    // 2. Generate quote using the created lead's ID
    const quoteResponse = await fetch(`${API_URL}/quotes/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        leadId: leadData.lead._id,
        packageId: packageId
      }),
    });

    if (!quoteResponse.ok) {
      const errorData = await quoteResponse.json();
      throw new Error(errorData.message || 'Failed to generate quote');
    }

    const quoteData = await quoteResponse.json();
    
    // 3. Navigate to success page with the quote data
    navigate('/quotes/success', { 
      state: {
        quoteId: quoteData.quoteId,
        pricing: quoteData.pricing,
        leadStatus: quoteData.leadStatus
      } 
    });

  } catch (err) {
    setError(err.message || 'Failed to process booking. Please try again.');
  } finally {
    setLoading(false);
  }
};
  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Book {packageTitle}</Typography>
          <IconButton edge="end" onClick={() => onClose(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="number"
                label="Number of Travellers"
                name="travellers"
                value={formData.travellers}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputProps={{ min: 1, max: 20 }}
              />
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => onClose(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ event: null, packages: [] });
  const [error, setError] = useState('');
  const [bookingDialog, setBookingDialog] = useState({
    open: false,
    packageId: null,
    packageTitle: ''
  });

  const handleBookNow = (packageId, packageTitle) => {
    setBookingDialog({
      open: true,
      packageId,
      packageTitle
    });
  };

  const handleCloseDialog = (success = false) => {
    setBookingDialog(prev => ({ ...prev, open: false }));
    if (success) {
      // Optionally show a success message or navigate to a confirmation page
      navigate('/bookings/success');
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/events/${eventId}/packages`);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load event details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  const { event, packages: eventPackages } = data;

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Event not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/events')}
          startIcon={<ArrowBack />}
        >
          Back to Events
        </Button>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const packageFeatures = [
    { type: 'meal', label: 'Meal Included' },
    { type: 'drink', label: 'Drinks' },
    { type: 'wifi', label: 'Free WiFi' },
    { type: 'transport', label: 'Transportation' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, textTransform: 'none' }}
      >
        Back to Events
      </Button>

      {/* Event Header */}
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Chip 
          label="Sports" 
          color="primary" 
          size="small" 
          sx={{ mb: 2 }} 
          icon={<EmojiEvents fontSize="small" />}
        />
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {event.title}
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Chip
            icon={<LocationOn />}
            label={event.location}
            variant="outlined"
            size="medium"
          />
          <Chip
            icon={<CalendarToday />}
            label={formatDate(event.date)}
            variant="outlined"
            size="medium"
          />
          <Chip
            icon={<ConfirmationNumber />}
            label={`${eventPackages.length} Packages Available`}
            variant="outlined"
            size="medium"
          />
        </Stack>

        <Typography variant="h6" color="text.secondary" paragraph>
          {event.description}
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
          <Rating
            value={4.5}
            precision={0.5}
            readOnly
            emptyIcon={<StarBorder fontSize="inherit" />}
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            4.5 (128 reviews)
          </Typography>
        </Box>
      </Paper>

      {/* Packages Section */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Available Packages
      </Typography>

      {eventPackages.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No packages available for this event.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {eventPackages.map((pkg) => (
            <Grid item xs={12} md={6} key={pkg._id}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {pkg.title}
                    </Typography>
                    <PriceTag variant="h6">
                      ${pkg.price.toLocaleString()}
                    </PriceTag>
                  </Box>

                  <Typography variant="body1" color="text.secondary" paragraph>
                    {pkg.description}
                  </Typography>

                  <Box sx={{ my: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      INCLUDED IN THIS PACKAGE:
                    </Typography>
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      {packageFeatures.map((feature, index) => (
                        <Grid item key={index}>
                          <Chip
                            icon={<FeatureIcon type={feature.type} />}
                            label={feature.label}
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={() => handleBookNow(pkg._id, pkg.title)}
                      sx={{ py: 1.5, fontWeight: 'bold' }}
                    >
                      Book Now
                    </Button>
                    <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={1}>
                      Free cancellation up to 30 days before the event
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Event Highlights */}
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Event Highlights
        </Typography>
        <Grid container spacing={3}>
          {[
            'Exclusive access to the stadium',
            'Pre-match entertainment',
            'Commemorative gift',
            'Dedicated event staff',
            'Food and beverage options available'
          ].map((highlight, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box display="flex" alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24, mr: 2, mt: 0.5 }}>
                  <Star sx={{ fontSize: 16 }} />
                </Avatar>
                <Typography>{highlight}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ px: 4, py: 1.5 }}
        >
          Back to All Events
        </Button>
      </Box>

      <BookingForm
        open={bookingDialog.open}
        onClose={handleCloseDialog}
        eventId={eventId}
        packageId={bookingDialog.packageId}
        packageTitle={bookingDialog.packageTitle}
      />
    </Container>
  );
};

export default EventDetailPage;