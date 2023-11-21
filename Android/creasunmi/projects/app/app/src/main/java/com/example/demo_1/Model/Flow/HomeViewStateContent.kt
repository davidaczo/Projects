package com.example.demo_1.Model.Flow

import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.BaseFlowState
import org.koin.core.component.KoinComponent

open class HomeViewStateContent: KoinComponent {
    fun getHomeViewState(clientId: String? = null, storeFrontName: String? = null) : BaseFlowState.HomeViewState =
        BaseFlowState.HomeViewState(
            clientId = clientId ?: "",
            storeFrontName = storeFrontName ?: "",
        )
}