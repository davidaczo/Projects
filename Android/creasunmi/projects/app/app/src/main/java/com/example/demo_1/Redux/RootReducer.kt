package com.example.demo_1.Redux

import com.example.demo_1.Redux.Websocket.WebSocketReducer
import com.example.demo_1.Redux.database.DatabaseReducer
import com.example.demo_1.Redux.screenFlow.ScreenFlowReducer
class RootReducer (
    private val appReducer: AppReducer,
    private val screenFlowReducer: ScreenFlowReducer,
    private val webSocketReducer: WebSocketReducer,
    private val databaseReducer: DatabaseReducer,
): Reducer<AppState, AppAction> {
    override fun reduce(oldState: AppState, action: AppAction): AppState =
        if (action is AppAction.WebSocketAction.Login) {
            webSocketReducer.reduce(oldState, action)
        }
        else if (action is AppAction.ScreenFlowAction.GoBack) {
            screenFlowReducer.reduce(oldState, action)
        }
        else if (action is AppAction.DatabaseAction.InsertDevice) {
            databaseReducer.reduce(oldState, action)
        }
        else {
            appReducer.reduce(oldState, action)
        }
}