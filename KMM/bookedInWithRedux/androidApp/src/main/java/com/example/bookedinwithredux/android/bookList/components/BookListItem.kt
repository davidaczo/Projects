package com.example.bookedinwithredux.android.bookList.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.rememberAsyncImagePainter
import com.example.bookedinwithredux.android.bookList.BookListViewModel
import com.example.bookedinwithredux.model.Book


@Composable
fun BookListItem(
    book: Book,
    onItemClick: (Book) -> Unit,
    viewModel: BookListViewModel
) {
    Card(
        modifier = Modifier
            .height(290.dp)
            .padding(top = 10.dp, start = 16.dp, end = 16.dp)
            .clickable { onItemClick(book) }
            .background(MaterialTheme.colors.background),
        shape = RoundedCornerShape(16.dp),
        elevation = 10.dp,
    ) {
        Box(modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colors.primary), contentAlignment = Alignment.TopEnd) {
            Column(modifier = Modifier
                .fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Spacer(modifier = Modifier.height(10.dp))
                Image(
                    painter = rememberAsyncImagePainter(book.image_url),
                    contentDescription = null,
                    contentScale = ContentScale.FillBounds,
                    modifier = Modifier
                        .height(140.dp)
                        .width(80.dp)
                        .clip(RoundedCornerShape(10.dp))
                )
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(80.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ){
                    Box(modifier = Modifier.height(40.dp)) {
                        Text(
                            text = book.title,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            textAlign = TextAlign.Center,
                            color = White,
                            maxLines = 2
                        )
                    }
                    Text(text = book.authors, fontSize = 12.sp, color = White)
                    Text(text = "${book.price} RON", fontSize = 15.sp, color = Color.White)
                }
                OutlinedButton(
                    onClick = {
                        viewModel.addCartItem(book)
                              },
                    border = BorderStroke(1.dp, Color.Transparent),
                    shape = RoundedCornerShape(50),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = White, backgroundColor = MaterialTheme.colors.secondary),
                ){
                    Text( text = "Add to Cart" )
                }
            }
            Image(
                imageVector = Icons.Default.Info,
                contentDescription = "Info Icon",
                modifier = Modifier.padding(top = 6.dp, end = 6.dp),
                colorFilter = ColorFilter.tint(White)
            )
        }
    }
}


@Composable
fun CardSkeleton() {
    Card(
        modifier = Modifier
            .height(280.dp)
            .padding(top = 10.dp, start = 16.dp, end = 16.dp)
            .clickable { }
            .background(MaterialTheme.colors.background),
        shape = RoundedCornerShape(16.dp),
        elevation = 10.dp,
    ) {
        val infiniteTransition = rememberInfiniteTransition()
        val alpha by infiniteTransition.animateFloat(
            initialValue = 0.2f,
            targetValue = 1f,
            animationSpec = infiniteRepeatable(
                animation = keyframes {
                    durationMillis = 1000
                    0.7f at 500
                },
                repeatMode = RepeatMode.Reverse
            )
        )
        Box(modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colors.primary), contentAlignment = Alignment.TopEnd) {
            Column(modifier = Modifier
                .fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Spacer(modifier = Modifier.height(10.dp))
                Box(
                    modifier = Modifier
                        .height(140.dp)
                        .width(80.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(Color.LightGray.copy(alpha = alpha))
                )
                Spacer(modifier = Modifier.height(8.dp))
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(80.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ){
                    Box(modifier = Modifier
                        .height(40.dp)
                        .width(120.dp)
                        .background(Color.LightGray.copy(alpha = alpha))
                    ) {
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Box(modifier = Modifier
                        .height(40.dp)
                        .width(120.dp)
                        .background(Color.LightGray.copy(alpha = alpha))
                    ) {
                    }
                    Spacer(modifier = Modifier.height(16.dp))

                    Box(modifier = Modifier
                        .height(40.dp)
                        .width(120.dp)
                        .background(Color.LightGray.copy(alpha = alpha))
                    ) {
                    }
                }
                Spacer(modifier = Modifier.height(8.dp))

                Box(modifier = Modifier
                    .height(200.dp)
                    .width(150.dp)
                    .padding(bottom = 10.dp)
                    .background(Color.LightGray.copy(alpha = alpha))
                )
                Spacer(modifier = Modifier.height(4.dp))

            }
        }
    }
}
