import React from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Product } from "../types/types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toggleLike } from "../features/productSlice";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const numericId = Number(id);

  // Find the product with the given ID
  const product = products.find((p) => p.id === numericId);

  // Handle the case where the product is not found
  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Product not found</Typography>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </Container>
    );
  }

  // Function to navigate back to the product list
  const handleBackClick = () => {
    navigate("/products");
  };

  // Function to toggle the like status of a product
  const handleLikeClick = () => {
    dispatch(toggleLike(product.id));
  };

  return (
    <Container maxWidth="md">
      <Button
        onClick={() => navigate("/products")}
        sx={{ marginBottom: "40px", marginTop: "50px" }}
        color="primary"
        type="submit"
        variant="contained"
      >
        Back to Products
      </Button>
      <Card sx={{ marginTop: 2 }}>
        <CardMedia
          component="img"
          image={product.image}
          sx={{
            margin: "0 auto",
            width: "40%",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleLikeClick}
            sx={{ marginLeft: "auto" }}
          >
            {product.isLiked ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ProductDetails;
