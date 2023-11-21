package com.example.demo_1.Views.Common.Button

import androidx.compose.material.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import com.example.demo_1.ui.theme.OspatarulPurple
import com.example.demo_1.ui.theme.OspatarulWhite
import com.example.demo_1.ui.theme.OspatarulYellow

enum class ButtonType(

) {
    PRIMARY(),
    SECONDARY(),
    TEXT();

    val mainColor: Color
        @Composable
        get() = when (this) {
            PRIMARY -> OspatarulPurple
            SECONDARY -> OspatarulYellow
            TEXT -> OspatarulWhite
        }

    val contentColor: Color
        @Composable
        get() = when (this) {
            PRIMARY -> OspatarulYellow
            SECONDARY -> OspatarulPurple
            TEXT -> OspatarulWhite
        }
}

enum class ButtonStatus{
    NEUTRAL,
    IN_PROGRESS,
    SUCCESS
}