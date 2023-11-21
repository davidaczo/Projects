package com.example.bookedinwithredux.android.cartAndHistoryScreen

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.bookedinwithredux.android.Screen
import com.example.bookedinwithredux.android.address.AddressFormScreen
import com.example.bookedinwithredux.android.cart.CartScreen
import com.example.bookedinwithredux.android.cartAndHistoryScreen.components.BottomNavigationBar
import com.example.bookedinwithredux.android.orderReview.OrderReviewScreen

@Composable
fun CartAndHistoryScreen() {
    val navController = rememberNavController()
    Scaffold(
        bottomBar = { BottomNavigationBar(navController) },
        content = { padding ->
            Box(modifier = Modifier.padding(padding)) {
                NavHost(navController, startDestination = NavigationItem.CartScreen.route) {
//                    composable(NavigationItem.OrderScreen.route) {
//                        OrderHistoryScreen()
//                    }
                    composable(NavigationItem.CartScreen.route) {
                        CartScreen(navController)
                    }

                    composable(route = Screen.AddressFormScreen.route) {
                        AddressFormScreen(navController = navController)
                    }

                    composable(
                        route = Screen.OrderReview.route + "/{city}/{street}/{number}",
                        arguments = listOf(
                            navArgument("city") {
                                type = NavType.StringType
                            },
                            navArgument("street") {
                                type = NavType.StringType
                            },
                            navArgument("number") {
                                type = NavType.StringType
                            }
                        )
                    ) { entry ->
                        val args = entry.arguments
                        OrderReviewScreen(navController = navController, city = args?.getString("city"), street = args?.getString("street"),number = args?.getString("number"))
                    }
                }
            }
        },
        backgroundColor = MaterialTheme.colors.background
    )
}
