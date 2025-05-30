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
  DialogTitle,
  Avatar
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for doctors
const mockDoctors = [
  { id: 1, name: 'Dr. John Smith', specialty: 'General Veterinarian', hospital: 'Central Pet Hospital', phone: '555-1234', email: 'john.smith@pethospital.com' },
  { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', hospital: 'North Animal Clinic', phone: '555-5678', email: 'sarah.johnson@pethospital.com' },
  { id: 3, name: 'Dr. Michael Brown', specialty: 'Orthopedic Surgeon', hospital: 'South Pet Care', phone: '555-9012', email: 'michael.brown@pethospital.com' },
];

const Doctors = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [open, setOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    hospital: '',
    phone: '',
    email: ''
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({
      ...newDoctor,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const doctor = {
      ...newDoctor,
      id: doctors.length + 1
    };
    setDoctors([...doctors, doctor]);
    setNewDoctor({
      name: '',
      specialty: '',
      hospital: '',
      phone: '',
      email: ''
    });
    handleClose();
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Doctors
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleOpen}
        >
          Add Doctor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Hospital</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {getInitials(doctor.name)}
                    </Avatar>
                    {doctor.name}
                  </Box>
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.hospital}</TableCell>
                <TableCell>
                  <Typography variant="body2">{doctor.phone}</Typography>
                  <Typography variant="body2" color="textSecondary">{doctor.email}</Typography>
                </TableCell>
                <TableCell>
                  <Button 
                    component={Link} 
                    to={`/doctors/${doctor.id}`}
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
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Doctor Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newDoctor.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="specialty"
            label="Specialty"
            type="text"
            fullWidth
            variant="outlined"
            value={newDoctor.specialty}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="hospital"
            label="Hospital"
            type="text"
            fullWidth
            variant="outlined"
            value={newDoctor.hospital}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={newDoctor.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newDoctor.email}
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

export default Doctors;
