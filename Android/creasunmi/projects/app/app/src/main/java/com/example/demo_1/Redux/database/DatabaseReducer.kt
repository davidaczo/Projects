package com.example.demo_1.Redux.database

import com.example.demo_1.Model.Flow.CameraViewStateContent
import com.example.demo_1.Model.Flow.HomeViewStateContent
import com.example.demo_1.Redux.Action
import com.example.demo_1.Redux.AppAction
import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.Reducer
import com.example.demo_1.navigation.ScreenStateFactory
import com.google.gson.Gson
import org.koin.core.component.KoinComponent
import org.koin.core.component.inject

open class DatabaseReducer(): Reducer<AppState, AppAction>, ScreenStateFactory(), KoinComponent {
    private val state: CameraViewStateContent by inject()

    override fun reduce(oldState: AppState, action: AppAction): AppState {
        val gson = Gson()
        println("DAVID database reducer action $action")
        return when (action) {

            else -> oldState

        }
    }
}


