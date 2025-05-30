import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for visits
const mockVisits = [
  { 
    id: 1, 
    petName: 'Max', 
    petId: 1,
    ownerName: 'John Doe',
    doctorName: 'Dr. John Smith', 
    doctorId: 1,
    hospital: 'Central Pet Hospital',
    hospitalId: 1,
    date: '2023-07-15',
    reason: 'Annual Checkup',
    status: 'Completed',
    notes: 'Pet is healthy, vaccinations updated.'
  },
  { 
    id: 2, 
    petName: 'Bella', 
    petId: 2,
    ownerName: 'Jane Smith',
    doctorName: 'Dr. Sarah Johnson', 
    doctorId: 2,
    hospital: 'North Animal Clinic',
    hospitalId: 2,
    date: '2023-07-20',
    reason: 'Skin Condition',
    status: 'Scheduled',
    notes: ''
  },
  { 
    id: 3, 
    petName: 'Charlie', 
    petId: 3,
    ownerName: 'Mike Brown',
    doctorName: 'Dr. Michael Brown', 
    doctorId: 3,
    hospital: 'South Pet Care',
    hospitalId: 3,
    date: '2023-07-10',
    reason: 'Limping',
    status: 'Completed',
    notes: 'Minor sprain, prescribed rest and anti-inflammatory medication.'
  },
];

const Visits = () => {
  const [visits] = useState(mockVisits);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Scheduled':
        return 'primary';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Visits
        </Typography>
        <Button 
          component={Link}
          to="/visits/new"
          variant="contained" 
          color="primary"
        >
          Schedule Visit
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Pet</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visits.map((visit) => (
              <TableRow key={visit.id}>
                <TableCell>{visit.id}</TableCell>
                <TableCell>{visit.date}</TableCell>
                <TableCell>
                  <Link to={`/pets/${visit.petId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
                      {visit.petName}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="textSecondary">
                    Owner: {visit.ownerName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link to={`/doctors/${visit.doctorId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {visit.doctorName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/hospitals/${visit.hospitalId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {visit.hospital}
                  </Link>
                </TableCell>
                <TableCell>{visit.reason}</TableCell>
                <TableCell>
                  <Chip 
                    label={visit.status} 
                    color={getStatusColor(visit.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    component={Link} 
                    to={`/visits/${visit.id}`}
                    variant="outlined" 
                    size="small"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Visits;
