package com.example.bookedinwithredux.android.bookList.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.ShoppingCart
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.bookedinwithredux.android.Screen
import com.example.bookedinwithredux.android.bookList.BookListViewModel

@Composable
fun Header(
    viewModel: BookListViewModel,
    navController: NavController
) {
    val state = viewModel.state
    LaunchedEffect(key1 = true) {
//        viewModel.loadCartItemsFromDb()
    }
    Row(
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colors.secondary)
    ) {
        Text(
            text = "Books", fontSize = 18.sp, color = Color.White, modifier = Modifier
                .padding(16.dp)
        )
        Box(modifier = Modifier
            .clickable {
                navController.navigate(Screen.CartScreen.route)
            }
            .padding(end = 10.dp), contentAlignment = Alignment.BottomEnd) {
            Icon(
                Icons.Rounded.ShoppingCart,
                contentDescription = "cart",
                tint = Color.White
            )
            Text(
                text = state.value.cartItemsCount.toString(),
                color = Color.White,
                fontSize = 11.sp,
                modifier = Modifier
                    .background(Color.Red, shape = CircleShape)
                    .size(16.dp),
                textAlign = TextAlign.Center
            )
        }
    }
}