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
  Chip,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for insurance policies
const mockInsurancePolicies = [
  { 
    id: 1, 
    policyNumber: 'POL-2023-001',
    petName: 'Max', 
    petId: 1,
    ownerName: 'John Doe',
    provider: 'PetCare Insurance',
    plan: 'Premium',
    startDate: '2023-01-15',
    endDate: '2024-01-14',
    coverageAmount: 5000.00,
    status: 'Active',
    monthlyPremium: 45.00
  },
  { 
    id: 2, 
    policyNumber: 'POL-2023-002',
    petName: 'Bella', 
    petId: 2,
    ownerName: 'Jane Smith',
    provider: 'Animal Health Insurance',
    plan: 'Basic',
    startDate: '2023-03-20',
    endDate: '2024-03-19',
    coverageAmount: 3000.00,
    status: 'Active',
    monthlyPremium: 30.00
  },
  { 
    id: 3, 
    policyNumber: 'POL-2022-003',
    petName: 'Charlie', 
    petId: 3,
    ownerName: 'Mike Brown',
    provider: 'PetCare Insurance',
    plan: 'Standard',
    startDate: '2022-07-10',
    endDate: '2023-07-09',
    coverageAmount: 4000.00,
    status: 'Expired',
    monthlyPremium: 35.00
  },
];

// Mock data for insurance providers
const insuranceProviders = [
  { id: 1, name: 'PetCare Insurance' },
  { id: 2, name: 'Animal Health Insurance' },
  { id: 3, name: 'VetGuard Insurance' },
  { id: 4, name: 'PawProtect' }
];

// Mock data for insurance plans
const insurancePlans = [
  { id: 1, name: 'Basic', provider: 'PetCare Insurance', coverageAmount: 3000, monthlyPremium: 30 },
  { id: 2, name: 'Standard', provider: 'PetCare Insurance', coverageAmount: 4000, monthlyPremium: 35 },
  { id: 3, name: 'Premium', provider: 'PetCare Insurance', coverageAmount: 5000, monthlyPremium: 45 },
  { id: 4, name: 'Basic', provider: 'Animal Health Insurance', coverageAmount: 3000, monthlyPremium: 30 },
  { id: 5, name: 'Premium', provider: 'Animal Health Insurance', coverageAmount: 5000, monthlyPremium: 40 },
  { id: 6, name: 'Standard', provider: 'VetGuard Insurance', coverageAmount: 4000, monthlyPremium: 38 },
  { id: 7, name: 'Premium', provider: 'VetGuard Insurance', coverageAmount: 6000, monthlyPremium: 50 },
  { id: 8, name: 'Basic', provider: 'PawProtect', coverageAmount: 2500, monthlyPremium: 25 },
  { id: 9, name: 'Premium', provider: 'PawProtect', coverageAmount: 5500, monthlyPremium: 48 }
];

const Insurance = () => {
  const [policies, setPolicies] = useState(mockInsurancePolicies);
  const [open, setOpen] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    petName: '',
    petId: '',
    ownerName: '',
    provider: '',
    plan: '',
    startDate: '',
    endDate: '',
    coverageAmount: 0,
    monthlyPremium: 0
  });
  const [selectedProvider, setSelectedProvider] = useState('');
  const [availablePlans, setAvailablePlans] = useState([]);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Expired':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProvider('');
    setAvailablePlans([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy({
      ...newPolicy,
      [name]: value
    });
  };

  const handleProviderChange = (e) => {
    const provider = e.target.value;
    setSelectedProvider(provider);
    setNewPolicy({
      ...newPolicy,
      provider: provider,
      plan: '',
      coverageAmount: 0,
      monthlyPremium: 0
    });
    
    // Filter plans for selected provider
    const filteredPlans = insurancePlans.filter(plan => plan.provider === provider);
    setAvailablePlans(filteredPlans);
  };

  const handlePlanChange = (e) => {
    const planName = e.target.value;
    const selectedPlan = insurancePlans.find(
      plan => plan.provider === selectedProvider && plan.name === planName
    );
    
    if (selectedPlan) {
      setNewPolicy({
        ...newPolicy,
        plan: planName,
        coverageAmount: selectedPlan.coverageAmount,
        monthlyPremium: selectedPlan.monthlyPremium
      });
    }
  };

  const handleSubmit = () => {
    // Calculate end date (1 year from start date)
    const startDate = new Date(newPolicy.startDate);
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);
    
    const policy = {
      ...newPolicy,
      id: policies.length + 1,
      policyNumber: `POL-${new Date().getFullYear()}-${(policies.length + 1).toString().padStart(3, '0')}`,
      endDate: endDate.toISOString().split('T')[0],
      status: 'Active'
    };
    
    setPolicies([...policies, policy]);
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Insurance Policies
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleOpen}
        >
          Add Policy
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Policy #</TableCell>
              <TableCell>Pet/Owner</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Coverage</TableCell>
              <TableCell>Premium</TableCell>
              <TableCell>Valid Until</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell>{policy.policyNumber}</TableCell>
                <TableCell>
                  <Link to={`/pets/${policy.petId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
                      {policy.petName}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="textSecondary">
                    Owner: {policy.ownerName}
                  </Typography>
                </TableCell>
                <TableCell>{policy.provider}</TableCell>
                <TableCell>{policy.plan}</TableCell>
                <TableCell>${policy.coverageAmount.toFixed(2)}</TableCell>
                <TableCell>${policy.monthlyPremium.toFixed(2)}/month</TableCell>
                <TableCell>{policy.endDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={policy.status} 
                    color={getStatusColor(policy.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Button 
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Insurance Policy</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
            <TextField
              name="petName"
              label="Pet Name"
              fullWidth
              value={newPolicy.petName}
              onChange={handleChange}
            />
            <TextField
              name="petId"
              label="Pet ID"
              fullWidth
              value={newPolicy.petId}
              onChange={handleChange}
            />
            <TextField
              name="ownerName"
              label="Owner Name"
              fullWidth
              value={newPolicy.ownerName}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Insurance Provider</InputLabel>
              <Select
                value={selectedProvider}
                onChange={handleProviderChange}
                label="Insurance Provider"
              >
                {insuranceProviders.map(provider => (
                  <MenuItem key={provider.id} value={provider.name}>
                    {provider.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth disabled={!selectedProvider}>
              <InputLabel>Plan</InputLabel>
              <Select
                value={newPolicy.plan}
                onChange={handlePlanChange}
                label="Plan"
              >
                {availablePlans.map(plan => (
                  <MenuItem key={plan.id} value={plan.name}>
                    {plan.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="startDate"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newPolicy.startDate}
              onChange={handleChange}
            />
            <TextField
              name="coverageAmount"
              label="Coverage Amount ($)"
              type="number"
              fullWidth
              value={newPolicy.coverageAmount}
              InputProps={{ readOnly: true }}
            />
            <TextField
              name="monthlyPremium"
              label="Monthly Premium ($)"
              type="number"
              fullWidth
              value={newPolicy.monthlyPremium}
              InputProps={{ readOnly: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={!newPolicy.petName || !newPolicy.ownerName || !newPolicy.provider || !newPolicy.plan || !newPolicy.startDate}
          >
            Add Policy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Insurance;
