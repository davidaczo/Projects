package com.example.demo_1.Redux

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

interface GeneralState
interface Action
interface Effect

interface Store<S: GeneralState, A: Action, E: Effect> {
    fun observeState(): StateFlow<S>
    fun dispatch(action: A)
    fun getState(): S
    fun observeSideEffect(): Flow<E>
}

open class ReduxStore(
    private val reducer: RootReducer,
    defaultValue: AppState,
    private val middlewares: List<Middleware<AppState>>
): Store<AppState, Action, Effect>, CoroutineScope by CoroutineScope(Dispatchers.Default) {

    protected val state = MutableStateFlow(defaultValue)
    private val sideEffect = MutableSharedFlow<Effect>()

    override fun observeState(): StateFlow<AppState> = state.asStateFlow()

    override fun getState(): AppState = state.value

    override fun observeSideEffect(): Flow<Effect> = sideEffect

    override fun dispatch(action: Action) {
        launch {
            dispatchSync(action)
        }
    }

    protected fun dispatchSync(action: Action) {
        val oldState = state.value
        val newState = reducer.reduce(oldState, action as AppAction)

        println("DAVID $middlewares , $action")

        middlewares.forEach { middleware ->
            launch {
                middleware.process(newState, action, sideEffect).collect { middlewareAction ->
                    dispatch(middlewareAction)
                }
            }
            if(newState != oldState) {
                state.value = newState
            }
        }
    }


}