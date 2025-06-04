import React, { useState, useEffect } from 'react';
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
  Avatar,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for doctors - used as fallback if API fails
const mockDoctors = [
  { id: 1, name: 'Dr. John Smith', specialty: 'General Veterinarian', hospital: 'Central Pet Hospital', phone: '555-1234', email: 'john.smith@pethospital.com' },
  { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', hospital: 'North Animal Clinic', phone: '555-5678', email: 'sarah.johnson@pethospital.com' },
  { id: 3, name: 'Dr. Michael Brown', specialty: 'Orthopedic Surgeon', hospital: 'South Pet Care', phone: '555-9012', email: 'michael.brown@pethospital.com' },
];

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    hospital: '',
    phone: '',
    email: ''
  });

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/doctors');
        
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        
        const data = await response.json();
        
        // Transform data to match frontend structure if needed
        const formattedDoctors = data.map(doctor => ({
          id: doctor.id,
          name: `${doctor.firstName} ${doctor.lastName}`,
          specialty: doctor.specialization,
          hospital: doctor.hospitalId, // Ideally you'd fetch hospital names
          phone: doctor.phone,
          email: doctor.email
        }));
        
        setDoctors(formattedDoctors);
        setError(null);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to load doctors. Please try again later.');
        // If API fails, use mock data as fallback
        setDoctors(mockDoctors);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);

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

  const handleSubmit = async () => {
    try {
      // Split the name into first and last name
      const nameParts = newDoctor.name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      
      // Prepare the doctor data according to the backend API requirements
      const doctorData = {
        firstName: firstName,
        lastName: lastName,
        specialization: newDoctor.specialty,
        hospitalId: newDoctor.hospital, // You might need to adjust this if hospital is not an ID
        email: newDoctor.email,
        phone: newDoctor.phone,
        licenseNumber: 'TBD' // This is required by your API but not in your form
      };
      
      // Make API call to create doctor
      const response = await fetch('/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create doctor');
      }
      
      const createdDoctor = await response.json();
      
      // Format the response to match your frontend data structure
      const doctor = {
        id: createdDoctor.id,
        name: `${createdDoctor.firstName} ${createdDoctor.lastName}`,
        specialty: createdDoctor.specialization,
        hospital: createdDoctor.hospitalId, // You might need to fetch hospital name
        phone: createdDoctor.phone,
        email: createdDoctor.email
      };
      
      // Update local state
      setDoctors([...doctors, doctor]);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Doctor added successfully!',
        severity: 'success'
      });
      
      // Reset form
      setNewDoctor({
        name: '',
        specialty: '',
        hospital: '',
        phone: '',
        email: ''
      });
      handleClose();
      
    } catch (error) {
      console.error('Error creating doctor:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add doctor. Please try again.',
        severity: 'error'
      });
    }
  };

  // Function to get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleSnackbarClose = () => {
    setSnackbar({...snackbar, open: false});
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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : (
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
      )}

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

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Doctors;
