import React, { useState } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../features/productSlice";
import CartItem from "./CartItem";
import DeliveryInfo from "./DeliveryInfo";
import PaymentModal from "./PaymentModal";
import SnackbarAlert from "./SnackbarAlert";

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.products.cart) || [];
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(updateCartItemQuantity({ id, quantity: 1 }));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(updateCartItemQuantity({ id, quantity: -1 }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.totalPrice || 0),
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setSnackbarMessage("Your cart is empty. Please add items to your cart.");
      setSnackbarOpen(true);
      return;
    }

    if (!name || !address || !contact) {
      setSnackbarMessage("Please fill in all delivery fields.");
      setSnackbarOpen(true);
      return;
    }
    setPaymentModalOpen(true);
  };

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      setSnackbarMessage("Please fill in all payment fields.");
      setSnackbarOpen(true);
      return;
    }

    setSnackbarMessage(
      "Payment processed successfully! Thank you for your purchase!"
    );
    setSnackbarOpen(true);

    // Clear payment and delivery information after successful checkout
    setName("");
    setAddress("");
    setContact("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setPaymentModalOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ marginY: 4, padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom marginTop="40px">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Typography variant="h6" align="center">
            Your cart is empty
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <CartItem
                item={item}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveFromCart}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {cartItems.length > 0 && (
        <Typography variant="h5" align="right" sx={{ marginTop: 4 }}>
          Total Price for All Items: <strong>${totalPrice.toFixed(2)}</strong>
        </Typography>
      )}
      <DeliveryInfo
        name={name}
        setName={setName}
        address={address}
        setAddress={setAddress}
        contact={contact}
        setContact={setContact}
        onCheckout={handleCheckout}
      />
      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expiryDate={expiryDate}
        setExpiryDate={setExpiryDate}
        cvv={cvv}
        setCvv={setCvv}
        onPay={handlePayment}
      />
      <SnackbarAlert
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Cart;
