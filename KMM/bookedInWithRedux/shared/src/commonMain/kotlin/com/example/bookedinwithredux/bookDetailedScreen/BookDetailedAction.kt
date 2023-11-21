package com.example.bookedinwithredux.bookDetailedScreen

import com.example.bookedinwithredux.model.BookDetailed

sealed class BookDetailedAction {
    object LoadingBookStarted: BookDetailedAction()
    data class LoadingBookCompleted(val book: BookDetailed): BookDetailedAction()
}