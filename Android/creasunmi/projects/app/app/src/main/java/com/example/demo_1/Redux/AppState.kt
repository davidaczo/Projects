package com.example.demo_1.Redux

import com.example.demo_1.localStorage.DBManager

enum class ScreenStateIdentifier {
    HOME_VIEW,
    SECONDARY_VIEW,
    CAMERA_VIEW
}

data class AppState(
    val state: BaseFlowState,
    val previousStates: List<BaseFlowState>,
    val isMovingBack: Boolean = false,
    val db: DBManager,
    ): GeneralState
    open class BaseFlowState(
        val stateIdentifier: ScreenStateIdentifier
    ) {

        data class CameraViewState(
            val clientId: String,
            val secretKey: String
        ) : BaseFlowState(ScreenStateIdentifier.CAMERA_VIEW) {}

        data class HomeViewState(
            val clientId: String,
            val storeFrontName: String,
        ) : BaseFlowState(ScreenStateIdentifier.HOME_VIEW)
    }
