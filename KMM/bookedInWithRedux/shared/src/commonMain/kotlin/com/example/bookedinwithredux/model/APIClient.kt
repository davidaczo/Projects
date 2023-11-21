package com.example.bookedinwithredux.model

import io.ktor.client.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

class APIClient() {
     val httpClient = HttpClient {
         install(ContentNegotiation) {
             json(Json {
                 prettyPrint = true
                 isLenient = true
                 ignoreUnknownKeys = true
             })
         }
     }
}
