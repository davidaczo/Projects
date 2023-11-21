package com.example.demo_1.QRCode

import android.Manifest
import android.content.pm.PackageManager
import android.util.Size
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.example.demo_1.Model.Flow.CameraViewStateContent
import com.example.demo_1.Model.websocket.WebSocketHello
import com.example.demo_1.Redux.AppAction
import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.BaseFlowState
import com.example.demo_1.Views.Common.OspatarulButton
import com.example.demo_1.Views.Common.OspatarulTextInput
import com.example.demo_1.Views.StoreViewModel
import com.example.demo_1.ui.theme.OspatarulYellow
import com.google.gson.Gson
import kotlinx.coroutines.launch
import org.koin.androidx.compose.getViewModel
import org.koin.androidx.compose.inject
import java.lang.Exception

@Composable
fun CameraView(
    state: BaseFlowState.CameraViewState = CameraViewStateContent().getCameraViewState(),
    viewModel: StoreViewModel = getViewModel()
) {
    val gson = Gson()
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current
    var clientId by rememberSaveable {
        mutableStateOf(state.clientId)
    }
    var secretKey by rememberSaveable {
        mutableStateOf(state.secretKey)
    }
    val cameraProviderFuture = remember {
        ProcessCameraProvider.getInstance(context)
    }
    var hasCameraPermission by remember {
        mutableStateOf(
            ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.CAMERA
            ) == PackageManager.PERMISSION_GRANTED
        )
    }
    val navigationKey = remember { mutableStateOf(0) }

    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission(),
        onResult = { granted ->
            hasCameraPermission = granted
        })

    LaunchedEffect(key1 = true) {
        launcher.launch(Manifest.permission.CAMERA)
    }

    DisposableEffect(navigationKey.value) {
        onDispose {
            val cameraProvider = cameraProviderFuture.get()
            cameraProvider.unbindAll()
            // Additional cleanup logic if needed
        }
    }
    // A surface container using the 'background' color from the theme
    Surface(modifier = Modifier.fillMaxSize(), color = OspatarulYellow) {
        Column {
            if (hasCameraPermission) {
                AndroidView(
                    factory = { ctx ->
                        val previewView = PreviewView(ctx)
                        val preview = Preview.Builder().build()

                        val selector = CameraSelector.Builder()
                            .requireLensFacing(CameraSelector.LENS_FACING_BACK)
                            .build()

                        preview.setSurfaceProvider(previewView.surfaceProvider)

                        val imageAnalysis = ImageAnalysis.Builder()
                            .setTargetResolution(Size(previewView.width, previewView.height))
                            .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                            .build()

                        imageAnalysis.setAnalyzer(
                            ContextCompat.getMainExecutor(ctx),
                            QrCodeAnalyzer { result ->
                                var webSocketHello =
                                    gson.fromJson(result, WebSocketHello::class.java)
                                clientId = webSocketHello.clientId
                                secretKey = webSocketHello.secretKey
                                println("DAVID sdata ws  $clientId $secretKey")

                            }
                        )
                        try {
                            cameraProviderFuture.get().bindToLifecycle(
                                lifecycleOwner,
                                selector,
                                preview,
                                imageAnalysis
                            )
                        } catch (e: Exception) {
                            e.printStackTrace()
                        }

                        previewView
                    },
                    modifier = Modifier.weight(0.8f),
                    update = { view ->
//                    val cameraProvider = cameraProviderFuture.get()
//
//                    // Check if the condition to unbind resources is met
//                    if (navigationKey) {
//                        cameraProvider.unbindAll()
//                        // Additional cleanup logic if needed
//                    }

                        // Update the view if necessary
                        // e.g., modify view properties based on new state or props

                        // Perform any other view updates or operations here
                    }
                )
            } else {
                Column(verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.weight(0.8f)) {
                    Text("Please enable camera")
                    OspatarulButton(text ="Enable Camera", minHeight = 30, minWidth = 50, onClick = { launcher.launch(Manifest.permission.CAMERA)})
                }
            }
            Column(modifier = Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
                Column(modifier = Modifier.fillMaxWidth(),horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
                    OspatarulTextInput(
                        Modifier.fillMaxWidth().padding(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 4.dp),
                        label = "ClientId",
                        value = clientId) { newValue ->
                        clientId = newValue
                    }
                    OspatarulTextInput(
                        Modifier.fillMaxWidth().padding(start = 16.dp, end = 16.dp, top = 4.dp, bottom = 0.dp),
                        label = "Secret Key",
                        value = secretKey) { newValue ->
                        secretKey = newValue
                    }
                }
                OspatarulButton(modifier = Modifier.padding(horizontal = 24.dp, vertical = 16.dp), text = "Login",minHeight = 50, minWidth = 300, onClick = {
                    viewModel.dispatch(AppAction.WebSocketAction.Login(clientId, secretKey))
                    navigationKey.value++
                    }
                )

            }
        }
    }
}
