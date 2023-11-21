package com.example.bookedinwithredux.android.bookDetailed

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import com.example.bookedinwithredux.android.common.Constants
import com.example.bookedinwithredux.bookDetailedScreen.BookDetailedState
import com.example.bookedinwithredux.redux.UiActions
import com.example.bookedinwithredux.redux.VirtualStore
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class BookDetailedViewModel @Inject constructor(
    savedStateHandle: SavedStateHandle
): ViewModel() {
    val state = mutableStateOf(BookDetailedState())
    init {
        VirtualStore.store.subscribe {
            state.value = VirtualStore.state.bookDetailedState
        }

        savedStateHandle.get<String>(Constants.PARAM_BOOK_ID)?.let { bookId ->
            VirtualStore.dispatch(UiActions.InitDetailedBooks(bookId))
        }

    }

}
