import React from "react";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    image: string;
    price: number;
    totalPrice: number;
    quantity: number;
  };
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: "20px",
        padding: 2,
        textAlign: "center",
        boxShadow: 3,
        transition: "transform 0.2s",
        backgroundColor: "#fff",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: "100px",
          objectFit: "contain",
          marginBottom: 2,
        }}
        image={item.image}
      />
      <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
        {item.title}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        Price: <strong>${item.price?.toFixed(2)}</strong>
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        Total Price: <strong>${item.totalPrice?.toFixed(2)}</strong>
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 1,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={() => onDecrease(item.id)}
          disabled={item.quantity <= 1}
          sx={{
            minWidth: 0,
            padding: "6px",
            marginRight: 1,
            borderColor: "#888",
          }}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <Typography variant="body2" sx={{ fontWeight: "bold", marginX: 1 }}>
          {item.quantity}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => onIncrease(item.id)}
          sx={{ minWidth: 0, padding: "6px", borderColor: "#888" }}
        >
          <AddIcon fontSize="small" />
        </Button>
      </Box>
      <Button
        variant="contained"
        color="error"
        onClick={() => onRemove(item.id)}
        sx={{ bgcolor: "#f44336", marginTop: 1 }}
      >
        Remove
      </Button>
    </Box>
  );
};

export default CartItem;
