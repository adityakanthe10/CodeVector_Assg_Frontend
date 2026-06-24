import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, ProductsResponse } from "../types/product";
import { fetchProducts } from "../lib/api";

const initialState: ProductsState = {
  products: [],
  nextCursor: null,
  selectedCategory: "",
  loading: false,
  error: null,
  hasMore: true,
};

// Async thunk for fetching products
export const loadProducts = createAsyncThunk<
  ProductsResponse,
  { reset?: boolean }
>("products/loadProducts", async ({ reset }, { getState }) => {
  const state = (getState() as { products: ProductsState }).products;

  const params = {
    category: state.selectedCategory || undefined,
    limit: 20,
    ...(reset
      ? {}
      : state.nextCursor
        ? {
            lastCreatedAt: state.nextCursor.created_at,
            lastId: state.nextCursor._id,
          }
        : {}),
  };

  return await fetchProducts(params);
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      // Reset when category changes
      state.products = [];
      state.nextCursor = null;
      state.hasMore = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load products - pending
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Load products - fulfilled
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Append new products to existing ones
        state.products = [...state.products, ...action.payload.data];
        state.nextCursor = action.payload.nextCursor;
        state.hasMore = action.payload.nextCursor !== null;
      })
      // Load products - rejected
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const { setCategory, clearError } = productsSlice.actions;
export default productsSlice.reducer;
