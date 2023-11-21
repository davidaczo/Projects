package com.example.demo_1.Redux

import org.koin.core.component.KoinComponent

class AppReducer : Reducer<AppState, Action>, KoinComponent {
    override fun reduce(oldState: AppState, action: Action): AppState {
        println("DAVID lol")
        return when(action) {
            is AppAction.GoToSecondaryScreen -> {
                println("DAVID here")
                oldState
//                    .copy(
//                    ScreenStateIdentifier.SECONDARY_VIEW
//                )
            }
            else -> oldState

        }
    }
}