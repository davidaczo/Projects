package com.example.bookedinwithredux.model

@kotlinx.serialization.Serializable
data class Book(
    val id: Int,
    val title: String,
    val authors: String,
    val image_url: String,
    val price:Int = 50
)