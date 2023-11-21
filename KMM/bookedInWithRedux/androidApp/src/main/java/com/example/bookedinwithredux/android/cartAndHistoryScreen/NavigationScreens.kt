package com.example.bookedinwithredux.android.cartAndHistoryScreen

sealed class NavigationItem(var route: String, var title: String) {
    object CartScreen: NavigationItem("cart_screen","Cart")
    object OrderScreen: NavigationItem("order_history_screen","Orders")
}