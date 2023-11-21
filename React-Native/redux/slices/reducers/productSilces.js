import { createSlice } from '@reduxjs/toolkit';
import { fetchBalance } from "../thunk/productsThunk"
const initialState = {
  balance: 0,
  loading: false,
  products: []
};

export const productSlice = createSlice({
  name: 'balance',
  initialState: initialState,
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
    },
    withdraw: (state, action) => {
      state.balance -= action.payload;
    },
    loadProducts: (state, action) => {
      state.products = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchBalance.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.products = action.payload
      state.loading = false
    })
    builder.addCase(fetchBalance.rejected, state => {
      state.loading = false
    })
  }
});

export const { deposit, withdraw, loadProducts } = productSlice.actions;

export default productSlice.reducer;