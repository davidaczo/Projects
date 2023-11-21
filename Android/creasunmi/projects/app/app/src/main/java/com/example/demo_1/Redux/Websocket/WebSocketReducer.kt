package com.example.demo_1.Redux.Websocket

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

open class WebSocketReducer(): Reducer<AppState, AppAction>, ScreenStateFactory(), KoinComponent {
    private val state: CameraViewStateContent by inject()

    override fun reduce(oldState: AppState, action: AppAction): AppState {
        val gson = Gson()
        println("DAVID reducer action $action")
        return when (action) {
            is AppAction.WebSocketAction.Login ->{
                    val clientId = action.clientId
                    val secretKey = action.secretKey
                    println("DAVID hello")
    //                var webSocketHello = gson.fromJson(QrCode, WebSocketHello::class.java)

    //                println("DAVID websocket datas: $webSocketHello")
    //                CameraViewState
                return getNewState(
                    HomeViewStateContent().getHomeViewState(
                        clientId,
//                        oldState.db.getName()
                        "Test"
                    ),
                    oldState
                )
            }



            else -> oldState

        }
    }
}


