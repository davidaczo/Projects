package com.example.bookedinwithredux.android.cart

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment.Companion.CenterHorizontally
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.bookedinwithredux.android.cart.components.CartItemCard
import com.example.bookedinwithredux.android.cart.components.OrderSummary

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun CartScreen(
    navController: NavController,
    viewModel: CartViewModel = hiltViewModel()
) {
    val viewState by viewModel.state
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colors.background),
        horizontalAlignment = CenterHorizontally
    ) {
        item {
            Text(
                text = "You have ${viewState.itemCount} items in your cart!",
                style = MaterialTheme.typography.subtitle1
            )
            Spacer(modifier = Modifier.height(10.dp))
        }
        item {
            LazyVerticalGrid(columns = GridCells.Fixed(1), modifier = Modifier.height(400.dp)) {
                items(viewState.items) { book ->
                    println("rerender")
                    CartItemCard(cartItem = book, viewModel = viewModel)
                }
            }
        }
        item {
            OrderSummary(navController)
        }
    }
}
