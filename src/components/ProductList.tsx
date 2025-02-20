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
  fetchProducts,
  setCurrentPage,
  setSelectedCategories,
} from "../features/productSlice";
import { SelectChangeEvent } from "@mui/material";
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
  } = useAppSelector((state) => ({
    filteredProducts: state.products.filteredProducts,
    filter: state.products.filter,
    selectedCategories: state.products.selectedCategories,
    searchTerm: state.products.searchTerm,
    status: state.products.status,
    error: state.products.error,
    currentPage: state.products.currentPage,
    productsPerPage: state.products.productsPerPage,
  }));

  // API URL for fetching products
  const apiUrl = "https://fakestoreapi.com/products?limit=10";

  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    if (status === "idle" && filteredProducts.length === 0) {
      dispatch(fetchProducts(apiUrl));
    }
  }, [dispatch, apiUrl, filteredProducts.length, status]);

  // Handler for filter changes (all or liked)
  const handleFilterChange = (event: SelectChangeEvent<"all" | "liked">) => {
    dispatch(setFilter(event.target.value as "all" | "liked"));
  };

  // Handler for category changes
  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    if (value.includes("all")) {
      dispatch(setSelectedCategories([]));
    } else {
      dispatch(setSelectedCategories(value));
    }
  };

  // Handler for search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  // Handler for pagination changes
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setCurrentPage(value));
  };

  // Render loading state
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

  // Render error state
  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  // Calculate the start and end indices for pagination
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Render the product list
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Product List
      </Typography>

      {/* Filter Select */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="filter-label">Filter</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          label="Filter"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="liked">Liked</MenuItem>
        </Select>
      </FormControl>

      {/* Category Select */}
      <FormControl sx={{ m: 1, width: 300, marginBottom: "30px" }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          onChange={handleCategoryChange}
          value={selectedCategories}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="jewelery">Jewelery</MenuItem>
          <MenuItem value="men's clothing">Men's Clothing</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
        </Select>
      </FormControl>

      {/* Search Input */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 1, width: 300 }}
      />

      {/* Product Grid */}
      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
        />
      )}

      {/* Create Product Button */}
      <Link to="/create-product">
        <Button variant="outlined" color="primary">
          Create Product
        </Button>
      </Link>
    </Container>
  );
};

export default ProductList;
