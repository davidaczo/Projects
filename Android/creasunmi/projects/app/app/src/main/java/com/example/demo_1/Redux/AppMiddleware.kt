package com.example.demo_1.Redux

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.emptyFlow
import kotlinx.coroutines.flow.flow

class AppMiddleware() : Middleware<AppState> {
    override suspend fun process(
        state: AppState,
        action: Action,
        sideEffect: MutableSharedFlow<Effect>
    ): Flow<Action> {
        return when(action) {
            is AppAction.GoToSecondaryScreen -> flow {
                println("DAV")

            }
            else -> emptyFlow()
        }
    }
}