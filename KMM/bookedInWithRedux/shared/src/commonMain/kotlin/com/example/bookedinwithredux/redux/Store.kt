package com.example.bookedinwithredux.redux

import com.example.bookedinwithredux.addressScreen.AddressState
import com.example.bookedinwithredux.bookDetailedScreen.BookDetailedState
import com.example.bookedinwithredux.bookListScreen.BookListState
import com.example.bookedinwithredux.cartScreen.CartState
import com.example.bookedinwithredux.orderReviewScreen.OrderReviewState
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import org.reduxkotlin.applyMiddleware
import org.reduxkotlin.compose
import org.reduxkotlin.createThreadSafeStore
import kotlin.native.concurrent.ThreadLocal

data class AppState(
    var bookListState: BookListState = BookListState(),
    var bookDetailedState: BookDetailedState = BookDetailedState(),
    var cartState: CartState = CartState(),
    val addressState: AddressState = AddressState(),
    val orderReviewState: OrderReviewState = OrderReviewState()
)

@ThreadLocal
object VirtualStore {
    var store = createThreadSafeStore(reducer = ::appReducer, AppState(), compose(
        listOf(
            applyMiddleware(
                middleware()
            )
        )
    ))

    @Throws(Exception::class)
    fun dispatch(action: Any) {
        MainScope().launch {
            store.dispatch(action)
        }
    }

    val state: AppState
        get() = store.state
}
