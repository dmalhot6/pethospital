import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';

// Mock data for visit details
const mockVisit = {
  id: 1,
  petId: 1,
  petName: 'Max',
  petSpecies: 'Dog',
  petBreed: 'Golden Retriever',
  ownerId: 1,
  ownerName: 'John Doe',
  ownerPhone: '(555) 123-4567',
  doctorId: 1,
  doctorName: 'Dr. John Smith',
  hospitalId: 1,
  hospitalName: 'Central Pet Hospital',
  date: '2023-07-15',
  time: '10:30 AM',
  reason: 'Annual Checkup',
  status: 'Completed',
  notes: 'Pet is healthy, vaccinations updated.',
  diagnosis: 'Healthy pet with no significant issues.',
  treatment: 'Administered routine vaccinations.',
  medications: [
    {
      name: 'Rabies Vaccine',
      dosage: 'Standard dose',
      instructions: 'Administered in clinic',
      startDate: '2023-07-15',
      endDate: '2023-07-15'
    },
    {
      name: 'DHPP Vaccine',
      dosage: 'Standard dose',
      instructions: 'Administered in clinic',
      startDate: '2023-07-15',
      endDate: '2023-07-15'
    }
  ],
  followUpDate: '2024-07-15',
  vitals: {
    weight: '65 lbs',
    temperature: '101.5°F',
    heartRate: '80 bpm',
    respiratoryRate: '22 breaths/min',
    bloodPressure: 'Normal'
  },
  invoiceId: 'INV-2023-001',
  invoiceAmount: 150.00,
  invoiceStatus: 'Paid'
};

const VisitDetail = () => {
  const { id } = useParams();
  // In a real app, you would fetch the visit data based on the ID
  const visit = mockVisit;

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Scheduled':
        return 'primary';
      case 'Cancelled':
        return 'error';
      case 'No-Show':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Visit Details
        </Typography>
        <Box>
          <Button 
            component={Link}
            to={`/visits/${visit.id}/edit`}
            variant="outlined" 
            sx={{ mr: 1 }}
          >
            Edit Visit
          </Button>
          <Button 
            variant="contained" 
            color="primary"
          >
            Schedule Follow-up
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Visit Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Visit Summary</Typography>
            
            <Box sx={{ mb: 2 }}>
              <Chip 
                label={visit.status} 
                color={getStatusColor(visit.status)} 
                sx={{ mb: 2 }}
              />
            </Box>
            
            <Typography variant="subtitle2">Date & Time:</Typography>
            <Typography variant="body1" paragraph>
              {visit.date} at {visit.time}
            </Typography>
            
            <Typography variant="subtitle2">Reason for Visit:</Typography>
            <Typography variant="body1" paragraph>
              {visit.reason}
            </Typography>
            
            <Typography variant="subtitle2">Hospital:</Typography>
            <Typography variant="body1" paragraph>
              <Link to={`/hospitals/${visit.hospitalId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {visit.hospitalName}
              </Link>
            </Typography>
            
            <Typography variant="subtitle2">Doctor:</Typography>
            <Typography variant="body1" paragraph>
              <Link to={`/doctors/${visit.doctorId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {visit.doctorName}
              </Link>
            </Typography>
            
            {visit.followUpDate && (
              <>
                <Typography variant="subtitle2">Follow-up Date:</Typography>
                <Typography variant="body1" paragraph>
                  {visit.followUpDate}
                </Typography>
              </>
            )}
          </Paper>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Pet Information</Typography>
            
            <Typography variant="subtitle2">Pet:</Typography>
            <Typography variant="body1" paragraph>
              <Link to={`/pets/${visit.petId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {visit.petName}
              </Link> ({visit.petSpecies}, {visit.petBreed})
            </Typography>
            
            <Typography variant="subtitle2">Owner:</Typography>
            <Typography variant="body1" paragraph>
              {visit.ownerName}
            </Typography>
            
            <Typography variant="subtitle2">Contact:</Typography>
            <Typography variant="body1" paragraph>
              {visit.ownerPhone}
            </Typography>
          </Paper>
          
          {visit.invoiceId && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Billing Information</Typography>
              
              <Typography variant="subtitle2">Invoice:</Typography>
              <Typography variant="body1" paragraph>
                <Link to={`/billing/${visit.invoiceId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {visit.invoiceId}
                </Link>
              </Typography>
              
              <Typography variant="subtitle2">Amount:</Typography>
              <Typography variant="body1" paragraph>
                ${visit.invoiceAmount.toFixed(2)}
              </Typography>
              
              <Typography variant="subtitle2">Status:</Typography>
              <Chip 
                label={visit.invoiceStatus} 
                color={visit.invoiceStatus === 'Paid' ? 'success' : 'warning'} 
                size="small" 
              />
            </Paper>
          )}
        </Grid>

        {/* Visit Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Medical Notes</Typography>
            
            {visit.diagnosis && (
              <>
                <Typography variant="subtitle2">Diagnosis:</Typography>
                <Typography variant="body1" paragraph>
                  {visit.diagnosis}
                </Typography>
              </>
            )}
            
            {visit.treatment && (
              <>
                <Typography variant="subtitle2">Treatment:</Typography>
                <Typography variant="body1" paragraph>
                  {visit.treatment}
                </Typography>
              </>
            )}
            
            {visit.notes && (
              <>
                <Typography variant="subtitle2">Additional Notes:</Typography>
                <Typography variant="body1" paragraph>
                  {visit.notes}
                </Typography>
              </>
            )}
          </Paper>
          
          {visit.medications && visit.medications.length > 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Medications</Typography>
              
              <List>
                {visit.medications.map((medication, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={medication.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              Dosage: {medication.dosage}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Instructions: {medication.instructions}
                            </Typography>
                            {medication.startDate && (
                              <>
                                <br />
                                <Typography component="span" variant="body2">
                                  Date: {medication.startDate}
                                </Typography>
                              </>
                            )}
                          </>
                        }
                      />
                    </ListItem>
                    {index < visit.medications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )}
          
          {visit.vitals && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Vital Signs</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Weight
                      </Typography>
                      <Typography variant="h6">
                        {visit.vitals.weight}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Temperature
                      </Typography>
                      <Typography variant="h6">
                        {visit.vitals.temperature}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Heart Rate
                      </Typography>
                      <Typography variant="h6">
                        {visit.vitals.heartRate}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Respiratory Rate
                      </Typography>
                      <Typography variant="h6">
                        {visit.vitals.respiratoryRate}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Blood Pressure
                      </Typography>
                      <Typography variant="h6">
                        {visit.vitals.bloodPressure}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisitDetail;
