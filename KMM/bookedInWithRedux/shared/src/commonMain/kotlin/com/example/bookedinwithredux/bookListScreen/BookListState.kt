package com.example.bookedinwithredux.bookListScreen

import com.example.bookedinwithredux.model.Book

data class BookListState(
    val isLoading: Boolean = false,
    val books: List<Book> = emptyList(),
    val error: String = "",
    var cartItemsCount: Long? = 0
)