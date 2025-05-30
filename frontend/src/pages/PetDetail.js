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
  ListItemText,
  ListItemIcon,
  Tab,
  Tabs
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';

// Mock data for pet details
const mockPet = {
  id: 1,
  name: 'Max',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: 5,
  weight: '65 lbs',
  gender: 'Male',
  color: 'Golden',
  microchipId: '985121056478523',
  owner: {
    name: 'John Doe',
    phone: '(555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, City, State 12345'
  },
  medicalHistory: {
    allergies: ['Chicken', 'Certain antibiotics'],
    conditions: ['Mild hip dysplasia', 'Seasonal allergies'],
    medications: [
      { name: 'Apoquel', dosage: '16mg daily', startDate: '2023-01-15', endDate: 'Ongoing' },
      { name: 'Joint Supplement', dosage: '1 tablet daily', startDate: '2022-11-10', endDate: 'Ongoing' }
    ],
    vaccinations: [
      { name: 'Rabies', date: '2023-03-15', expiryDate: '2025-03-15' },
      { name: 'DHPP', date: '2023-03-15', expiryDate: '2024-03-15' },
      { name: 'Bordetella', date: '2023-01-10', expiryDate: '2024-01-10' },
      { name: 'Leptospirosis', date: '2023-03-15', expiryDate: '2024-03-15' }
    ]
  },
  visits: [
    { id: 1, date: '2023-07-15', reason: 'Annual Checkup', doctor: 'Dr. John Smith', hospital: 'Central Pet Hospital', notes: 'All vitals normal. Vaccinations updated.' },
    { id: 2, date: '2023-01-10', reason: 'Bordetella Vaccination', doctor: 'Dr. Sarah Johnson', hospital: 'Central Pet Hospital', notes: 'Vaccination administered without complications.' },
    { id: 3, date: '2022-12-05', reason: 'Limping', doctor: 'Dr. John Smith', hospital: 'Central Pet Hospital', notes: 'Mild sprain in right front paw. Prescribed rest and anti-inflammatory medication for 7 days.' }
  ],
  insurance: {
    provider: 'PetCare Insurance',
    policyNumber: 'POL-2023-001',
    plan: 'Premium',
    coverageAmount: 5000.00,
    startDate: '2023-01-15',
    endDate: '2024-01-14',
    status: 'Active'
  }
};

const PetDetail = () => {
  const { id } = useParams();
  // In a real app, you would fetch the pet data based on the ID
  const pet = mockPet;
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Function to calculate if a vaccination is expired or expiring soon
  const getVaccinationStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: 'Expired', color: 'error' };
    } else if (daysUntilExpiry < 30) {
      return { status: 'Expiring Soon', color: 'warning' };
    } else {
      return { status: 'Valid', color: 'success' };
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Pet Profile */}
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
              <PetsIcon sx={{ fontSize: 80 }} />
            </Avatar>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              {pet.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={pet.species} color="primary" />
              <Chip label={pet.breed} variant="outlined" />
            </Box>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Age</Typography>
                <Typography variant="body1">{pet.age} years</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Weight</Typography>
                <Typography variant="body1">{pet.weight}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Gender</Typography>
                <Typography variant="body1">{pet.gender}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Color</Typography>
                <Typography variant="body1">{pet.color}</Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2, width: '100%' }}>
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
                Schedule Visit
              </Button>
              <Button variant="outlined" fullWidth>
                Update Information
              </Button>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Owner Information</Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {pet.owner.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {pet.owner.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {pet.owner.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong> {pet.owner.address}
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Insurance</Typography>
            {pet.insurance ? (
              <>
                <Typography variant="body1" gutterBottom>
                  <strong>Provider:</strong> {pet.insurance.provider}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Policy:</strong> {pet.insurance.policyNumber}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Plan:</strong> {pet.insurance.plan}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Coverage:</strong> ${pet.insurance.coverageAmount.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Valid Until:</strong> {pet.insurance.endDate}
                </Typography>
                <Chip 
                  label={pet.insurance.status} 
                  color={pet.insurance.status === 'Active' ? 'success' : 'error'} 
                  size="small" 
                />
              </>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No insurance information available
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Pet Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="pet information tabs">
                <Tab label="Medical History" />
                <Tab label="Visits" />
                <Tab label="Vaccinations" />
              </Tabs>
            </Box>

            {/* Medical History Tab */}
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>Allergies</Typography>
                {pet.medicalHistory.allergies.length > 0 ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {pet.medicalHistory.allergies.map((allergy, index) => (
                      <Chip 
                        key={index} 
                        label={allergy} 
                        color="error" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1" color="textSecondary" paragraph>
                    No known allergies
                  </Typography>
                )}

                <Typography variant="h6" gutterBottom>Medical Conditions</Typography>
                {pet.medicalHistory.conditions.length > 0 ? (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {pet.medicalHistory.conditions.map((condition, index) => (
                      <Chip 
                        key={index} 
                        label={condition} 
                        color="primary" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1" color="textSecondary" paragraph>
                    No known medical conditions
                  </Typography>
                )}

                <Typography variant="h6" gutterBottom>Current Medications</Typography>
                {pet.medicalHistory.medications.length > 0 ? (
                  <List>
                    {pet.medicalHistory.medications.map((medication, index) => (
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
                                  Started: {medication.startDate}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2">
                                  End: {medication.endDate}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        {index < pet.medicalHistory.medications.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body1" color="textSecondary" paragraph>
                    No current medications
                  </Typography>
                )}
              </Box>
            )}

            {/* Visits Tab */}
            {tabValue === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button variant="contained" color="primary">
                    Schedule New Visit
                  </Button>
                </Box>
                
                {pet.visits.length > 0 ? (
                  pet.visits.map((visit, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="h6" gutterBottom>
                            {visit.reason}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {visit.date}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" gutterBottom>
                          <strong>Doctor:</strong> {visit.doctor}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Hospital:</strong> {visit.hospital}
                        </Typography>
                        
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>Notes:</Typography>
                        <Typography variant="body2" paragraph>
                          {visit.notes}
                        </Typography>
                        
                        <Button variant="outlined" size="small">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    No visit history available
                  </Typography>
                )}
              </Box>
            )}

            {/* Vaccinations Tab */}
            {tabValue === 2 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Button variant="contained" color="primary">
                    Add Vaccination
                  </Button>
                </Box>
                
                {pet.medicalHistory.vaccinations.length > 0 ? (
                  <List>
                    {pet.medicalHistory.vaccinations.map((vaccination, index) => {
                      const status = getVaccinationStatus(vaccination.expiryDate);
                      return (
                        <React.Fragment key={index}>
                          <ListItem>
                            <ListItemText
                              primary={vaccination.name}
                              secondary={
                                <>
                                  <Typography component="span" variant="body2">
                                    Date: {vaccination.date}
                                  </Typography>
                                  <br />
                                  <Typography component="span" variant="body2">
                                    Expires: {vaccination.expiryDate}
                                  </Typography>
                                </>
                              }
                            />
                            <Chip 
                              label={status.status} 
                              color={status.color} 
                              size="small" 
                            />
                          </ListItem>
                          {index < pet.medicalHistory.vaccinations.length - 1 && <Divider />}
                        </React.Fragment>
                      );
                    })}
                  </List>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    No vaccination records available
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PetDetail;
