import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types/types";
import axios from "axios";

// Helper function to filter products
function filterProducts(
  products: Product[],
  filter: "all" | "liked",
  searchTerm: string,
  selectedCategories: string[]
): Product[] {
  let filtered = products.filter((product: Product) => {
    if (filter === "liked") {
      return product.isLiked;
    }
    return true;
  });

  if (searchTerm) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }

  return filtered;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  filter: "all" | "liked";
  selectedCategories: string[];
  searchTerm: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  productsPerPage: number;
  currentProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  filter: "all",
  selectedCategories: [],
  searchTerm: "",
  status: "idle",
  error: null,
  currentPage: 1,
  productsPerPage: 6,
  currentProduct: null,
};

// Async Thunk for fetching products
const apiUrl = "https://fakestoreapi.com/products?limit=10";
export const fetchProducts = createAsyncThunk<Product[], string>(
  "products/fetchProducts",
  async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch products.");
    }
  }
);

// Async Thunk for editing a product
export const editProduct = createAsyncThunk<Product, Product>(
  "products/editProduct",
  async (product) => {
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${product.id}`,
        product
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update product.");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.filteredProducts = filterProducts(
        state.products,
        state.filter,
        state.searchTerm,
        state.selectedCategories
      );
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.filteredProducts = filterProducts(
        state.products,
        state.filter,
        state.searchTerm,
        state.selectedCategories
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.filteredProducts = filterProducts(
          state.products,
          state.filter,
          state.searchTerm,
          state.selectedCategories
        );
      }
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
      state.filteredProducts = filterProducts(
        state.products,
        state.filter,
        state.searchTerm,
        state.selectedCategories
      );
    },
    setFilter: (state, action: PayloadAction<"all" | "liked">) => {
      state.filter = action.payload;
      state.filteredProducts = filterProducts(
        state.products,
        state.filter,
        state.searchTerm,
        state.selectedCategories
      );
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
      state.filteredProducts = filterProducts(
        state.products,
        state.filter,
        state.searchTerm,
        state.selectedCategories
      );
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredProducts = filterProducts(
        state.products,
        state.filter,
        state.searchTerm,
        state.selectedCategories
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = filterProducts(
          state.products,
          state.filter,
          state.searchTerm,
          state.selectedCategories
        ); // Apply filters after fetching
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products.";
      })
      .addCase(editProduct.pending, (state) => {
        // Use editProduct here
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        // Use editProduct here
        state.status = "succeeded";
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (p) => p.id === updatedProduct.id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.filteredProducts = filterProducts(
          state.products,
          state.filter,
          state.searchTerm,
          state.selectedCategories
        ); // Apply filters after edit
      })
      .addCase(editProduct.rejected, (state, action) => {
        // Use editProduct here
        state.status = "failed";
        state.error = action.error.message || "Failed to update product.";
      });
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  toggleLike,
  setFilter,
  setSelectedCategories,
  setSearchTerm,
  setCurrentPage,
} = productSlice.actions;
export default productSlice.reducer;
