package com.example.demo_1.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material.MaterialTheme
import androidx.compose.material.darkColors
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable

private val ColorPalette = darkColors(
        primary = OspatarulYellow,
        primaryVariant = OspatarulYellowSecondary,
        secondary = OspatarulPurple,
        secondaryVariant = OspatarulPurpleSecondary,
        background = OspatarulWhite,
)

//private val LightColorPalette = lightColors(
//        primary = Purple500,
//        primaryVariant = Purple700,
//        secondary = Teal200

        /* Other default colors to override
    background = Color.White,
    surface = Color.White,
    onPrimary = Color.White,
    onSecondary = Color.Black,
    onBackground = Color.Black,
    onSurface = Color.Black,
    */


@Composable
fun OspatarulTheme(darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit) {
    val colors =  ColorPalette

    MaterialTheme(
            colors = colors,
            typography = Typography,
            shapes = Shapes,
            content = content
    )
}