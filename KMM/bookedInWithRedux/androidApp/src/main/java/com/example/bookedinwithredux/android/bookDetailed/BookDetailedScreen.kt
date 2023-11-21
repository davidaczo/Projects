package com.example.bookedinwithredux.android.bookDetailed

import android.widget.ProgressBar
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.Divider
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import coil.compose.rememberAsyncImagePainter

@Composable
fun BookDetailedScreen(
    viewModel: BookDetailedViewModel = hiltViewModel()
){
    val state = viewModel.state
    Box(modifier = Modifier
        .fillMaxSize()
        .background(MaterialTheme.colors.secondary)) {

        if (state.value.isLoading) {
            CircularProgressIndicator()
        } else {
            state.value.book?.let { book ->
                LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp)) {
                    item {
                        Column(modifier = Modifier.fillMaxSize(),horizontalAlignment = Alignment.CenterHorizontally) {
                            Image(
                                painter = rememberAsyncImagePainter(book.image_url),
                                contentDescription = null,
                                contentScale = ContentScale.FillBounds,
                                modifier = Modifier
                                    .height(300.dp)
                                    .width(200.dp)
                                    .clip(RoundedCornerShape(10.dp))
                            )
                            Spacer(modifier = Modifier.height(32.dp))
                            Text(
                                text = book.title,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold,
                                textAlign = TextAlign.Center,
                                color = Color.White,
                                maxLines = 2
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(text = book.authors, fontSize = 16.sp, color = Color.White)
                            Divider(modifier = Modifier.padding(top = 16.dp))
                            Row(modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween) {
                                Column(modifier = Modifier.fillMaxHeight()) {
                                    Text(text = "Number of pages:", fontWeight = FontWeight.Bold, color = Color.White)
                                    Text(text = book.num_pages.toString( ),color = Color.White)
                                }
                                Column(modifier = Modifier.fillMaxHeight()) {
                                    Text(text = "Rating", fontWeight = FontWeight.Bold,color = Color.White)
                                    Text(text = book.rating.toString(),color = Color.White)
                                }
                            }
                            Divider(modifier = Modifier.padding(top = 16.dp))
                            Text(text = "Qutes:", fontWeight = FontWeight.Bold, color = Color.White)
                            Text(text = book.Quote1, color = Color.White)
                            Text(text = book.Quote2, color = Color.White)
                            Divider(modifier = Modifier.padding(top = 16.dp))
                            Text(text = "Description:", fontWeight = FontWeight.Bold, color = Color.White)
                            Text(text = book.description, color = Color.White)
                        }
                    }
                }
            }

        }
    }
}
