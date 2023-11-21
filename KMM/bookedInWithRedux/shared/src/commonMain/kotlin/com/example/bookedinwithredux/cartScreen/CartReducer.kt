package com.example.bookedinwithredux.cartScreen

fun cartReducer(currentState: CartState, action: Any): CartState =
    when(action) {
        is CartAction.LoadCartItemsStarted -> {
            currentState.copy(
                isLoading = false
            )
        }

        is CartAction.LoadCartItemsCompleted -> {
            println("cartreducer ${action.items}")
            currentState.copy(
                isLoading = true,
                items = action.items,
                itemCount = action.cartItemCount
            )
        }

        else -> currentState
    }