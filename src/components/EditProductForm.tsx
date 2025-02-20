import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateProduct } from "../features/productSlice";
import { Product } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";

const EditProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.products.products);
  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  // useEffect hook to load product data when the component mounts or when the product ID changes
  useEffect(() => {
    if (!id) return; // If there is no id, exit the effect.
    const foundProduct = products.find((p) => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setTitle(foundProduct.title);
      setDescription(foundProduct.description);
      setCategory(foundProduct.category);
      setImage(foundProduct.image);
      setError("");
    } else {
      // If the product isn't found in the products array
      setError("Product not found.");
      setProduct(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setImage("");
    }
  }, [id, products]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form data
    if (!title || !description || !image || !category) {
      setError("Please fill in all fields.");
      return;
    }

    // Check if the product was found
    if (!product) {
      setError("Product not found.");
      return;
    }

    // Create an updated product object
    const updatedProduct: Product = {
      ...product,
      title,
      description,
      category,
      image,
    };

    dispatch(updateProduct(updatedProduct));
    navigate("/products");
  };

  // Render the loading state if the product is not yet loaded
  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Product not found</Typography>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Button
        onClick={() => navigate("/products")}
        sx={{ marginBottom: "30px" }}
        color="primary"
        type="submit"
        variant="contained"
      >
        Back to Products
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product
      </Typography>

      {/* Form for editing product details */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            required
          >
            <MenuItem value="jewelery">Jewelery</MenuItem>
            <MenuItem value="men's clothing">Men's Clothing</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
          </Select>
        </FormControl>
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default EditProductForm;
