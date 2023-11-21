package com.example.bookedinwithredux.repository

import com.example.bookedinwithredux.database.BookedInReduxDatabase
import com.squareup.sqldelight.db.SqlDriver
import com.squareup.sqldelight.drivers.native.NativeSqliteDriver
actual class DatabaseDriverFactory {
    actual fun createDriver(): SqlDriver {
        return NativeSqliteDriver(BookedInReduxDatabase.Schema, "bookedIn.db")
    }
}