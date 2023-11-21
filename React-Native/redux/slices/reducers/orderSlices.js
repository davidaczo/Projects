import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders } from '../thunk/ordersThunk';
const initialState = {
  loading: false,
  orders: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    loadOrders: (state, action) => {
      state.orders = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchOrders.pending, state => {
        console.log("fetchorders1")
      state.loading = true
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
        console.log("fetchorders2")

      state.orders = action.payload
      state.loading = false
    })
    builder.addCase(fetchOrders.rejected, state => {
        console.log("fetchorders3",)

      state.loading = false
    })
  }
});

export const { loadOrders } = orderSlice.actions;

export default orderSlice.reducer;