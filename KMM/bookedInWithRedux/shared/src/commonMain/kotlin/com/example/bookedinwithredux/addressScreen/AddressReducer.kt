package com.example.bookedinwithredux.addressScreen

fun addressReducer(currentState: AddressState, action: Any): AddressState =
    when (action) {
        is AddressAction.CityChanged -> {
            stateAfterCityChange(currentState, action)
        }
        is AddressAction.StreetChanged -> {
            stateAfterStreetChange(currentState, action)
        }
        is AddressAction.NumberChanged -> {
            stateAfterNumberChange(currentState, action)
        }
        is AddressAction.DescriptionChanged -> {
            stateAfterDescriptionChange(currentState, action)
        }
        else -> currentState
    }

private fun stateAfterDescriptionChange(
    currentState: AddressState,
    action: AddressAction.DescriptionChanged
) = currentState.copy(
    description = action.newDescription
)

private fun stateAfterNumberChange(
    currentState: AddressState,
    action: AddressAction.NumberChanged
) = currentState.copy(
    number = action.newNumber
)

private fun stateAfterStreetChange(
    currentState: AddressState,
    action: AddressAction.StreetChanged
) = currentState.copy(
    street = action.newStreet
)

private fun stateAfterCityChange(
    currentState: AddressState,
    action: AddressAction.CityChanged
) = currentState.copy(
    city = action.newCity
)