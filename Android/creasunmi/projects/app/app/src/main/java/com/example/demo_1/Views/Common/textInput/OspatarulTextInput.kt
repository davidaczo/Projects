package com.example.demo_1.Views.Common

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.material.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.Placeholder
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp
import com.example.demo_1.ui.theme.OspatarulGray
import com.example.demo_1.ui.theme.OspatarulPurple
import com.example.demo_1.ui.theme.OspatarulPurpleSecondary
import com.example.demo_1.ui.theme.OspatarulYellow
import com.example.demo_1.ui.theme.OspatarulYellowSecondary

@Composable
fun OspatarulTextInput(
    modifier: Modifier = Modifier,
    label : String = "",
    placeholder: String = "",
    value: String = "",
    onValueChange:  (String) -> Unit
) {
//    var text by remember { mutableStateOf(value) }
    TextField(
        modifier = modifier.background( OspatarulYellowSecondary, RoundedCornerShape(8.dp)),
        value = value,
        onValueChange = onValueChange,
        label = { Text(text = label, color = OspatarulPurpleSecondary) },
        placeholder = { Text(text = placeholder) },
        textStyle = TextStyle(color = OspatarulPurple, fontWeight = FontWeight.Bold),
        colors = TextFieldDefaults.textFieldColors(
            cursorColor = OspatarulPurple
        )
    )
}