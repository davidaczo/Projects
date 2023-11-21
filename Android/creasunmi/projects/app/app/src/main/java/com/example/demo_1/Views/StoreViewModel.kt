package com.example.demo_1.Views

import androidx.lifecycle.ViewModel
import com.example.demo_1.Redux.Action
import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.Effect
import com.example.demo_1.Redux.Store

data class StoreViewModel(
    val store: Store<AppState, Action, Effect>,
): ViewModel() {
    fun dispatch(action: Action) {
        store.dispatch(action)
    }
}