package com.example.bookedinwithredux.repository

interface OrderRepository {
    suspend fun insertOrder(): Long;
    suspend fun insertOrderAndBookId(orderId: Long, bookId: Long);
    suspend fun lastRowId(): Long;
}