import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
  expiryDate: string;
  setExpiryDate: React.Dispatch<React.SetStateAction<string>>;
  cvv: string;
  setCvv: React.Dispatch<React.SetStateAction<string>>;
  onPay: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  onPay,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: "400px",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Payment Information
        </Typography>
        <TextField
          fullWidth
          label="Card Number"
          variant="outlined"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Expiry Date (MM/YY)"
          variant="outlined"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="CVV"
          variant="outlined"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onPay}
          sx={{ marginTop: 2 }}
        >
          Pay
        </Button>
      </Box>
    </Fade>
  </Modal>
);

export default PaymentModal;
