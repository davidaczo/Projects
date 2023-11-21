package com.example.bookedinwithredux.bookDetailedScreen

fun bookDetailedReducer(currentState: BookDetailedState, action: Any): BookDetailedState =
    when(action) {
        is BookDetailedAction.LoadingBookStarted -> {
            stateAfterLoadingBookStarted(currentState)
        }

        is BookDetailedAction.LoadingBookCompleted -> {
            stateAfterLoadingBookCompleted(currentState, action)
        }
        else -> currentState
    }

private fun stateAfterLoadingBookCompleted(
    currentState: BookDetailedState,
    action: BookDetailedAction.LoadingBookCompleted
) = currentState.copy(
    book = action.book,
    isLoading = false
)

private fun stateAfterLoadingBookStarted(currentState: BookDetailedState) =
    currentState.copy(
        isLoading = true
    )
