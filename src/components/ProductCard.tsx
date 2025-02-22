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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/types";
import { truncateText } from "../utils/truncateText";
import { useAppDispatch } from "../hooks";
import { toggleLike, deleteProduct } from "../features/productSlice";
import ConfirmationDialog from "./ConfiramtionDialog";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  // Function to navigate to the product details page
  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  // Function to toggle the like status of a product
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  // Function to open the confirmation dialog for deleting a product
  const handleOpenConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenConfirmDelete(true);
  };

  // Function to close the confirmation dialog
  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  // Function to confirm the deletion of a product
  const handleDeleteConfirmed = () => {
    dispatch(deleteProduct(product.id));
    setOpenConfirmDelete(false);
  };

  // Function to navigate to the edit product page
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-product/${product.id}`);
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
        }}
      >
        <CardMedia component="img"   sx={{ width: "69%", margin: "0 auto", height: "261px", objectFit: "contain", marginBottom:"18px" }} image={product.image} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truncateText(product.description, 100)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: "space-between",    marginBottom: "12px",  }}>
          <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
            {product.isLiked ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton aria-label="delete" onClick={handleOpenConfirmDelete}>
            <DeleteIcon />
          </IconButton>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
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
