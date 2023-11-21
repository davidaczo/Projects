package com.example.bookedinwithredux.repository

import com.example.bookedinwithredux.model.APIClient
import com.example.bookedinwithredux.model.Book
import com.example.bookedinwithredux.model.BookDetailed
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

class APIRequests {
    private val httpClient = APIClient().httpClient

    private val json = Json {
        ignoreUnknownKeys = true; coerceInputValues = true; encodeDefaults = true
    }

    suspend fun getAllBooks(
    ) : List<Book> {
        val userResponseJSON = httpClient.get(
            "https://example-data.draftbit.com/books?_limit=50"
        )
        return json.decodeFromString(userResponseJSON.bodyAsText())
    }

    suspend fun getBookDetailedById(
        id: String
    ) : BookDetailed {
        val userResponseJSON = httpClient.get(
            "https://example-data.draftbit.com/books/${id}"
        )
        return json.decodeFromString(userResponseJSON.bodyAsText())
    }

}