package com.example.bookedinwithredux.repository

import com.example.bookedinwithredux.model.BookDetailed
import com.example.bookedinwithredux.model.CartItem
import database.CartEntity


fun CartEntity.toCartItem(): CartItem {
    return CartItem(
        id, title, authors, image_url, quantity
    )
}

fun BookDetailed.toCartItem(quantity: Long): CartItem = CartItem(id.toLong(), title, authors, image_url, quantity)