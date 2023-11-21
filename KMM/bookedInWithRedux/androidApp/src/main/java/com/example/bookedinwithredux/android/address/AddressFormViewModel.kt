package com.example.bookedinwithredux.android.address

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.bookedinwithredux.addressScreen.AddressState
import com.example.bookedinwithredux.redux.VirtualStore
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class AddressFormViewModel @Inject constructor(
): ViewModel() {
    val state = mutableStateOf(AddressState())

    init {
        VirtualStore.store.subscribe {
            state.value = VirtualStore.state.addressState
        }
    }

}