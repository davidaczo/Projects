package com.example.bookedinwithkmm.android.home.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.MaterialTheme
import androidx.compose.material.OutlinedButton
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun HomePageButton(
    onClick: () -> Unit,
    painter: Painter? = null,
    imageVector: ImageVector? = null,
    text: String,
){
    OutlinedButton(onClick = {onClick()},
        modifier= Modifier
            .padding(top = 50.dp)
            .size(90.dp),
        shape = CircleShape,
        border= BorderStroke(0.dp, MaterialTheme.colors.primary),
        contentPadding = PaddingValues(0.dp),
        colors = ButtonDefaults.outlinedButtonColors(backgroundColor = MaterialTheme.colors.primary ),
        elevation = ButtonDefaults.elevation(100.dp)
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            if (imageVector == null && painter != null){
                Image(
                    painter = painter,
                    contentDescription = text,
                    Modifier.size(60.dp)
                )
            } else if(imageVector != null) {
                Image(
                    imageVector = imageVector,
                    contentDescription = text,
                    colorFilter = ColorFilter.tint(Color.White),
                    modifier = Modifier.size(60.dp)
                )
            }
            Text(text = text, fontWeight = FontWeight.Bold, color = MaterialTheme.colors.background)
        }
    }
}