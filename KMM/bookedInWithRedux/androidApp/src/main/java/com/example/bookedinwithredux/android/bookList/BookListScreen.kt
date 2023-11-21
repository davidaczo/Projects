package com.example.bookedinwithredux.android.bookList

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.runtime.*
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.bookedinwithredux.android.Screen
import com.example.bookedinwithredux.android.bookList.components.BookListItem
import com.example.bookedinwithredux.android.bookList.components.CardSkeleton
import com.example.bookedinwithredux.android.bookList.components.Header
import com.example.bookedinwithredux.redux.UiActions
import com.example.bookedinwithredux.redux.VirtualStore

@Composable
fun BookListScreen(
    navController: NavController,
    viewModel: BookListViewModel = hiltViewModel()
) {
    val state = viewModel.state

    LaunchedEffect(key1 = true) {
        VirtualStore.dispatch(UiActions.LoadCartItemsCount())
    }

    Scaffold(
        topBar = { Header(viewModel = viewModel, navController = navController) }
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colors.background)
                .padding(it)
        ) {
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                verticalArrangement = Arrangement.spacedBy(16.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                if (state.value.isLoading) {
                    items(6) {
                        CardSkeleton()
                    }
                } else {
                    items(state.value.books) { book ->
                        BookListItem(book = book, onItemClick = {
                            navController.navigate(Screen.BookDetailScreen.route + "/${book.id}")
                        }, viewModel = viewModel)
                    }
                }
            }

            if (state.value.error.isNotBlank()) {
                Text(
                    text = state.value.error,
                    color = MaterialTheme.colors.error,
                    textAlign = TextAlign.Center,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 20.dp)
                        .align(Alignment.Center)
                )
            }
        }
    }
}
