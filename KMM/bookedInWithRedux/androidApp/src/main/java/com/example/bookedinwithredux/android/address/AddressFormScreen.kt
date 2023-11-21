package com.example.bookedinwithredux.android.address

import android.widget.Toast
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.core.text.isDigitsOnly
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.bookedinwithredux.android.Screen

@Composable
fun AddressFormScreen(
    viewModel: AddressFormViewModel = hiltViewModel(),
    navController: NavController
) {
    val state = viewModel.state
    val context = LocalContext.current

    var city by remember { mutableStateOf(state.value.city) }
    var street by remember { mutableStateOf(state.value.street) }
    var number by remember { mutableStateOf(if (state.value.number>0) state.value.number.toString() else "") }
    var description by remember { mutableStateOf(state.value.description) }
    var initialCall by remember { mutableStateOf(false) }

    var buttonPressed by remember { mutableStateOf(false) }
    if(initialCall) {
        LaunchedEffect(key1 = buttonPressed ) {
            var valid = true

            if(!number.isDigitsOnly() || number.isBlank() || city.isBlank() || street.isBlank()) {
                valid = false
            }
            if (valid) {
//                navController.navigate(Screen.OrderReview.withArgs(city, street, number))
            } else {
                Toast.makeText(context,"Invalid address, please check your form.", Toast.LENGTH_LONG).show()
            }
        }
    }

    Column(modifier = Modifier
        .fillMaxSize()
        .background(Color.White)
        .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.SpaceAround

    ) {
        Column(Modifier.fillMaxWidth()) {
            Text(text = "Address", style = MaterialTheme.typography.h2, modifier = Modifier.fillMaxWidth(), textAlign = TextAlign.Center)
            OutlinedTextField(
                value = city,
                label = { Text("City") },
                onValueChange = {
                    city = it

                },
                modifier = Modifier.fillMaxWidth()
            )
            OutlinedTextField(
                value = street,
                label = { Text("Street") },
                onValueChange = {
                    street = it
                },
                modifier = Modifier.fillMaxWidth()
            )
            OutlinedTextField(
                value = number,
                label = { Text("Number") },
                onValueChange = {
                    number = it
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier.fillMaxWidth()
            )
            OutlinedTextField(
                value = description,
                label = { Text("Description") },
                onValueChange = {
                    description = it
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(100.dp)
            )
        }

        OutlinedButton(
            modifier = Modifier
                .padding(horizontal = 10.dp)
                .fillMaxWidth()
                .height(50.dp),
            onClick = {
                initialCall = true
                buttonPressed = !buttonPressed
                            navController.navigate(Screen.OrderReview.withArgs(city, street, number))
                      },
            border = BorderStroke(1.dp, Color.Transparent),
            shape = RoundedCornerShape(50),
            colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White, backgroundColor = MaterialTheme.colors.secondary),
        ){
            Text( text = "FINISH ORDER!" )
        }
    }
}
