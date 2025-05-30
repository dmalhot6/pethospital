import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { useParams } from 'react-router-dom';

// Mock data for doctor details
const mockDoctor = {
  id: 1,
  name: 'Dr. John Smith',
  specialty: 'General Veterinarian',
  hospital: 'Central Pet Hospital',
  hospitalId: 1,
  phone: '(555) 123-4567',
  email: 'john.smith@pethospital.com',
  education: 'DVM, University of Veterinary Medicine, 2010',
  experience: '12 years',
  bio: 'Dr. John Smith is a dedicated veterinarian with over 12 years of experience in small animal medicine. He specializes in preventive care, internal medicine, and soft tissue surgery. Dr. Smith is known for his compassionate approach to pet care and his ability to connect with both pets and their owners.',
  certifications: [
    'American Veterinary Medical Association (AVMA)',
    'State Veterinary Medical Association',
    'American Animal Hospital Association (AAHA)'
  ],
  schedule: [
    { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
    { day: 'Saturday', hours: 'Off' },
    { day: 'Sunday', hours: 'Off' }
  ],
  specialInterests: [
    'Preventive Care',
    'Internal Medicine',
    'Soft Tissue Surgery',
    'Geriatric Pet Care'
  ]
};

const DoctorDetail = () => {
  const { id } = useParams();
  // In a real app, you would fetch the doctor data based on the ID
  const doctor = mockDoctor;

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
      <Grid container spacing={3}>
        {/* Doctor Profile */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                width: 150, 
                height: 150, 
                fontSize: '3rem',
                bgcolor: 'primary.main',
                mb: 2
              }}
            >
              {getInitials(doctor.name)}
            </Avatar>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              {doctor.name}
            </Typography>
            <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
              {doctor.specialty}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              {doctor.hospital}
            </Typography>
            
            <Box sx={{ mt: 2, width: '100%' }}>
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
                Schedule Appointment
              </Button>
              <Button variant="outlined" fullWidth>
                Contact
              </Button>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Contact Information</Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {doctor.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {doctor.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Hospital:</strong> {doctor.hospital}
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Schedule</Typography>
            <List dense>
              {doctor.schedule.map((item, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={item.day}
                    secondary={item.hours}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Doctor Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>About</Typography>
            <Typography variant="body1" paragraph>
              {doctor.bio}
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Education:</Typography>
                <Typography variant="body2" paragraph>{doctor.education}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Experience:</Typography>
                <Typography variant="body2" paragraph>{doctor.experience}</Typography>
              </Grid>
            </Grid>
          </Paper>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Specializations</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {doctor.specialInterests.map((interest, index) => (
                <Chip 
                  key={index} 
                  label={interest} 
                  color="primary" 
                  variant="outlined" 
                />
              ))}
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Certifications</Typography>
            <List>
              {doctor.certifications.map((cert, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={cert} />
                  </ListItem>
                  {index < doctor.certifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDetail;
