package com.example.demo_1

import android.content.Context
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.lifecycle.lifecycleScope
import androidx.navigation.NavHostController
import com.electrolux.oneapp.android.common.pages.secure.provisioningflow.SunmiNavigation
import com.example.demo_1.Model.Flow.CameraViewStateContent
import com.example.demo_1.Redux.Action
import com.example.demo_1.Redux.AppAction
import com.example.demo_1.Redux.AppMiddleware
import com.example.demo_1.Redux.AppReducer
import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.BaseFlowState
import com.example.demo_1.Redux.Effect
import com.example.demo_1.Redux.ReduxStore
import com.example.demo_1.Redux.RootReducer
import com.example.demo_1.Redux.Store
import com.example.demo_1.Redux.Websocket.WebSocketMiddleware
import com.example.demo_1.Redux.Websocket.WebSocketReducer
import com.example.demo_1.Redux.database.DatabaseMiddleware
import com.example.demo_1.Redux.database.DatabaseReducer
import com.example.demo_1.Redux.screenFlow.ScreenFlowReducer
import com.example.demo_1.SumniPrinter.SunmiPrintHelper
import com.example.demo_1.Views.StoreViewModel
import com.example.demo_1.localStorage.DBManager
import com.example.demo_1.localStorage.DeviceRepository
import com.example.demo_1.ui.theme.OspatarulTheme
import com.google.accompanist.navigation.animation.rememberAnimatedNavController
import kotlinx.coroutines.launch
import org.koin.core.component.inject
import org.koin.core.component.KoinComponent
import org.koin.core.context.startKoin
import org.koin.dsl.module


@ExperimentalAnimationApi
class MainActivity : ComponentActivity(), KoinComponent {
    private var navController: NavHostController? =null

    val viewModel : StoreViewModel by inject()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val printer = SunmiPrintHelper.instance.initSunmiPrinterService(this)
        val db = DBManager(this, null)
        AppContext.setContext(applicationContext)
        db.writableDatabase
        db.close();
        println("DAVID db" + db.databaseName)
        val storeModule = module {
            single<Store<AppState, Action, Effect>> {
                ReduxStore(
                    reducer = RootReducer(appReducer = get(), screenFlowReducer = get() , webSocketReducer = get(), databaseReducer = get()),
                    defaultValue = AppState(
                        BaseFlowState.CameraViewState("",""),
                        emptyList(),
                        false,
                        db
                    ),
                    middlewares = listOf(AppMiddleware(), WebSocketMiddleware(), DatabaseMiddleware())
                )
            }
            single { WebSocketReducer() }

            single { AppReducer() }

            single { ScreenFlowReducer() }

            single { DatabaseReducer() }

            single { StoreViewModel(get()) }

            single { CameraViewStateContent() }

            single { DeviceRepository(applicationContext) }
        }
        startKoin {
            modules(storeModule)
        }

        setContent {
            navController = rememberAnimatedNavController()
            OspatarulTheme {
                SunmiNavigation(viewModel, navController)
            }
            Navigate()
            onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    viewModel.dispatch(AppAction.ScreenFlowAction.GoBack)
                }
            })
        }
    }
    fun getAppVersion(context: Context): String {
        try {
            val packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
            return packageInfo.versionName
        } catch (e: PackageManager.NameNotFoundException) {
            e.printStackTrace()
        }
        return ""
    }

    // Usage example:
//    val appVersion = getAppVersion(applicationContext)
    @Composable
    private fun Navigate() {
        LaunchedEffect(key1 = LocalLifecycleOwner.current) {
            lifecycleScope.launch {
                viewModel.store.observeState().collect { appState ->
                    val newRoute = appState.state.stateIdentifier.name
                    println("DAVID mainactivity $appState")
                    if (navController?.backQueue?.last()?.destination?.route != newRoute) {
                        if(appState.isMovingBack) {
                              navController?.popBackStack(newRoute, false)
                        } else {
                              navController?.navigate(newRoute)
                        }
                    }
                }
            }
        }
    }
}
class AppContext {
    companion object {
        private lateinit var appContext: Context

        fun setContext(context: Context) {
            appContext = context.applicationContext
        }

        fun getContext(): Context {
            return appContext
        }
    }
}
//@Composable
//fun SunmiButtonComponent(store: ReduxStore) {
//    Button(onClick = {
//        SunmiPrintHelper.instance.printText("( Hello world!",60.0f,true,false,null)
//        SunmiPrintHelper.instance.feedPaper()
//        WebSocketEcho.Companion.main(emptyArray())
//    }) {
//        Text(text = "Click to send data to websocket!")
//        store.dispatch(AppAction.GoToSecondaryScreen)
//    }
//}