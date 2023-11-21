package com.example.bookedinwithredux.bookDetailedScreen

import com.example.bookedinwithredux.model.BookDetailed

data class BookDetailedState(
    val isLoading: Boolean = false,
    val book: BookDetailed? = null,
    val error: String = ""
) {
}