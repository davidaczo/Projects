import { createAsyncThunk } from '@reduxjs/toolkit';

const productA= {
    id: 1,
    partnerId: 2,
    name: "productA",
    slug: "productA",
    createdAt: "2023-10-28",
    price: 50,
    available: true
}

const productB= {
    id: 2,
    partnerId: 3,
    name: "productB",
    slug: "productB",
    createdAt: "2023-10-28",
    price: 50,
    available: true
}

const productC= {
    id: 3,
    partnerId: 3,
    name: "productC",
    slug: "productC",
    createdAt: "2023-10-28",
    price: 50,
    available: true
}

const products = [productA, productB, productC]

export const fetchBalance = createAsyncThunk('users/fetchUsers', async () => {
    // const response = await fetch('https://reqres.in/api/users?delay=1');
    // return (await response.json()).data as UserData[];
    // console.log(products)
    return products;
  });