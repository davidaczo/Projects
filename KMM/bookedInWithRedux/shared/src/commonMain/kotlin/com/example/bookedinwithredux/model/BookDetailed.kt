package com.example.bookedinwithredux.model

import kotlinx.serialization.SerialName

@kotlinx.serialization.Serializable
data class BookDetailed(
    val id: Int,
    val title: String,
    val authors: String,
    val image_url: String,
    val rating: Double,
    val description:String,
    val num_pages: Int,
    val Quote1: String,
    val Quote2: String,
    val price:Int = 50
)
