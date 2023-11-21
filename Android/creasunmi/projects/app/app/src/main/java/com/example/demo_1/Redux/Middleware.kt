package com.example.demo_1.Redux

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow

interface Middleware<T : GeneralState> {
    suspend fun process(state: T, action: Action, sideEffect: MutableSharedFlow<Effect>): Flow<Action>
}