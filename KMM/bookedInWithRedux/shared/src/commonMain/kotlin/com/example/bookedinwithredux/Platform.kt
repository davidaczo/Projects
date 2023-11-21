package com.example.bookedinwithredux

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform