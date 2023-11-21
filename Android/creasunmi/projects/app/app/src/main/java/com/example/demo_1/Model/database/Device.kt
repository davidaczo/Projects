package com.example.demo_1.Model.database

data class Device(
    val id: Long,
    val serialNumber: String,
    val model: String,
    val appVersion: String?,
    val localIP: String?,
    val locationLat: String?,
    val locationLng: String?,
    val mobileNetwork: String?,
    val battery: Int?,
    val receiptPrintCount: Int,
    val autoPrint: Int,
    val playSoundOnOrder: Int,
    val addedAt: Long,
    val lastOnline: Long
)

data class CreateDevice(
    val serialNumber: String,
    val model: String,
    val appVersion: String?,
    val localIP: String?,
    val locationLat: String?,
    val locationLng: String?,
    val mobileNetwork: String?,
    val battery: Int?,
    val receiptPrintCount: Int,
    val autoPrint: Int,
    val playSoundOnOrder: Int,
    val addedAt: Long,
    val lastOnline: Long
)