import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrders } from '../../api/axiosAuth';

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    const response = await getOrders();

    console.log("orders", response)
    console.log((await response.json()).data);
    return (await response.json()).data;
  });
  