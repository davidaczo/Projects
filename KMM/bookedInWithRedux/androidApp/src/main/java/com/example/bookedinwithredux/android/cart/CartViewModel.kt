package com.example.bookedinwithredux.android.cart

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.bookedinwithredux.cartScreen.CartState
import com.example.bookedinwithredux.model.CartItem
import com.example.bookedinwithredux.redux.UiActions
import com.example.bookedinwithredux.redux.VirtualStore
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class CartViewModel @Inject constructor(
) : ViewModel() {
    val state = mutableStateOf(CartState())

    init {
        VirtualStore.store.subscribe {
            state.value = VirtualStore.state.cartState
        }
        VirtualStore.dispatch(UiActions.InitCart())
    }

    fun addCartItem(cartItem: CartItem) {
        val action = UiActions.IncreaseCartItemQuantity(cartItem.id)
        VirtualStore.dispatch(action)
    }

    fun removeCartItem(cartItem: CartItem) {
        val action: Any = if (cartItem.quantity == 1L) {
            UiActions.DeleteCartItem(cartItem.id)
        } else {
            UiActions.DecreaseCartItemQuantity(cartItem.id)
        }
        VirtualStore.dispatch(action)
    }
}