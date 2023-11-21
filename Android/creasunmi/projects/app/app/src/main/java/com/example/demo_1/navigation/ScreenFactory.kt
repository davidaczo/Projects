package com.example.demo_1.navigation

import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.BaseFlowState


open class ScreenStateFactory {
    protected fun getNewState(newState: BaseFlowState, oldState: AppState): AppState {
        val previousStatesArray: ArrayList<BaseFlowState> = arrayListOf()
        previousStatesArray.addAll(oldState.previousStates)
        previousStatesArray.add(oldState.state)
        return when(newState) {
            is BaseFlowState.CameraViewState-> {
                return oldState.copy(
                    state = newState,
                    previousStates = previousStatesArray,
                    isMovingBack = false,
                )
            }

            is BaseFlowState.HomeViewState-> {
                return oldState.copy(
                    state = newState,
                    previousStates = previousStatesArray,
                    isMovingBack = false,
                )
            }

            else -> {oldState}
        }
    }
//
//    protected fun popToState(state: BaseFlowState, oldState: AppState): ProvisioningState {
//        if (oldState.flowState.previousStates.any { it.stateIdentifier == state.stateIdentifier }) {
//            val previousStatesArray: ArrayList<BaseProvisioningFlowState> = arrayListOf()
//            for (previousState in oldState.flowState.previousStates) {
//                if (previousState.stateIdentifier == state.stateIdentifier) {
//                    break
//                }
//                previousStatesArray.add(previousState)
//            }
//            return oldState.copy(
//                flowState = oldState.flowState.copy(
//                    state = state,
//                    applianceIdentifier = applianceIdentifier,
//                    previousStates = previousStatesArray,
//                    isMovingBack = true
//                )
//            )
//        } else {
//            return getNewState(state, oldState, applianceIdentifier)
//        }
//    }
//
//    protected fun changeState(newState: BaseProvisioningFlowState, oldState: ProvisioningState, applianceIdentifier: ApplianceIdentifier): ProvisioningState {
//        return oldState.copy(
//            flowState = oldState.flowState.copy(
//                state = newState,
//                applianceIdentifier = applianceIdentifier,
//                isMovingBack = false
//            )
//        )
//    }
//
//    protected fun popToState(stateIdentifier: ProvisioningScreenStateIdentifier, oldState: ProvisioningState, applianceIdentifier: ApplianceIdentifier) : ProvisioningState {
//        return if (oldState.flowState.previousStates.any { it.stateIdentifier == stateIdentifier }) {
//            popToState(oldState.flowState.previousStates.first{ previousState -> previousState.stateIdentifier == stateIdentifier }, oldState, applianceIdentifier)
//        } else {
//            oldState
//        }
//    }
}


