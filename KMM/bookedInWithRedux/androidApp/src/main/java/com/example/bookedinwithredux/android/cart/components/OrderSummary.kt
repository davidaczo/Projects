package com.example.bookedinwithredux.android.cart.components

import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.bookedinwithredux.android.Screen
import com.example.bookedinwithredux.android.cart.CartViewModel

@Composable
fun OrderSummary(
    navController: NavController,
    viewModel: CartViewModel = hiltViewModel()
) {
    val viewState by viewModel.state
    Column(modifier = Modifier.padding(25.dp)) {
        Text(text = "Order Summary", fontWeight = FontWeight.Bold, fontSize = 25.sp)
        Divider(
            Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp)
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = "Total price of your books")
            Text("${viewState.itemCount * 50}")
        }
        Divider(
            Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp)
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = "Home delivery fee")
            Text("15")
        }
        Divider(
            Modifier
                .fillMaxWidth()
                .padding(vertical = 16.dp)
        )
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = "TOTAL", fontWeight = FontWeight.Bold)
            Text("${viewState.itemCount * 50 + 15} ")
        }
        Button(
            onClick = {
                navController.navigate(Screen.AddressFormScreen.route)
                      },
            modifier = Modifier
                .fillMaxWidth()
                .height(60.dp)
                .padding(vertical = 8.dp),
            colors = ButtonDefaults.buttonColors(
                backgroundColor = MaterialTheme.colors.secondary,
                contentColor = MaterialTheme.colors.background
            )
        ) {
            Text(text = "GET THEM!")
        }
    }
}