package com.example.bookedinwithredux.android.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material.MaterialTheme
import androidx.compose.material.darkColors
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val darkerGreen = Color(0xFF328579)
val lighterGreen = Color(0xFF93CDB5)
private val DarkColorPalette = darkColors(
    primary = darkerGreen,
    secondary = lighterGreen,
    background = Color.Black
)

private val LightColorPalette = lightColors(
    primary = lighterGreen,
    secondary = darkerGreen,
    background = Color.White
    /* Other default colors to override
    background = Color.White,
    surface = Color.White,
    onPrimary = Color.White,
    onSecondary = Color.Black,
    onBackground = Color.Black,
    onSurface = Color.Black,
    */

)

@Composable
fun BookedInTheme(darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit) {
    val colors = if (darkTheme) {
        DarkColorPalette
    } else {
        LightColorPalette
    }

    MaterialTheme(
        colors = colors,
        typography = Typography,
        shapes = Shapes,
        content = content
    )
}