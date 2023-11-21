package com.example.bookedinwithredux.cartScreen

import com.example.bookedinwithredux.model.CartItem

sealed class CartAction {
    data class IncreaseCartItemQuantity(val cartItemId: Long)
    data class DecreaseCartItemQuantity(val cartItemId: Long)
    object LoadCartItemsStarted
    data class LoadCartItemsCompleted(val items: List<CartItem>, val cartItemCount: Int)
}