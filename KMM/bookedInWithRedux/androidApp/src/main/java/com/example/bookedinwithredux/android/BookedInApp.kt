package com.example.bookedinwithredux.android

import android.app.Application
import com.example.bookedinwithredux.repository.Service
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class BookedInApp: Application() {

    override fun onCreate() {
        super.onCreate()
        Service.context = this
    }
}