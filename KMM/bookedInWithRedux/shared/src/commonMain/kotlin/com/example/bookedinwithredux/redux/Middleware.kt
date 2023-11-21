package com.example.bookedinwithredux.redux

import com.example.bookedinwithredux.addressScreen.AddressAction
import com.example.bookedinwithredux.bookDetailedScreen.BookDetailedAction
import com.example.bookedinwithredux.bookListScreen.BookListAction
import com.example.bookedinwithredux.cartScreen.CartAction
import com.example.bookedinwithredux.database.BookedInReduxDatabase
import com.example.bookedinwithredux.orderReviewScreen.OrderItem
import com.example.bookedinwithredux.orderReviewScreen.OrderReviewAction
import com.example.bookedinwithredux.repository.*
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import org.reduxkotlin.*

class UiActions {
    class InitBooks
    class LoadCartItemsCount
    data class AddToCartClicked(val bookId: String)
    data class InitDetailedBooks(val bookId: String)
    class InitCart
    data class IncreaseCartItemQuantity(val cartItemId: Long)
    data class DecreaseCartItemQuantity(val cartItemId: Long)
    data class DeleteCartItem(val cartItemId: Long)
    data class CityChanged(val newCity: String)
    data class StreetChanged(val newStreet: String)
    data class NumberChanged(val newNumber: Int)
    data class DescriptionChanged(val newDescription: String)
    class LoadCartItemsForReview
    class SaveOrder
    class ResetCart
}

fun middleware() = middleware<AppState> { store, next, action ->
    val dispatch = store.dispatch
    val req = APIRequests()
    val cartItemDataSource = CartItemDatasource(BookedInReduxDatabase(DatabaseDriverFactory().createDriver()))
    val orderItemDatasource = OrderItemDatasource(BookedInReduxDatabase(DatabaseDriverFactory().createDriver()))
    when(action) {
        is UiActions.InitBooks -> {
            MainScope().launch {
                dispatch(BookListAction.LoadingBooksStarted)
                val books = req.getAllBooks()
                dispatch(BookListAction.LoadingBooksCompleted(books))
            }
        }

        is UiActions.LoadCartItemsCount -> {
            MainScope().launch {
                val cartItemsCount = cartItemDataSource.getCartItemsCount()
                dispatch(BookListAction.LoadCartItemsCount(cartItemsCount))
            }
        }

        is UiActions.AddToCartClicked -> {
            MainScope().launch {
                dispatch(BookListAction.AddToCartClicked(action.bookId))
                val book = cartItemDataSource.getCartItemById(action.bookId.toLong())
                if(book == null) {
                    val bookDetailed = req.getBookDetailedById(action.bookId)
                    cartItemDataSource.insertCartItem(bookDetailed.toCartItem(1))
                } else {
                    cartItemDataSource.updateIncreasingQuantityCartItem(action.bookId.toLong())
                }

            }
        }

        is UiActions.InitDetailedBooks -> {
            MainScope().launch {
                dispatch(BookDetailedAction.LoadingBookStarted)
                val book = req.getBookDetailedById(action.bookId)
                dispatch(BookDetailedAction.LoadingBookCompleted(book))
            }
        }

        is UiActions.InitCart -> {
            MainScope().launch {
                dispatch(CartAction.LoadCartItemsStarted)
                cartItemDataSource.getAllCartItems().collect {
                    val cartItemCount = cartItemDataSource.getCartItemsCount().toInt()
                    dispatch(CartAction.LoadCartItemsCompleted(it, cartItemCount))
                }
            }
        }

        is UiActions.IncreaseCartItemQuantity -> {
            MainScope().launch {
                cartItemDataSource.updateIncreasingQuantityCartItem(action.cartItemId)
                cartItemDataSource.getAllCartItems().collect {
                    val cartItemCount = cartItemDataSource.getCartItemsCount().toInt()
                    dispatch(CartAction.LoadCartItemsCompleted(it, cartItemCount))
                }
            }
        }

        is UiActions.DecreaseCartItemQuantity -> {
            MainScope().launch {
                cartItemDataSource.updateDecreasingQuantityCartItem(action.cartItemId)
                cartItemDataSource.getAllCartItems().collect {
                    val cartItemCount = cartItemDataSource.getCartItemsCount().toInt()
                    dispatch(CartAction.LoadCartItemsCompleted(it, cartItemCount))
                }
            }
        }

        is UiActions.DeleteCartItem -> {
            MainScope().launch {
                cartItemDataSource.deleteCartItemById(action.cartItemId)
                cartItemDataSource.getAllCartItems().collect {
                    val cartItemCount = cartItemDataSource.getCartItemsCount().toInt()
                    dispatch(CartAction.LoadCartItemsCompleted(it, cartItemCount))
                }
            }
        }

        is UiActions.CityChanged -> {
            MainScope().launch {
                dispatch(AddressAction.CityChanged(action.newCity))
            }
        }

        is UiActions.StreetChanged -> {
            MainScope().launch {
                dispatch(AddressAction.StreetChanged(action.newStreet))
            }
        }

        is UiActions.NumberChanged -> {
            MainScope().launch {
                dispatch(AddressAction.NumberChanged(action.newNumber))
            }
        }

        is UiActions.DescriptionChanged -> {
            MainScope().launch {
                dispatch(AddressAction.DescriptionChanged(action.newDescription))
            }
        }

        is UiActions.LoadCartItemsForReview -> {
            MainScope().launch {
                cartItemDataSource.getAllCartItems().collect {
                    val books = mutableListOf<OrderItem>()
                    for (item in it) {
                        books.add(OrderItem(item.id, item.quantity, item.image_url))
                    }
                    dispatch(OrderReviewAction.LoadingBooksCompleted(books))
                }
            }
        }

        is UiActions.SaveOrder -> {
            MainScope().launch {
                val bookIds = mutableListOf<Long>()
                cartItemDataSource.getAllCartItems().collect {
                    for (item in it){
                        bookIds.add(item.id)
                    }
                    val orderId = orderItemDatasource.insertOrder()
                    println("saving $orderId")
                    for (bookId in bookIds) {
                        orderItemDatasource.insertOrderAndBookId(orderId, bookId)
                    }
                }
            }
        }

        is UiActions.ResetCart -> {
            MainScope().launch {
                cartItemDataSource.getAllCartItems().collect {
                    for(item in it) {
                        cartItemDataSource.deleteCartItemById(item.id)
                    }
                }
            }
        }

        else -> next(action)
    }
}