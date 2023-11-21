package com.example.bookedinwithredux.model


public data class CartItem (
    val id: Long,
    val title: String,
    val authors: String,
    val image_url: String,
    var quantity: Long,
)