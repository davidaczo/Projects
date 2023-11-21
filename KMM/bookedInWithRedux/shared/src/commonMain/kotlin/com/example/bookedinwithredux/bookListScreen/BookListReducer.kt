package com.example.bookedinwithredux.bookListScreen

fun bookListReducer(currentState: BookListState, action: Any): BookListState =
    when (action) {
        is BookListAction.LoadingBooksCompleted -> {
            stateAfterLoadingBooksCompleted(currentState, action)
        }
        is BookListAction.AddToCartClicked -> {
            stateAfterAddToCartClicked(currentState)
        }
        BookListAction.LoadingBooksStarted -> {
            stateAfterLoadingBookStarted(currentState)
        }
        is BookListAction.LoadCartItemsCount -> {
            stateAfterLoadItemsCount(currentState, action)
        }
        else -> currentState
    }

private fun stateAfterLoadItemsCount(
    currentState: BookListState,
    action: BookListAction.LoadCartItemsCount
) = currentState.copy(
    cartItemsCount = action.cartItemsCount
)

private fun stateAfterLoadingBookStarted(currentState: BookListState) =
    currentState.copy(
        isLoading = true
    )

private fun stateAfterAddToCartClicked(currentState: BookListState) =
    currentState.copy(
        cartItemsCount = currentState.cartItemsCount?.plus(1)
    )

private fun stateAfterLoadingBooksCompleted(
    currentState: BookListState,
    action: BookListAction.LoadingBooksCompleted
) = currentState.copy(
    isLoading = false,
    books = action.books
)
