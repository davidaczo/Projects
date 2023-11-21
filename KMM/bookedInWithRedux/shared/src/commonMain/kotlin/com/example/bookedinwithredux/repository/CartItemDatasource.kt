package com.example.bookedinwithredux.repository

import com.example.bookedinwithredux.database.BookedInReduxDatabase
import com.example.bookedinwithredux.model.CartItem
import kotlinx.coroutines.flow.*

class CartItemDatasource(db: BookedInReduxDatabase): CartRepository {
    private val queries = db.cartQueries

    override suspend fun insertCartItem(cartItem: CartItem) {
        queries.insertOrReplaceCartItem(
            id = cartItem.id,
            title = cartItem.title,
            authors = cartItem.authors,
            image_url = cartItem.image_url,
            quantity = cartItem.quantity
        )
    }

    override suspend fun getCartItemById(id: Long): CartItem? {
        return queries.getCartItemById(id = id).executeAsOneOrNull()?.toCartItem()
    }

    val allItemsFlow = MutableSharedFlow<List<CartItem>>(1)

    override suspend fun getAllCartItems(): MutableSharedFlow<List<CartItem>> {
        allItemsFlow.emit(queries.getAllCartItems().executeAsList().map { it.toCartItem() })
        return allItemsFlow
    }

    override suspend fun updateIncreasingQuantityCartItem(id: Long) {
        queries.updateIncreasingQuantityCartItem(id)
        allItemsFlow.emit(queries.getAllCartItems().executeAsList().map { it.toCartItem() })
    }

    override suspend fun deleteCartItemById(id: Long) {
        queries.deleteCartItemById(id)
        allItemsFlow.emit(queries.getAllCartItems().executeAsList().map { it.toCartItem() })

    }

    override suspend fun updateDecreasingQuantityCartItem(id: Long) {
        queries.updateDecreasingQuantityCartItem(id)
        allItemsFlow.emit(queries.getAllCartItems().executeAsList().map { it.toCartItem() })
    }

    override suspend fun getCartItemsCount(): Long  {
        return queries.getCartItemsCount().executeAsOneOrNull()?.SUM ?: 0
    }
}