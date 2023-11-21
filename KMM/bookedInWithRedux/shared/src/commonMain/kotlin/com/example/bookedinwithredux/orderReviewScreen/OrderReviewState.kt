package com.example.bookedinwithredux.orderReviewScreen

data class OrderReviewState(
    val books: List<OrderItem> = emptyList(),
    val error: String = "",
    var cartItemsCount: Int = 0
)

data class OrderItem(
    var bookId: Long,
    var quantity: Long,
    val image_url: String,
)