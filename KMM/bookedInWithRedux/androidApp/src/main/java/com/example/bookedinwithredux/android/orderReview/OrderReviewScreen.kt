package com.example.bookedinwithredux.android.orderReview

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.MaterialTheme
import androidx.compose.material.OutlinedButton
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.rememberAsyncImagePainter
import com.example.bookedinwithredux.android.Screen
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withTimeout

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun OrderReviewScreen(
    navController: NavController,
    viewModel: OrderReviewViewModel = hiltViewModel(),
    city: String?,
    street: String?,
    number: String?
) {
    val viewState by viewModel.state
    val selected = remember { mutableStateOf(false) }
    val offsetY = remember { Animatable(-1500f) }
    val offsetY2 = remember { Animatable(-1500f) }
    val animationEnded = remember { mutableStateOf(false) }
    var text by remember { mutableStateOf("Modify order") }

    LaunchedEffect(key1 = true) {
        launch {
            selected.value = true
            launch {
                offsetY.animateTo(
                    targetValue = 0f,
                    animationSpec = FloatTweenSpec(2000, 0, LinearOutSlowInEasing)
                )
            }
            delay(1000)
            launch {
                offsetY2.animateTo(
                    targetValue = 0f,
                    animationSpec = FloatTweenSpec(3000, 0, LinearOutSlowInEasing)
                )
            }
            delay(11000)
            text = "Order Placed!"
            animationEnded.value = true
            println("SAVING")
            viewModel.saveOrder()
            withTimeout(500) {
                navController.navigate(Screen.HomePageScreen.route) {
                    popUpTo(Screen.HomePageScreen.route)
                }
                viewModel.resetCart()
            }
        }
    }

    val animatedButtonColor = animateColorAsState(
        targetValue = if (selected.value) Color.Red else MaterialTheme.colors.secondary,
        animationSpec = tween(12000)
    )

    val scale = animateDpAsState(
        if (!selected.value) 300.dp else 100.dp,
        animationSpec = tween(12000)
    )


    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colors.background),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    )
    {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight(0.2f)
                .padding(all = 24.dp)
                .offset {
                    IntOffset(
                        0,
                        offsetY.value.toInt()
                    )
                },
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = "Address", fontWeight = FontWeight.Bold)
            Text(text = "$city, str. $street, nr. $number")

        }

        LazyVerticalGrid(columns = GridCells.Fixed(3), modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight(0.7f)
            .padding(all = 24.dp)
            .offset {
                IntOffset(
                    0,
                    offsetY2.value.toInt()
                )
            }) {
            items(viewState.books) { book ->
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = book.quantity.toString())
                    Image(
                        painter = rememberAsyncImagePainter(book.image_url),
                        contentDescription = null,
                        contentScale = ContentScale.FillBounds,
                        modifier = Modifier
                            .width(100.dp)
                            .height(170.dp)
                            .padding(all = 8.dp)
                            .clip(RoundedCornerShape(10.dp))

                    )
                }
            }
        }
        OutlinedButton(
            modifier = Modifier
                .padding(horizontal = 10.dp)
                .width(scale.value)
                .height(50.dp),
            onClick = {
                if (!animationEnded.value) {
                    navController.popBackStack(route = Screen.CartScreen.route, inclusive = false)
                }
            },
            border = BorderStroke(1.dp, Color.Transparent),
            shape = RoundedCornerShape(50),
            colors = ButtonDefaults.outlinedButtonColors(
                contentColor = Color.White,
                backgroundColor = if (!animationEnded.value) animatedButtonColor.value else Color.Green
            ),
        ) {
            Text(text = text, textAlign = TextAlign.Center)
        }
    }
}
