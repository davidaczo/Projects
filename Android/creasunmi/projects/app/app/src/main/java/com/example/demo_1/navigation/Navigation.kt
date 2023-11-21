package com.electrolux.oneapp.android.common.pages.secure.provisioningflow

import android.annotation.SuppressLint
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavHostController
import android.content.Intent
import android.os.Build
import androidx.compose.animation.AnimatedVisibilityScope
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.animation.slideOutVertically
import androidx.navigation.NamedNavArgument
import androidx.navigation.NavBackStackEntry
import androidx.navigation.NavController
import androidx.navigation.NavOptionsBuilder
import com.google.accompanist.navigation.animation.composable
import com.example.demo_1.QRCode.CameraView
import com.example.demo_1.Views.Home
import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.BaseFlowState
import com.example.demo_1.Redux.ScreenStateIdentifier
import com.example.demo_1.Views.StoreViewModel
import com.google.accompanist.navigation.animation.AnimatedNavHost
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.StateFlow

@SuppressLint("SuspiciousIndentation")
@ExperimentalAnimationApi
@Composable
fun SunmiNavigation(
    viewModel: StoreViewModel,
    navController: NavHostController?,
) {
    val stateFlow: StateFlow<AppState> = viewModel.store.observeState()

    val state by stateFlow.collectAsState(Dispatchers.Main)
    val flowState = state.state

    val startDestination = remember { getStartDestination(state) }

    Box(
        modifier = Modifier
            .fillMaxSize()
    ) {}

    if (navController != null) {
        AnimatedNavHost(navController, startDestination = startDestination.name) {

            provisioningSlideComposable(ScreenStateIdentifier.HOME_VIEW.name, state) { screenState ->
                if (screenState is BaseFlowState.HomeViewState) {
                    Home(screenState, viewModel)
                }
            }

            provisioningSlideComposable(ScreenStateIdentifier.CAMERA_VIEW.name, state) { screenState ->
                if (screenState is BaseFlowState.CameraViewState) {
                    CameraView(screenState, viewModel)
                }
            }
        }
    }
}

@OptIn(ExperimentalAnimationApi::class)
fun NavGraphBuilder.provisioningSlideComposable(
    route: String,
    appState: AppState,
    content: @Composable (BaseFlowState?) -> Unit
) {
    val currentState = appState.state
    val previousState = appState.previousStates.lastOrNull()

    val screenState = when {
        currentState.stateIdentifier.name == route -> currentState
        previousState?.stateIdentifier?.name == route -> previousState
        else -> null
    }

    slideComposable(route, listOf()) {
        var lastScreenState by remember { mutableStateOf(screenState) }
        if (lastScreenState?.stateIdentifier == screenState?.stateIdentifier && lastScreenState != screenState) {
            lastScreenState = screenState
        }
        content(screenState ?: lastScreenState)
    }
}


private fun getStartDestination(flowState: AppState): ScreenStateIdentifier {
    val firstStateIdentifier =
        if (flowState.previousStates.size < 2) {
            flowState.state.stateIdentifier
        } else {
            flowState.previousStates[1].stateIdentifier
        }

    return when (firstStateIdentifier) {
        ScreenStateIdentifier.HOME_VIEW -> firstStateIdentifier
        else -> ScreenStateIdentifier.CAMERA_VIEW
    }
}

val transitionDuration = 400
val slideTransitionDelay = 200
@ExperimentalAnimationApi
fun NavGraphBuilder.presentComposable(
    route: String,
    arguments: List<NamedNavArgument> = listOf(),
    content: @Composable AnimatedVisibilityScope.(NavBackStackEntry) -> Unit
) {
    composable(route,
        arguments = arguments,
        enterTransition = {
            slideInVertically(initialOffsetY = { it }, animationSpec = tween(transitionDuration))
        }, popExitTransition = {
            slideOutVertically(targetOffsetY = { it }, animationSpec = tween(transitionDuration))
        }, popEnterTransition = {
            fadeIn(initialAlpha = 0.5f, animationSpec = tween(transitionDuration))
        }, content = content)
}

@ExperimentalAnimationApi
fun NavGraphBuilder.slideComposable(
    route: String,
    arguments: List<NamedNavArgument> = listOf(),
    content: @Composable AnimatedVisibilityScope.(NavBackStackEntry) -> Unit
) {
    composable(route,
        arguments = arguments,
        enterTransition = {
            slideInHorizontally(initialOffsetX = { it }, animationSpec = tween(transitionDuration, slideTransitionDelay))
        }, exitTransition = {
            fadeOut(targetAlpha = 0.5f, animationSpec = tween(transitionDuration))
        }, popExitTransition = {
            slideOutHorizontally(targetOffsetX = { it }, animationSpec = tween(transitionDuration))
        }, popEnterTransition = {
            fadeIn(initialAlpha = 0.5f, animationSpec = tween(transitionDuration, slideTransitionDelay))
        }, content = content)
}

@ExperimentalAnimationApi
fun NavGraphBuilder.slideComposableWithBottomExit(
    route: String,
    arguments: List<NamedNavArgument> = listOf(),
    content: @Composable AnimatedVisibilityScope.(NavBackStackEntry) -> Unit
) {
    composable(route,
        arguments = arguments,
        enterTransition = {
            slideInHorizontally(initialOffsetX = { it }, animationSpec = tween(transitionDuration, slideTransitionDelay))
        }, exitTransition = {
            slideOutVertically(targetOffsetY = { it }, animationSpec = tween(transitionDuration))
        }, popExitTransition = {
            slideOutHorizontally(targetOffsetX = { it }, animationSpec = tween(transitionDuration))
        }, popEnterTransition = {
            fadeIn(initialAlpha = 0.5f, animationSpec = tween(transitionDuration, slideTransitionDelay))
        }, content = content)
}

/**
 * allows popping up to destination while clearing all backstack entries
 */
fun NavOptionsBuilder.popUpToTop(navController: NavController) {
    popUpTo(navController.currentBackStackEntry?.destination?.route ?: return) {
        inclusive =  true
    }
}

/**
 * A hack because popUpTo does not support arguments in routes
 */
fun NavController.navigateBack(route: String) {
    val uri = "android-app://androidx.navigation/$route"

    val entry = this.backQueue.firstOrNull {
        if (Build.VERSION.SDK_INT >= 33) {
            it.arguments?.getParcelable(NavController.KEY_DEEP_LINK_INTENT, Intent::class.java)?.data.toString() == uri
        } else {
            @Suppress("DEPRECATION")
            it.arguments?.getParcelable<Intent>(NavController.KEY_DEEP_LINK_INTENT)?.data.toString() == uri
        }
    }

    entry?.let {
        this.popBackStack(it.destination.id, false)
    }
}

/**
 * Navigate to route if it exists, otherwise call failed. Safer navigation without exceptions when using dynamic routes.
 */
fun NavController?.safeNavigate(route: String, failed: () -> Unit = {}) {
    try {
        this?.navigate(route)
    } catch (_: Exception) {
        failed()
    }
}
