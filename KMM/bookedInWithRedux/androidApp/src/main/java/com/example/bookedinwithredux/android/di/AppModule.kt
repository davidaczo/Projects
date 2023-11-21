package com.example.bookedinwithredux.android.di

import android.app.Application
import com.example.bookedinwithredux.database.BookedInReduxDatabase
import com.example.bookedinwithredux.repository.CartItemDatasource
import com.example.bookedinwithredux.repository.DatabaseDriverFactory
import com.example.bookedinwithredux.repository.OrderItemDatasource
import com.squareup.sqldelight.db.SqlDriver
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

//    @Provides
//    @Singleton
//    fun provideSqlDriver(app: Application): SqlDriver {
//        return DatabaseDriverFactory().createDriver()
//    }
//
//    @Provides
//    @Singleton
//    fun provideCartItemDatasource(driver: SqlDriver): CartItemDatasource {
//        return CartItemDatasource(BookedInReduxDatabase(driver))
//    }
//
//    @Provides
//    @Singleton
//    fun provideOrderItemDatasource(driver: SqlDriver): OrderItemDatasource {
//        return OrderItemDatasource(BookedInReduxDatabase(driver))
//    }
}