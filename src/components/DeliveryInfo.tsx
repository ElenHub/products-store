import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button
} from "@mui/material";

interface DeliveryInfoProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  contact: string;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  onCheckout: () => void;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ name, setName, address, setAddress, contact, setContact, onCheckout }) => (
  <Box sx={{ marginTop: 4, backgroundColor: '#f8f8f8', padding: 3, borderRadius: 2, boxShadow: 1 }}>
    <Typography variant="h5" gutterBottom>
      Delivery Information
    </Typography>
    <TextField
      fullWidth
      label="Name"
      variant="outlined"
      value={name}
      onChange={(e) => setName(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
    <TextField
      fullWidth
      label="Address"
      variant="outlined"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
    <TextField
      fullWidth
      label="Contact Number"
      variant="outlined"
      value={contact}
      onChange={(e) => setContact(e.target.value)}
      sx={{ marginBottom: 2 }}
    />
    <Button variant="contained" color="primary" onClick={onCheckout} sx={{ marginTop: 2 }}>
      Proceed to Payment
    </Button>
  </Box>
);

export default DeliveryInfo;