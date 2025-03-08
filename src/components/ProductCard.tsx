import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/types";
import { truncateText } from "../utils/truncateText";
import { useAppDispatch } from "../hooks";
import {
  toggleLike,
  deleteProductThunk,
  addToCart,
} from "../features/productSlice";
import ConfirmationDialog from './ConfiramtionDialog'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleOpenConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteProductThunk(product.id));
    setOpenConfirmDelete(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    navigate(`/cart`);
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          borderRadius: "15px",
          boxShadow: 3,
          '&:hover': {
            transition: 'transform 0.2s ease-in-out',
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "261px",
            objectFit: "contain",
            marginBottom: "18px",
          }}
          image={product.image}
        />
        <CardContent sx={{ flexGrow: 1}}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", color: "#333" }}>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truncateText(product.description, 100)}
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ fontWeight: "bold", marginTop: "10px" }}
          >
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ justifyContent: "space-between", marginBottom: "12px" }}
        >
          <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
            {product.isLiked ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton aria-label="delete" onClick={handleOpenConfirmDelete}>
            <DeleteIcon color="error" />
          </IconButton>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddToCart}
            sx={{ borderRadius: "20px",     display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: '6px',  }}
          >
             <ShoppingCartIcon /> 
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
            sx={{ borderRadius: "20px" }}
          >
            Edit
          </Button>
        </CardActions>
      </Card>

      <ConfirmationDialog
        open={openConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onConfirm={handleDeleteConfirmed}
        title="Delete Product"
        content="Are you sure you want to delete this product? This action cannot be undone."
      />
    </>
  );
};

export default ProductCard;


