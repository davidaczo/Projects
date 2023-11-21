package com.example.bookedinwithredux.repository

import com.squareup.sqldelight.db.SqlDriver


expect class DatabaseDriverFactory constructor() {
    fun createDriver(): SqlDriver
}


