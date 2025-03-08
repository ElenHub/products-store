import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch } from "../hooks";
import { addProductThunk } from "../features/productSlice";
import { Product } from "../types/types";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const CreateProductForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (price <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    if (
      !title.trim() ||
      !description.trim() ||
      !image.trim() ||
      !category.trim()
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newProduct: Product = {
        id: uuid(),
        title,
        description,
        category,
        image,
        price,
        isLiked: false,
      };
      await dispatch(addProductThunk(newProduct));
      navigate("/products");
    } catch (err) {
      setError("An error occurred when creating the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Button
        onClick={() => navigate("/products")}
        sx={{ marginBottom: "40px", marginTop: "50px" }}
        color="primary"
        type="submit"
        variant="contained"
      >
        Back to Products
      </Button>
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          error={!title.trim() && error !== ""}
          helperText={
            !title.trim() && error !== "" ? "The field must be filled in" : ""
          }
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
          error={!description.trim() && error !== ""}
          helperText={
            !description.trim() && error !== ""
              ? "The field must be filled in"
              : ""
          }
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={price || ""}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          required
          error={price <= 0 && error !== ""}
          helperText={
            price <= 0 && error !== "" ? "Price must be a positive number." : ""
          }
        />

        <TextField
          label="Image (URL)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          error={!image.trim() && error !== ""}
          helperText={
            !image.trim() && error !== "" ? "The field must be filled in" : ""
          }
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            label="Category"
            labelId="category-label"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
            required
            error={!category.trim() && error !== ""}
          >
            <MenuItem value="">Select a category</MenuItem>
            <MenuItem value="jewelery">Jewelery</MenuItem>
            <MenuItem value="men's clothing">Men's Clothing</MenuItem>
            <MenuItem value="women's clothing">Women's Clothing</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Create"}
        </Button>
      </form>
    </Container>
  );
};

export default CreateProductForm;
