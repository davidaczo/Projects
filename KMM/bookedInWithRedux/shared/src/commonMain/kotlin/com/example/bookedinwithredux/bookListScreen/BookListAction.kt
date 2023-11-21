package com.example.bookedinwithredux.bookListScreen

import com.example.bookedinwithredux.model.Book

sealed class BookListAction {
    object LoadingBooksStarted: BookListAction()
    data class LoadCartItemsCount(val cartItemsCount: Long): BookListAction()
    data class LoadingBooksCompleted(val books: List<Book> ): BookListAction()
    data class AddToCartClicked(val bookId: String): BookListAction()
}