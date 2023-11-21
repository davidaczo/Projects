package com.example.demo_1.Model.Flow

import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.BaseFlowState
import org.koin.core.component.KoinComponent

open class CameraViewStateContent: KoinComponent {
    fun getCameraViewState() : BaseFlowState.CameraViewState =
        BaseFlowState.CameraViewState(
            clientId = "",
            secretKey = ""
        )
}