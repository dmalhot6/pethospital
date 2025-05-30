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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for hospitals
const mockHospitals = [
  { id: 1, name: 'Central Pet Hospital', address: '123 Main St, City', phone: '555-1234', specialties: 'General Care, Surgery' },
  { id: 2, name: 'North Animal Clinic', address: '456 Oak Ave, Town', phone: '555-5678', specialties: 'Cardiology, Dermatology' },
  { id: 3, name: 'South Pet Care', address: '789 Pine Rd, Village', phone: '555-9012', specialties: 'Orthopedics, Neurology' },
];

const Hospitals = () => {
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [open, setOpen] = useState(false);
  const [newHospital, setNewHospital] = useState({
    name: '',
    address: '',
    phone: '',
    specialties: ''
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHospital({
      ...newHospital,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const hospital = {
      ...newHospital,
      id: hospitals.length + 1
    };
    setHospitals([...hospitals, hospital]);
    setNewHospital({
      name: '',
      address: '',
      phone: '',
      specialties: ''
    });
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hospitals
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleOpen}
        >
          Add Hospital
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Specialties</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>{hospital.id}</TableCell>
                <TableCell>{hospital.name}</TableCell>
                <TableCell>{hospital.address}</TableCell>
                <TableCell>{hospital.phone}</TableCell>
                <TableCell>{hospital.specialties}</TableCell>
                <TableCell>
                  <Button 
                    component={Link} 
                    to={`/hospitals/${hospital.id}`}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Hospital</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Hospital Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newHospital.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={newHospital.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={newHospital.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="specialties"
            label="Specialties"
            type="text"
            fullWidth
            variant="outlined"
            value={newHospital.specialties}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Hospitals;
