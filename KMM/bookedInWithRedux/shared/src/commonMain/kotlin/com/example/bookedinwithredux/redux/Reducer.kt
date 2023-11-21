package com.example.bookedinwithredux.redux

import com.example.bookedinwithredux.addressScreen.addressReducer
import com.example.bookedinwithredux.bookDetailedScreen.bookDetailedReducer
import com.example.bookedinwithredux.bookListScreen.BookListState
import com.example.bookedinwithredux.bookListScreen.bookListReducer
import com.example.bookedinwithredux.cartScreen.cartReducer
import com.example.bookedinwithredux.orderReviewScreen.orderReviewReducer

fun appReducer(state: AppState, action: Any) = AppState(
    bookListState = bookListReducer(state.bookListState, action),
    bookDetailedState = bookDetailedReducer(state.bookDetailedState, action),
    cartState = cartReducer(state.cartState, action),
    addressState = addressReducer(state.addressState, action),
    orderReviewState = orderReviewReducer(state.orderReviewState, action)
)