package com.example.bookedinwithredux.android.bookList

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.bookedinwithredux.bookListScreen.BookListState
import com.example.bookedinwithredux.redux.UiActions
import com.example.bookedinwithredux.model.Book
import com.example.bookedinwithredux.redux.VirtualStore
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class BookListViewModel @Inject constructor(): ViewModel() {
    var state = mutableStateOf(BookListState())

    init {
        VirtualStore.store.subscribe {
            state.value = VirtualStore.state.bookListState
        }
        VirtualStore.dispatch(UiActions.InitBooks())
    }

    fun addCartItem(book: Book) {
        val action = UiActions.AddToCartClicked(bookId = book.id.toString())
        viewModelScope.launch {
            VirtualStore.dispatch(action)
        }
    }
}








