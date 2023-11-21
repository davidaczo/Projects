package com.example.bookedinwithredux.di

import com.example.bookedinwithredux.database.BookedInReduxDatabase
import com.example.bookedinwithredux.repository.CartItemDatasource
import com.example.bookedinwithredux.repository.DatabaseDriverFactory
import com.example.bookedinwithredux.repository.OrderItemDatasource

class DatabaseModule {
    private val factory by lazy { DatabaseDriverFactory() }
    val cartItemDatasource: CartItemDatasource by lazy {
        CartItemDatasource(BookedInReduxDatabase(factory.createDriver()))
    }

    val orderItemDatasource: OrderItemDatasource by lazy {
        OrderItemDatasource(BookedInReduxDatabase(factory.createDriver()))
    }
}