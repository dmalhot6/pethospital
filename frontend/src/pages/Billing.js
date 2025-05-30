import React from 'react';
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
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for billing
const mockBillings = [
  { 
    id: 1, 
    invoiceNumber: 'INV-2023-001',
    petName: 'Max', 
    petId: 1,
    ownerName: 'John Doe',
    visitId: 1,
    date: '2023-07-15',
    amount: 150.00,
    status: 'Paid',
    paymentMethod: 'Credit Card'
  },
  { 
    id: 2, 
    invoiceNumber: 'INV-2023-002',
    petName: 'Bella', 
    petId: 2,
    ownerName: 'Jane Smith',
    visitId: 2,
    date: '2023-07-20',
    amount: 200.00,
    status: 'Pending',
    paymentMethod: ''
  },
  { 
    id: 3, 
    invoiceNumber: 'INV-2023-003',
    petName: 'Charlie', 
    petId: 3,
    ownerName: 'Mike Brown',
    visitId: 3,
    date: '2023-07-10',
    amount: 175.50,
    status: 'Paid',
    paymentMethod: 'Insurance'
  },
];

// Summary data
const summaryData = {
  totalInvoices: mockBillings.length,
  totalAmount: mockBillings.reduce((sum, bill) => sum + bill.amount, 0),
  paidAmount: mockBillings.filter(bill => bill.status === 'Paid').reduce((sum, bill) => sum + bill.amount, 0),
  pendingAmount: mockBillings.filter(bill => bill.status === 'Pending').reduce((sum, bill) => sum + bill.amount, 0)
};

const Billing = () => {
  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Billing
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Invoices
              </Typography>
              <Typography variant="h5" component="div">
                {summaryData.totalInvoices}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Amount
              </Typography>
              <Typography variant="h5" component="div">
                ${summaryData.totalAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Paid Amount
              </Typography>
              <Typography variant="h5" component="div" color="success.main">
                ${summaryData.paidAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Amount
              </Typography>
              <Typography variant="h5" component="div" color="warning.main">
                ${summaryData.pendingAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Invoices
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
        >
          Create Invoice
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice #</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Pet/Owner</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockBillings.map((billing) => (
              <TableRow key={billing.id}>
                <TableCell>{billing.invoiceNumber}</TableCell>
                <TableCell>{billing.date}</TableCell>
                <TableCell>
                  <Link to={`/pets/${billing.petId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'medium' }}>
                      {billing.petName}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="textSecondary">
                    Owner: {billing.ownerName}
                  </Typography>
                </TableCell>
                <TableCell>${billing.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip 
                    label={billing.status} 
                    color={getStatusColor(billing.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{billing.paymentMethod || '-'}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  {billing.status === 'Pending' && (
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="small"
                    >
                      Pay
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Billing;
