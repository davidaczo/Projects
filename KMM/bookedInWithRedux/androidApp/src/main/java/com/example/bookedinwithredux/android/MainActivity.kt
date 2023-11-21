package com.example.bookedinwithredux.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.bookedinwithredux.android.address.AddressFormScreen
import com.example.bookedinwithredux.android.bookDetailed.BookDetailedScreen
import com.example.bookedinwithredux.android.bookList.BookListScreen
import com.example.bookedinwithredux.android.cart.CartScreen
import com.example.bookedinwithredux.android.cartAndHistoryScreen.CartAndHistoryScreen
import com.example.bookedinwithredux.android.home.HomePageScreen
import com.example.bookedinwithredux.android.orderReview.OrderReviewScreen
import com.example.bookedinwithredux.android.theme.BookedInTheme
import dagger.hilt.android.AndroidEntryPoint

@Composable
fun MyApplicationTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colors = if (darkTheme) {
        darkColors(
            primary = Color(0xFFBB86FC),
            primaryVariant = Color(0xFF3700B3),
            secondary = Color(0xFF03DAC5)
        )
    } else {
        lightColors(
            primary = Color(0xFF6200EE),
            primaryVariant = Color(0xFF3700B3),
            secondary = Color(0xFF03DAC5)
        )
    }
    val typography = Typography(
        body1 = TextStyle(
            fontFamily = FontFamily.Default,
            fontWeight = FontWeight.Normal,
            fontSize = 16.sp
        )
    )
    val shapes = Shapes(
        small = RoundedCornerShape(4.dp),
        medium = RoundedCornerShape(4.dp),
        large = RoundedCornerShape(0.dp)
    )

    MaterialTheme(
        colors = colors,
        typography = typography,
        shapes = shapes,
        content = content
    )
}

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BookedInTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    val navController = rememberNavController()
                    NavHost(
                        navController = navController,
                        startDestination = Screen.HomePageScreen.route
                    ) {
                        composable(route = Screen.HomePageScreen.route) {
                            HomePageScreen(navController)
                        }
                        composable(route = Screen.BookListScreen.route) {
                            BookListScreen(navController)
                        }
                        composable(route = Screen.BookDetailScreen.route + "/{bookId}") {
                            BookDetailedScreen()
                        }
                        composable(route = Screen.CartScreen.route) {
                            CartScreen(navController)
                        }
                        composable(route = Screen.AddressFormScreen.route) {
                            AddressFormScreen(navController = navController)
                        }
                        composable(route = Screen.CartAndHistoryScreen.route) {
                            CartAndHistoryScreen()
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
            }
        }
    }
}

@Composable
fun Greeting(text: String) {
    Text(text = text)
}

@Preview
@Composable
fun DefaultPreview() {
    MyApplicationTheme {
        Greeting("Hello, Android!")
    }
}
