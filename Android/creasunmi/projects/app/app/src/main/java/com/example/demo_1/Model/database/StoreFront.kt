package com.example.demo_1.Model.database

data class StoreFront(
    val id: Int,
    val name: String,
    val courierService: String,
    val pickupTimeMins: Int,
    val receiptPrintCount: Int
)