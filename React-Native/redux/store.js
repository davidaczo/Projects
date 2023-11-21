import {combineReducers, createStore} from "redux"
import productReducer from "./slices/reducers/productSilces";
import orderReducer from "./slices/reducers/orderSlices";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    productReducer,
    orderReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store;
