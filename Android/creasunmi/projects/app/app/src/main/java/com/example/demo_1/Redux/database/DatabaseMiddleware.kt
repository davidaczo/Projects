package com.example.demo_1.Redux.database
import com.example.demo_1.Model.Flow.CameraViewStateContent
import com.example.demo_1.Model.database.StoreFront
import com.example.demo_1.Redux.Action
import com.example.demo_1.Redux.AppAction
import com.example.demo_1.Redux.AppState
import com.example.demo_1.Redux.Effect
import com.example.demo_1.Redux.Middleware
import com.example.demo_1.SumniPrinter.SunmiPrintHelper
import com.example.demo_1.localStorage.DeviceRepository
import com.google.gson.Gson
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.emptyFlow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOf
import org.koin.androidx.compose.inject
import org.koin.core.component.KoinComponent
import org.koin.core.component.inject
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.BatteryManager
import com.example.demo_1.AppContext
import com.example.demo_1.Model.database.CreateDevice
import com.example.demo_1.Model.database.Device
import java.net.NetworkInterface
import java.util.Calendar
import java.util.Collections

class DatabaseMiddleware() : Middleware<AppState>, KoinComponent {
    private val deviceRepository: DeviceRepository by inject()

    override suspend fun process(
        state: AppState,
        action: Action,
        sideEffect: MutableSharedFlow<Effect>
    ): Flow<Action> {

        println("DAVID action $action")
        return when(action) {
            is AppAction.DatabaseAction.InsertDevice -> flow {
//                val QrCode = action.result
//                var webSocketHello = gson.fromJson(QrCode, WebSocketHello::class.java)
                val currentTime = Calendar.getInstance()
                val currentHour = currentTime.get(Calendar.HOUR_OF_DAY)
                val currentMinute = currentTime.get(Calendar.MINUTE)
                val currentSecond = currentTime.get(Calendar.SECOND)
                deviceRepository.insertDevice(
                    CreateDevice(
                        serialNumber = SunmiPrintHelper.instance.printerSerialNo,
                        model = SunmiPrintHelper.instance.deviceModel,
                        appVersion = AppContext.getContext().packageManager.getPackageInfo(AppContext.getContext().packageName, 0).versionName,
                        localIP = getLocalIpAddress(),
                        locationLat = "",
                        locationLng = "",
                        mobileNetwork = "",
                        battery = getBatteryPercentage(AppContext.getContext()),
                        receiptPrintCount = 0,
                        autoPrint = 0,
                        playSoundOnOrder = 0,
                        addedAt = 0L,
                        lastOnline = 0L,
                    )
                )
//                SunmiPrintHelper.instance.printerSerialNo
//                SunmiPrintHelper.instance.deviceModel
//                AppContext.getContext().packageManager.getPackageInfo(AppContext.getContext().packageName, 0).versionName//                getLocalIpAddress()
//                    this@DatabaseMiddleware.getBatteryPercentage(AppContext.getContext())//
//                    val currentTime = Calendar.getInstance()
//                val currentHour = currentTime.get(Calendar.HOUR_OF_DAY)
//                val currentMinute = currentTime.get(Calendar.MINUTE)
//                val currentSecond = currentTime.get(Calendar.SECOND)
                println("DAVID database action")

//                state.db.addStoreFronts(StoreFront(
//                    1,"Test","Test", 10, 1)
//                )
            }
            else -> emptyFlow()
        }
    }

    fun getLocalIpAddress(): String? {
        try {
            val interfaces = Collections.list(NetworkInterface.getNetworkInterfaces())
            for (intf in interfaces) {
                val addresses = intf.inetAddresses
                for (address in addresses) {
                    if (!address.isLoopbackAddress && address.hostAddress.contains(":").not()) {
                        return address.hostAddress
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return null
    }

    fun getBatteryPercentage(context: Context): Int {
        val batteryStatus: Intent? = IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { ifilter ->
            context.registerReceiver(null, ifilter)
        }

        val level: Int = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
        val scale: Int = batteryStatus?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1

        return (level * 100 / scale.toFloat()).toInt()
    }
}
