package com.example.bookedinwithredux.orderReviewScreen

sealed class OrderReviewAction {
    data class LoadingBooksCompleted(val books: List<OrderItem> ): OrderReviewAction()

}