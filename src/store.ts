import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";

// Function to save the state of the store to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify({
      products: state.products.products,
      filteredProducts: state.products.filteredProducts,
      filter: state.products.filter,
      selectedCategories: state.products.selectedCategories,
      searchTerm: state.products.searchTerm,
      status: state.products.status,
      error: state.products.error,
      currentPage: state.products.currentPage,
      productsPerPage: state.products.productsPerPage,
    });
    localStorage.setItem("products", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Function to load the state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("products");
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    return {
      products: {
        products: parsedState.products || [],
        filteredProducts: parsedState.filteredProducts || [],
        filter: parsedState.filter || "all",
        selectedCategories: parsedState.selectedCategories || [],
        searchTerm: parsedState.searchTerm || "",
        status: parsedState.status || "idle",
        error: parsedState.error || null,
        currentPage: parsedState.currentPage || 1,
        productsPerPage: parsedState.productsPerPage || 6,
      },
    };
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Configure the Redux store with the product reducer and preloaded state
export const store = configureStore({
  reducer: {
    products: productReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
