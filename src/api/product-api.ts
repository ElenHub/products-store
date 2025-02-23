import axios from "axios";
import { Product } from "../types/types";

export const apiUrl = import.meta.env.VITE_API_URL;

// Handle API errors by throwing a new error
const handleApiError = (error: any, message: string) => {
  throw new Error(error.message || message);
};

// Function to fetch all products from the API
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}?limit=10`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch products.");
  }
};

// Function to add a new product to the API
export const addProduct = async (newProduct: Product) => {
  try {
    const response = await axios.post(`${apiUrl}`, newProduct);
    const modifiedProduct = {
      ...response.data,
      id: Date.now()
    };
    return modifiedProduct; 
  } catch (error) {
    handleApiError(error, "Could not add product.");
  }
};

// Function to delete a product by ID
export const deleteProduct = async (id: string) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    handleApiError(error, "Could not delete product.");
  }
};

// Function to edit an existing product by ID
export const editProduct = async (product: Product) => {
  try {
    const response = await axios.put(`${apiUrl}/${product.id}`, product);
    return response.data;
  } catch (error) {
    handleApiError(error, "Could not update product.");
  }
};

// Function to fetch categories from the API
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/categories`);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch categories.");
  }
};
