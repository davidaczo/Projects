package com.example.bookedinwithredux.android.orderReview

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.bookedinwithredux.orderReviewScreen.OrderReviewState
import com.example.bookedinwithredux.redux.UiActions
import com.example.bookedinwithredux.redux.VirtualStore
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject


@HiltViewModel
class OrderReviewViewModel @Inject constructor(
): ViewModel() {
    var state = mutableStateOf(OrderReviewState())

    init {
        VirtualStore.store.subscribe {
            state.value = VirtualStore.state.orderReviewState
        }
        VirtualStore.dispatch(UiActions.LoadCartItemsForReview())
    }


    fun saveOrder() {
        VirtualStore.dispatch(UiActions.SaveOrder())
    }

    fun resetCart() {
        VirtualStore.dispatch(UiActions.ResetCart())

    }
}