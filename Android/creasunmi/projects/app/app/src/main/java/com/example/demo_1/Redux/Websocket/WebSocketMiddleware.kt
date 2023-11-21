package com.example.demo_1.Redux.Websocket

import com.example.demo_1.Model.database.StoreFront
import com.example.demo_1.Redux.Action
import com.example.demo_1.Redux.AppAction
import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.Effect
import com.example.demo_1.Redux.Middleware
import com.google.gson.Gson
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.emptyFlow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOf

class WebSocketMiddleware() : Middleware<AppState> {
    override suspend fun process(
        state: AppState,
        action: Action,
        sideEffect: MutableSharedFlow<Effect>
    ): Flow<Action> {
        println("DAVID action $action")
        return when(action) {
            is AppAction.WebSocketAction.Login -> flow {
//                val QrCode = action.result
//                var webSocketHello = gson.fromJson(QrCode, WebSocketHello::class.java)
                println("DAVID websocket datas: ${action.secretKey}")
                emit(AppAction.DatabaseAction.InsertDevice)

//                state.db.addStoreFronts(StoreFront(
//                    1,"Test","Test", 10, 1)
//                )
            }
            else -> emptyFlow()
        }
    }
}