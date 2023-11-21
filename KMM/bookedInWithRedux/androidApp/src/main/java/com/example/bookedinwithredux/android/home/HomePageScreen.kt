package com.example.bookedinwithredux.android.home

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.ShoppingCart
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.bookedinwithkmm.android.home.components.HomePageButton
import com.example.bookedinwithredux.android.Screen
import com.example.bookedinwithredux.android.R

@Composable
fun HomePageScreen(
    navController: NavController
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(modifier = Modifier
            .fillMaxWidth()
            .padding(top = 14.dp),horizontalArrangement = Arrangement.Center, verticalAlignment = Alignment.CenterVertically) {
            Image(
                painterResource(id = R.drawable.book_icon),
                contentDescription = "Book svg",
                modifier = Modifier.size(40.dp)
            )
            Text(
                text = "BookedIn",
                style = MaterialTheme.typography.h3,
                fontSize = 60.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colors.secondary,
                modifier = Modifier.padding(horizontal = 16.dp)
            )
            Image(
                painterResource(id = R.drawable.book_icon),
                contentDescription = "Book svg",
                modifier = Modifier.size(40.dp)
            )
        }
        Row(modifier = Modifier
            .fillMaxWidth()) {

            Column(Modifier.fillMaxWidth(), verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally) {
                HomePageButton(
                    onClick = { navController.navigate(Screen.BookListScreen.route) },
                    painter = painterResource(id = R.drawable.books),
                    text = "Books"
                )
                HomePageButton(
                    onClick = {
                        navController.navigate(Screen.CartAndHistoryScreen.route)
                              },
                    imageVector = Icons.Outlined.ShoppingCart,
                    text = "Carts"
                )
                HomePageButton(
                    onClick = {
//                        navController.navigate(Screen.CartScreen.route)
                              },
                    painter = painterResource(id = R.drawable.books),
                    text = "Settings"
                )
            }
        }
        Row(
            modifier = Modifier
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Image(
                painterResource(id = R.drawable.vector_book_blue),
                contentDescription = "Book vector",
                modifier = Modifier
                    .width(350.dp)
                    .height(160.dp),
            )

        }

    }
}
