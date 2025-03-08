import React, { useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
  Button,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setFilter,
  setSearchTerm,
  fetchProductsThunk,
  setCurrentPage,
  setSelectedCategories,
} from "../features/productSlice";
import CircularProgress from "@mui/material/CircularProgress";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    filteredProducts,
    filter,
    selectedCategories,
    searchTerm,
    status,
    error,
    currentPage,
    productsPerPage,
  } = useAppSelector((state) => state.products);

  // Effect to fetch products when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsThunk());
    }
  }, [dispatch, status]);

  // Show loading indicator while products are being fetched
  if (status === "loading") {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // Show error message if fetching failed
  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  // Handle category selection change
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value === "all") {
      dispatch(setSelectedCategories([]));
    } else {
      dispatch(setSelectedCategories([value]));
    }
    dispatch(setCurrentPage(1));
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as "all" | "liked";
    dispatch(setFilter(value));
    dispatch(setCurrentPage(1));
  };

  // Calculate indexes for current page products
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = Array.isArray(filteredProducts)
    ? filteredProducts.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(
    (Array.isArray(filteredProducts) ? filteredProducts.length : 0) /
      productsPerPage
  );

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        marginTop="80px"
        align="center"
      >
        Product List
      </Typography>

      {/* Filter select */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          label="Filter"
          sx={{ bgcolor: "background.paper" }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="liked">Liked</MenuItem>
        </Select>
      </FormControl>

      {/* Category select */}
      <FormControl sx={{ m: 1, width: 300, marginBottom: "30px" }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          onChange={handleCategoryChange}
          value={
            selectedCategories.length === 0 ? "all" : selectedCategories[0]
          }
          label="Category"
          sx={{ bgcolor: "background.paper" }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="jewelery">Jewelry</MenuItem>
          <MenuItem value="men's clothing">Men's Clothing</MenuItem>
          <MenuItem value="women's clothing">Women's Clothing</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
        </Select>
      </FormControl>

      {/* Search text field */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          dispatch(setSearchTerm(e.target.value));
          dispatch(setCurrentPage(1));
        }}
        sx={{ m: 1, width: 300 }}
      />

      {/* Link to create a new product */}
      <Link to="/create-product">
        <Button
          variant="contained"
          color="primary"
          sx={{
            left: "20px",
            my: 2,
            boxShadow: 3,
            "&:hover": { boxShadow: 6 },
          }}
        >
          Create Product
        </Button>
      </Link>

      {/* Pagination for product list */}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, value) => dispatch(setCurrentPage(value))}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
      )}

      <Grid container spacing={3} sx={{ marginTop: "30px" }}>
        {currentProducts.length === 0 ? (
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ width: "100%", textAlign: "center" }}
          >
            {filter === "liked"
              ? "No liked products found."
              : selectedCategories.length > 0
              ? `No products found in the category "${selectedCategories[0]}".`
              : "No products available."}
          </Typography>
        ) : (
          currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ProductList;
