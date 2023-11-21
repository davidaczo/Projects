package com.example.bookedinwithredux.addressScreen

sealed class AddressAction {
    data class CityChanged(val newCity: String): AddressAction()
    data class StreetChanged(val newStreet: String): AddressAction()
    data class NumberChanged(val newNumber: Int): AddressAction()
    data class DescriptionChanged(val newDescription: String): AddressAction()
}