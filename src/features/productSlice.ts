import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types/types";
import * as productApi from "../api/product-api";

// Function for filtering products
function filterProducts(
  products: Product[],
  filter: "all" | "liked",
  searchTerm: string,
  selectedCategories: string[]
): Product[] {
  return products.filter((product) => {
    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return (
      (filter === "all" || (filter === "liked" && product.isLiked)) &&
      matchesSearchTerm &&
      matchesCategory
    );
  });
}

// Initial state structure
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
};

// Thunks for async operations
export const fetchProductsThunk = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  productApi.fetchProducts
);

export const fetchCategoriesThunk = createAsyncThunk(
  "products/fetchCategories",
  productApi.fetchCategories
);

export const addProductThunk = createAsyncThunk<Product, Product>(
  "products/addProduct",
  async (newProduct: Product) => {
    const response = await productApi.addProduct(newProduct);
    return response;
  }
);

export const deleteProductThunk = createAsyncThunk<void, string>(
  "products/deleteProduct",
  productApi.deleteProduct
);
export const editProductThunk = createAsyncThunk<Product, Product>(
  "products/editProduct",
  productApi.editProduct
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
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
    setFilter(state, action: PayloadAction<"all" | "liked">) {
      state.filter = action.payload;
      state.filteredProducts = filterProducts(
        state.products,
        state.filter,
        state.searchTerm,
        state.selectedCategories
      );
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.filteredProducts = filterProducts(
        state.products,
        state.filter,
        state.searchTerm,
        state.selectedCategories
      );
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSelectedCategories(state, action: PayloadAction<string[]>) {
      state.selectedCategories = action.payload;
      state.filteredProducts = filterProducts(
        state.products,
        state.filter,
        state.searchTerm,
        state.selectedCategories
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = filterProducts(
          state.products,
          state.filter,
          state.searchTerm,
          state.selectedCategories
        );
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products.";
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        console.log("Product added to Redux store:", action.payload);
        state.products.push(action.payload);
        state.filteredProducts = filterProducts(
          state.products,
          state.filter,
          state.searchTerm,
          state.selectedCategories
        );
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
          state.filteredProducts = filterProducts(
            state.products,
            state.filter,
            state.searchTerm,
            state.selectedCategories
          );
        }
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.meta.arg);
        state.filteredProducts = filterProducts(
          state.products,
          state.filter,
          state.searchTerm,
          state.selectedCategories
        );
      });
  },
});

export const {
  toggleLike,
  setFilter,
  setSearchTerm,
  setCurrentPage,
  setSelectedCategories,
} = productSlice.actions;
export default productSlice.reducer;
