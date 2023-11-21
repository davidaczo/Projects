package com.example.demo_1.Views

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import com.example.demo_1.Model.Flow.HomeViewStateContent
import com.example.demo_1.Redux.BaseFlowState
import com.example.demo_1.Views.StoreViewModel
import com.example.demo_1.ui.theme.OspatarulPurple
import com.example.demo_1.ui.theme.OspatarulYellow
import org.koin.androidx.compose.getViewModel

@Composable
fun Home(
    state: BaseFlowState.HomeViewState = HomeViewStateContent().getHomeViewState(null,null),
    viewModel: StoreViewModel = getViewModel()
) {
    val clientId by rememberSaveable {
        mutableStateOf(state.clientId)
    }

    val restaurantName by rememberSaveable {
        mutableStateOf(state.storeFrontName)
    }

    Surface(modifier = Modifier.fillMaxSize(), color = OspatarulYellow) {
        Column {
                Text("Hello $clientId $restaurantName", color = OspatarulPurple)
            }
        }
    }
