package com.example.bookedinwithredux.cartScreen

import com.example.bookedinwithredux.model.CartItem

data class CartState(
    val items: List<CartItem> = emptyList(),
    val itemCount: Int = 0,
    val isLoading: Boolean = false
)