package com.example.bookedinwithredux.orderReviewScreen

fun orderReviewReducer(currentState: OrderReviewState, action: Any): OrderReviewState =
    when(action) {
        is OrderReviewAction.LoadingBooksCompleted -> {
            currentState.copy(
                books = action.books
            )
        }
        else -> currentState
    }
