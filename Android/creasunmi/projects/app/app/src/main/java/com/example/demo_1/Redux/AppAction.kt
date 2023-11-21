package com.example.demo_1.Redux

sealed class AppAction : Action {
    object GoToSecondaryScreen : AppAction()
    sealed class WebSocketAction : AppAction() {
        data class Login(val clientId: String, val secretKey: String) : AppAction()
    }

    sealed class ScreenFlowAction: AppAction() {
        object GoBack : AppAction()
    }

    sealed class DatabaseAction: AppAction() {
        object InsertDevice : AppAction()

    }

    val isWebSocketAction
        get() = this is WebSocketAction

//    val isSc
}