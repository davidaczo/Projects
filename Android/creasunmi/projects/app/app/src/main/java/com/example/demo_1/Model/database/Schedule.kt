package com.example.demo_1.Model.database


data class Schedule (
    val id: Int,
    val storeFrontId: Int,
    val dayOfWeek: Int,
    val opens: String,
    val closes: String,
)