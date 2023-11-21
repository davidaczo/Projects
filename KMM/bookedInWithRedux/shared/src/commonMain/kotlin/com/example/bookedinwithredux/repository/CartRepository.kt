package com.example.bookedinwithredux.repository

import com.example.bookedinwithredux.model.CartItem
import kotlinx.coroutines.flow.MutableSharedFlow

interface CartRepository {
    suspend fun insertCartItem(cartItem: CartItem)
    suspend fun getCartItemById(id: Long): CartItem?
    suspend fun getAllCartItems(): MutableSharedFlow<List<CartItem>>
    suspend fun deleteCartItemById(id: Long)
    suspend fun updateIncreasingQuantityCartItem(id: Long)
    suspend fun updateDecreasingQuantityCartItem(id: Long)
    suspend fun getCartItemsCount(): Long
}