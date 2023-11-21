package com.example.demo_1.localStorage

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import com.example.demo_1.Model.database.CreateDevice
import com.example.demo_1.Model.database.Device
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_ADDED_AT
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_APP_VERSION
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_AUTO_PRINT
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_BATTERY
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_ID
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_LAST_ONLINE
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_LOCAL_IP
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_LOCATION_LAT
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_LOCATION_LNG
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_MOBILE_NETWORK
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_MODEL
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_PLAY_SOUND_ON_ORDER
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_RECEIPT_PRINT_COUNT
import com.example.demo_1.localStorage.DBManager.Companion.COLUMN_DEVICE_SERIAL_NUMBER
import com.example.demo_1.localStorage.DBManager.Companion.TABLE_DEVICES

class DeviceRepository (context: Context) {
    private val dbHelper: DBManager // Replace with your actual DatabaseHelper class
    private val database: SQLiteDatabase

    init {
        dbHelper = DBManager(context, null)
        database = dbHelper.writableDatabase
    }

    fun insertDevice(device: CreateDevice): Long {
        val values = ContentValues().apply {
            put(COLUMN_DEVICE_SERIAL_NUMBER, device.serialNumber)
            put(COLUMN_DEVICE_MODEL, device.model)
            put(COLUMN_DEVICE_APP_VERSION, device.appVersion)
            put(COLUMN_DEVICE_LOCAL_IP, device.localIP)
            put(COLUMN_DEVICE_LOCATION_LAT, device.locationLat)
            put(COLUMN_DEVICE_LOCATION_LNG, device.locationLng)
            put(COLUMN_DEVICE_MOBILE_NETWORK, device.mobileNetwork)
            put(COLUMN_DEVICE_BATTERY, device.battery)
            put(COLUMN_DEVICE_RECEIPT_PRINT_COUNT, device.receiptPrintCount)
            put(COLUMN_DEVICE_AUTO_PRINT, device.autoPrint)
            put(COLUMN_DEVICE_PLAY_SOUND_ON_ORDER, device.playSoundOnOrder)
            put(COLUMN_DEVICE_ADDED_AT, device.addedAt)
            put(COLUMN_DEVICE_LAST_ONLINE, device.lastOnline)
        }

        return database.insert(TABLE_DEVICES, null, values)
    }
    fun getDevice(deviceId: Long): Device? {
        val db = database
        val columns = arrayOf(
            COLUMN_DEVICE_ID,
            COLUMN_DEVICE_SERIAL_NUMBER,
            COLUMN_DEVICE_MODEL,
            COLUMN_DEVICE_APP_VERSION,
            COLUMN_DEVICE_LOCAL_IP,
            COLUMN_DEVICE_LOCATION_LAT,
            COLUMN_DEVICE_LOCATION_LNG,
            COLUMN_DEVICE_MOBILE_NETWORK,
            COLUMN_DEVICE_BATTERY,
            COLUMN_DEVICE_RECEIPT_PRINT_COUNT,
            COLUMN_DEVICE_AUTO_PRINT,
            COLUMN_DEVICE_PLAY_SOUND_ON_ORDER,
            COLUMN_DEVICE_ADDED_AT,
            COLUMN_DEVICE_LAST_ONLINE
        )
        val selection = "$COLUMN_DEVICE_ID = ?"
        val selectionArgs = arrayOf(deviceId.toString())

        var device: Device? = null
        val cursor: Cursor? = db.query(
            TABLE_DEVICES,
            columns,
            selection,
            selectionArgs,
            null,
            null,
            null
        )

        cursor?.use {
            if (it.moveToFirst()) {
                val idIndex = it.getColumnIndex(COLUMN_DEVICE_ID)
                val serialNumberIndex = it.getColumnIndex(COLUMN_DEVICE_SERIAL_NUMBER)
                val modelIndex = it.getColumnIndex(COLUMN_DEVICE_MODEL)
                val appVersionIndex = it.getColumnIndex(COLUMN_DEVICE_APP_VERSION)
                val localIPIndex = it.getColumnIndex(COLUMN_DEVICE_LOCAL_IP)
                val locationLatIndex = it.getColumnIndex(COLUMN_DEVICE_LOCATION_LAT)
                val locationLngIndex = it.getColumnIndex(COLUMN_DEVICE_LOCATION_LNG)
                val mobileNetworkIndex = it.getColumnIndex(COLUMN_DEVICE_MOBILE_NETWORK)
                val batteryIndex = it.getColumnIndex(COLUMN_DEVICE_BATTERY)
                val receiptPrintCountIndex = it.getColumnIndex(COLUMN_DEVICE_RECEIPT_PRINT_COUNT)
                val autoPrintIndex = it.getColumnIndex(COLUMN_DEVICE_AUTO_PRINT)
                val playSoundOnOrderIndex = it.getColumnIndex(COLUMN_DEVICE_PLAY_SOUND_ON_ORDER)
                val addedAtIndex = it.getColumnIndex(COLUMN_DEVICE_ADDED_AT)
                val lastOnlineIndex = it.getColumnIndex(COLUMN_DEVICE_LAST_ONLINE)

                val id = it.getLong(idIndex)
                val serialNumber = it.getString(serialNumberIndex)
                val model = it.getString(modelIndex)
                val appVersion = it.getString(appVersionIndex)
                val localIP = it.getString(localIPIndex)
                val locationLat = it.getString(locationLatIndex)
                val locationLng = it.getString(locationLngIndex)
                val mobileNetwork = it.getString(mobileNetworkIndex)
                val battery = it.getInt(batteryIndex)
                val receiptPrintCount = it.getInt(receiptPrintCountIndex)
                val autoPrint = it.getInt(autoPrintIndex)
                val playSoundOnOrder = it.getInt(playSoundOnOrderIndex)
                val addedAt = it.getLong(addedAtIndex)
                val lastOnline = it.getLong(lastOnlineIndex)

                device = Device(
                    id,
                    serialNumber,
                    model,
                    appVersion,
                    localIP,
                    locationLat,
                    locationLng,
                    mobileNetwork,
                    battery,
                    receiptPrintCount,
                    autoPrint,
                    playSoundOnOrder,
                    addedAt,
                    lastOnline
                )
            }
        }

        cursor?.close()
        db.close()

        return device
    }

}