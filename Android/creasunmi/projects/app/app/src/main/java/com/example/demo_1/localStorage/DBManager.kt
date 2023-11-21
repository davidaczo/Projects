package com.example.demo_1.localStorage

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

class DBManager(context: Context, factory: SQLiteDatabase.CursorFactory?) :
    SQLiteOpenHelper(context, DATABASE_NAME, factory, DATABASE_VERSION) {


    override fun onUpgrade(db: SQLiteDatabase, p1: Int, p2: Int) {
        db.execSQL("DROP TABLE IF EXISTS $TABLE_PRODUCTS")
        db.execSQL("DROP TABLE IF EXISTS $TABLE_STOREFRONTS")
        db.execSQL("DROP TABLE IF EXISTS $TABLE_SCHEDULES")
        db.execSQL("DROP TABLE IF EXISTS $TABLE_CLIENTS")
        db.execSQL("DROP TABLE IF EXISTS $TABLE_DEVICES")
        db.execSQL("DROP TABLE IF EXISTS $TABLE_EVENTS")
        db.execSQL("DROP TABLE IF EXISTS $TABLE_EXCEPTIONS")
        onCreate(db)
    }

//    fun fetch(): Cursor? {
//        val columns =
//            arrayOf<String>(DatabaseHelper._ID, DatabaseHelper.SUBJECT, DatabaseHelper.DESC)
//        val cursor: Cursor =
//            database.query(DatabaseHelper.TABLE_NAME, columns, null, null, null, null, null)
//        if (cursor != null) {
//            cursor.moveToFirst()
//        }
//        return cursor
//    }

    // below method is to get
    // all data from our database
//    @SuppressLint("Range", "Recycle")
//    fun getName(): String? {
//
//        // here we are creating a readable
//        // variable of our database
//        // as we want to read value from it
//        val db = this.readableDatabase
//
//        // below code returns a cursor to
//        // read data from the database
//        val cursor = db.rawQuery("SELECT " + STOREFRONTS_NAME +  " FROM " + TABLE_STOREFRONTS, null)
//        cursor?.moveToFirst()
//        return cursor.getString(cursor.getColumnIndex(STOREFRONTS_NAME));
//    }
    override fun onCreate(db: SQLiteDatabase) {
        // Create tables
        val createClientsTable = "CREATE TABLE $TABLE_CLIENTS " +
                "($COLUMN_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                " $COLUMN_CLIENT_NAME TEXT, " +
                "$COLUMN_CLIENT_API_KEY TEXT," +
                " $COLUMN_CLIENT_WEBHOOK_URL TEXT," +
                " $COLUMN_CLIENT_TIMEZONE TEXT," +
                " $COLUMN_CLIENT_USERNAME TEXT," +
                " $COLUMN_CLIENT_PASSWORD TEXT);"
        db.execSQL(createClientsTable)

        val createProductsTable = "CREATE TABLE $TABLE_PRODUCTS " +
                "($COLUMN_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                "$COLUMN_PRODUCT_NAME TEXT, " +
                "$COLUMN_PRODUCT_AVAILABILITY INTEGER, " +
                "$COLUMN_STOREFRONT_ID INTEGER NOT NULL, " +
                "FOREIGN KEY ($COLUMN_STOREFRONT_ID) REFERENCES $TABLE_STOREFRONTS($COLUMN_ID));"
        db.execSQL(createProductsTable)

        val createDevicesTable = "CREATE TABLE $TABLE_DEVICES " +
                "($COLUMN_DEVICE_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                "$COLUMN_DEVICE_SERIAL_NUMBER TEXT NOT NULL UNIQUE, " +
                "$COLUMN_DEVICE_MODEL TEXT NOT NULL, " +
                "$COLUMN_DEVICE_APP_VERSION TEXT, " +
                "$COLUMN_DEVICE_LOCAL_IP TEXT, " +
                "$COLUMN_DEVICE_LOCATION_LAT TEXT, " +
                "$COLUMN_DEVICE_LOCATION_LNG TEXT, " +
                "$COLUMN_DEVICE_MOBILE_NETWORK TEXT, " +
                "$COLUMN_DEVICE_BATTERY INTEGER, " +
                "$COLUMN_DEVICE_RECEIPT_PRINT_COUNT INTEGER NOT NULL, " +
                "$COLUMN_DEVICE_AUTO_PRINT INTEGER NOT NULL, " +
                "$COLUMN_DEVICE_PLAY_SOUND_ON_ORDER INTEGER NOT NULL, " +
                "$COLUMN_DEVICE_ADDED_AT INTEGER NOT NULL, " +
                "$COLUMN_DEVICE_LAST_ONLINE INTEGER NOT NULL);"
        db.execSQL(createDevicesTable)

        val createEventsTable = "CREATE TABLE $TABLE_EVENTS " +
                "($COLUMN_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                "$COLUMN_DEVICE_ID INTEGER NOT NULL, " +
                "$COLUMN_EVENT_PAYLOAD TEXT NOT NULL, " +
                "$COLUMN_EVENT_TIMESTAMP INTEGER NOT NULL, " +
                "FOREIGN KEY ($COLUMN_DEVICE_ID) " +
                "REFERENCES $TABLE_DEVICES($COLUMN_ID));"
        db.execSQL(createEventsTable)

        val createStorefrontsTable = "CREATE TABLE $TABLE_STOREFRONTS (" +
                "$COLUMN_STOREFRONT_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                "$COLUMN_STOREFRONT_DEVICE_ID INTEGER, " +
                "$COLUMN_STOREFRONT_NAME TEXT, " +
                "$COLUMN_STOREFRONT_COURIER_SERVICE TEXT, " +
                "$COLUMN_STOREFRONT_PICKUP_TIME_MINS INTEGER, " +
                "FOREIGN KEY ($COLUMN_STOREFRONT_DEVICE_ID) REFERENCES devices(device_id)" +
                ");"
        db.execSQL(createStorefrontsTable)

        val createSchedulesTable = "CREATE TABLE $TABLE_SCHEDULES " +
                "($COLUMN_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                "$COLUMN_STOREFRONT_ID INTEGER NOT NULL, " +
                "$COLUMN_SCHEDULE_DAY_OF_WEEK INTEGER NOT NULL, " +
                "$COLUMN_SCHEDULE_OPENS TEXT NOT NULL, " +
                "$COLUMN_SCHEDULE_CLOSES TEXT NOT NULL, " +
                "FOREIGN KEY ($COLUMN_STOREFRONT_ID) " +
                "REFERENCES $TABLE_STOREFRONTS($COLUMN_ID));"
        db.execSQL(createSchedulesTable)

        val createExceptionsTable = "CREATE TABLE $TABLE_EXCEPTIONS " +
                "($COLUMN_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                "$COLUMN_STOREFRONT_ID INTEGER NOT NULL, " +
                "$COLUMN_EXCEPTION_DATE TEXT NOT NULL, " +
                "$COLUMN_EXCEPTION_OPENS TEXT NOT NULL, " +
                "$COLUMN_EXCEPTION_CLOSES TEXT NOT NULL, " +
                "FOREIGN KEY ($COLUMN_STOREFRONT_ID)" +
                " REFERENCES $TABLE_STOREFRONTS($COLUMN_ID));"
        db.execSQL(createExceptionsTable)
        val createIndexQuery = "CREATE UNIQUE INDEX $indexName ON $TABLE_DEVICES ($COLUMN_DEVICE_SERIAL_NUMBER);"
        println("DAVID $createIndexQuery")
        db.execSQL(createIndexQuery)
    }

    companion object {
        const val DATABASE_NAME = "ospatarul.db"
        const val DATABASE_VERSION = 3

        const val indexName = "device_serialNumber_idx"


        // Table Names
        const val TABLE_CLIENTS = "clients"
        const val TABLE_PRODUCTS = "products"
        const val TABLE_DEVICES = "devices"
        const val TABLE_EVENTS = "events"
        const val TABLE_STOREFRONTS = "storefronts"
        const val TABLE_SCHEDULES = "schedules"
        const val TABLE_EXCEPTIONS = "exceptions"

        // Common column names
        private const val COLUMN_ID = "id"
        private const val COLUMN_STOREFRONT_ID = "storefront_id"
        const val COLUMN_DEVICE_ID = "device_id"

        // Clients Table Columns
        private const val COLUMN_CLIENT_NAME = "client_name"
        private const val COLUMN_CLIENT_API_KEY = "client_apiKey"
        private const val COLUMN_CLIENT_WEBHOOK_URL = "client_webhookUrl"
        private const val COLUMN_CLIENT_TIMEZONE = "client_timezone"
        private const val COLUMN_CLIENT_USERNAME = "client_username"
        private const val COLUMN_CLIENT_PASSWORD = "client_password"

        // Products Table Columns
        private const val COLUMN_PRODUCT_NAME = "product_name"
        private const val COLUMN_PRODUCT_AVAILABILITY = "product_availability"

        // Devices Table Columns
        const val COLUMN_DEVICE_SERIAL_NUMBER = "device_serialNumber"
        const val COLUMN_DEVICE_MODEL = "device_model"
        const val COLUMN_DEVICE_APP_VERSION = "device_appVersion"
        const val COLUMN_DEVICE_LOCAL_IP = "device_localIp"
        const val COLUMN_DEVICE_LOCATION_LAT = "device_locationLat"
        const val COLUMN_DEVICE_LOCATION_LNG = "device_locationLng"
        const val COLUMN_DEVICE_MOBILE_NETWORK = "device_mobileNetwork"
        const val COLUMN_DEVICE_BATTERY = "device_battery"
        const val COLUMN_DEVICE_RECEIPT_PRINT_COUNT = "device_recieptPrintCount"
        const val COLUMN_DEVICE_AUTO_PRINT = "device_autoPrint"
        const val COLUMN_DEVICE_PLAY_SOUND_ON_ORDER = "device_playSoundOnOrder"
        const val COLUMN_DEVICE_ADDED_AT = "device_addedAt"
        const val COLUMN_DEVICE_LAST_ONLINE = "device_lastOnline"
        // Events Table Columns
        const val COLUMN_EVENT_PAYLOAD = "event_payload"
        const val COLUMN_EVENT_TIMESTAMP = "event_timestamp"

        const val COLUMN_STOREFRONT_DEVICE_ID = "storefront_deviceId"
        const val COLUMN_STOREFRONT_NAME = "storefront_name"
        const val COLUMN_STOREFRONT_COURIER_SERVICE = "storefront_courierService"
        const val COLUMN_STOREFRONT_PICKUP_TIME_MINS = "storefront_pickupTimeMins"


        // Schedules Table Columns
        private const val COLUMN_SCHEDULE_DAY_OF_WEEK = "schedule_dayOfWeek"
        private const val COLUMN_SCHEDULE_OPENS = "schedule_opens"
        private const val COLUMN_SCHEDULE_CLOSES = "schedule_closes"
        // ...

        // Exceptions Table Columns
        private const val COLUMN_EXCEPTION_DATE = "exception_date"
        private const val COLUMN_EXCEPTION_OPENS = "exception_opens"
        private const val COLUMN_EXCEPTION_CLOSES = "exception_closes"
        // ...
    }

}
