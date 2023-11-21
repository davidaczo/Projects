package com.example.bookedinwithredux.repository

import com.example.bookedinwithredux.database.BookedInReduxDatabase


class OrderItemDatasource(db: BookedInReduxDatabase): OrderRepository {
    private val queries = db.orderQueries

    override suspend fun insertOrder(): Long {
        queries.insertOrder(null);
        return lastRowId();
    }

    override suspend fun insertOrderAndBookId(orderId: Long, bookId: Long) {
        queries.insertOrdersBooks(orderId,bookId)
    }

    override suspend fun lastRowId(): Long {
        return queries.lastInsertRowId().executeAsOne()
    }
}