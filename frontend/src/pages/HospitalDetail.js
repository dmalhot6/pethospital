import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { useParams } from 'react-router-dom';

// Mock data for hospital details
const mockHospital = {
  id: 1,
  name: 'Central Pet Hospital',
  address: '123 Main St, City, State 12345',
  phone: '(555) 123-4567',
  email: 'info@centralpethospital.com',
  website: 'www.centralpethospital.com',
  hours: 'Mon-Fri: 8am-6pm, Sat: 9am-4pm, Sun: Closed',
  specialties: ['General Care', 'Surgery', 'Dental', 'Emergency Services'],
  description: 'Central Pet Hospital is a full-service animal hospital that offers comprehensive medical services for pets. Our professional and courteous staff seeks to provide the best possible medical care, surgical care and dental care for our patients.',
  doctors: [
    { id: 1, name: 'Dr. John Smith', specialty: 'General Veterinarian', image: null },
    { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Surgeon', image: null }
  ],
  services: [
    { name: 'Wellness Exams', price: '$50-$75' },
    { name: 'Vaccinations', price: '$25-$45 each' },
    { name: 'Dental Cleaning', price: '$200-$400' },
    { name: 'Spay/Neuter', price: '$200-$500' },
    { name: 'X-Rays', price: '$150-$250' },
    { name: 'Emergency Care', price: 'Starting at $100' }
  ]
};

const HospitalDetail = () => {
  const { id } = useParams();
  // In a real app, you would fetch the hospital data based on the ID
  const hospital = mockHospital;

  // Function to get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {hospital.name}
      </Typography>

      <Grid container spacing={3}>
        {/* Hospital Info */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Hospital Information</Typography>
            <Typography variant="body1" paragraph>
              {hospital.description}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Address:</Typography>
                <Typography variant="body2" paragraph>{hospital.address}</Typography>
                
                <Typography variant="subtitle2">Phone:</Typography>
                <Typography variant="body2" paragraph>{hospital.phone}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Email:</Typography>
                <Typography variant="body2" paragraph>{hospital.email}</Typography>
                
                <Typography variant="subtitle2">Website:</Typography>
                <Typography variant="body2" paragraph>{hospital.website}</Typography>
              </Grid>
            </Grid>
            
            <Typography variant="subtitle2">Hours:</Typography>
            <Typography variant="body2" paragraph>{hospital.hours}</Typography>
            
            <Typography variant="subtitle2">Specialties:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {hospital.specialties.map((specialty, index) => (
                <Typography key={index} variant="body2" sx={{ 
                  bgcolor: 'primary.light', 
                  color: 'white', 
                  px: 1, 
                  py: 0.5, 
                  borderRadius: 1 
                }}>
                  {specialty}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained" color="primary">Schedule Visit</Button>
                <Button variant="outlined">Contact Hospital</Button>
                <Button variant="outlined">Get Directions</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Doctors */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Doctors</Typography>
            <List>
              {hospital.doctors.map((doctor) => (
                <ListItem key={doctor.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {getInitials(doctor.name)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={doctor.name}
                    secondary={doctor.specialty}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Services */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Services & Pricing</Typography>
            <List>
              {hospital.services.map((service, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={service.name}
                      secondary={service.price}
                    />
                  </ListItem>
                  {index < hospital.services.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalDetail;
