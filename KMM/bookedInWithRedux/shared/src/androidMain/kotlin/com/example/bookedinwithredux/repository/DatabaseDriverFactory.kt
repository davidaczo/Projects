package com.example.bookedinwithredux.repository

import android.app.Application
import android.content.Context
import com.example.bookedinwithredux.database.BookedInReduxDatabase
import com.squareup.sqldelight.android.AndroidSqliteDriver
import com.squareup.sqldelight.db.SqlDriver

actual class DatabaseDriverFactory{
    actual fun createDriver(): SqlDriver {
        return AndroidSqliteDriver(BookedInReduxDatabase.Schema, Service.context!!, "bookedIn.db")
    }
}

object Service {
    var context: Application? = null
}
