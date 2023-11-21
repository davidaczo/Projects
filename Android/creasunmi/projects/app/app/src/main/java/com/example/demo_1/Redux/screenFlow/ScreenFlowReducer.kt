package com.example.demo_1.Redux.screenFlow

import com.example.demo_1.Redux.Action
import com.example.demo_1.Redux.AppAction
import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.BaseFlowState
import com.example.demo_1.Redux.Reducer
import org.koin.core.component.KoinComponent

class ScreenFlowReducer : Reducer<AppState, AppAction>, KoinComponent {
    override fun reduce(oldState: AppState, action: AppAction): AppState {
        println("DAVID screenflowaction $action")
        return when(action) {
            is AppAction.ScreenFlowAction.GoBack -> {
                val previousStatesArray = oldState.previousStates

                val oldNewState = if (previousStatesArray.isEmpty()) {
                    BaseFlowState.CameraViewState("", "")
                } else {
                    previousStatesArray.last()
                }

                val newPreviousStatesArray: ArrayList<BaseFlowState> = arrayListOf()
                for (previousState in oldState.previousStates) {
                    if (previousState.stateIdentifier == oldNewState.stateIdentifier) {
                        break
                    }
                    newPreviousStatesArray.add(previousState)
                }

                return oldState.copy(
                    state = oldNewState,
                    previousStates = newPreviousStatesArray,
                    isMovingBack = true
                )
            }
            else -> oldState
        }
    }
}