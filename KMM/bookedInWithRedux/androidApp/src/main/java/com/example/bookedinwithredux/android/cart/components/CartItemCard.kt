package com.example.bookedinwithredux.android.cart.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.RemoveCircle
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import coil.compose.rememberAsyncImagePainter
import com.example.bookedinwithredux.android.cart.CartViewModel
import com.example.bookedinwithredux.model.CartItem

@Composable
fun CartItemCard(
    viewModel: CartViewModel,
    cartItem: CartItem
) {

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(170.dp)
            .padding(top = 10.dp, start = 32.dp, end = 32.dp)
            .clickable { },
        shape = RoundedCornerShape(16.dp),
        elevation = 70.dp,
    ) {

        Spacer(modifier = Modifier.height(10.dp))
        Row(
            modifier = Modifier.background(MaterialTheme.colors.primary),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Image(
                painter = rememberAsyncImagePainter(cartItem.image_url),
                contentDescription = null,
                contentScale = ContentScale.FillBounds,
                modifier = Modifier
                    .height(160.dp)
                    .width(100.dp)
                    .clip(RoundedCornerShape(10.dp))
            )
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(text = cartItem.title)
                Text(
                    text = cartItem.authors,
                    fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Center
                )
                Divider(
                    Modifier
                        .fillMaxWidth()
                        .padding(vertical = 16.dp)
                )
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(text = "Price")
                        Text(text = "${cartItem.quantity * 50}")
                    }
                    Spacer(modifier = Modifier.width(40.dp))
                    Row {
                        Icon(imageVector = Icons.Default.RemoveCircle,
                            contentDescription = "",
                            modifier = Modifier
                                .padding(horizontal = 4.dp)
                                .clickable {
                                    viewModel.removeCartItem(cartItem)
                                })
                        Text(text = cartItem.quantity.toString())
                        Icon(imageVector = Icons.Default.AddCircle,
                            contentDescription = "",
                            modifier = Modifier
                                .padding(horizontal = 4.dp)
                                .clickable {
                                    viewModel.addCartItem(cartItem)
                                })
                    }
                }
            }
        }
    }
}