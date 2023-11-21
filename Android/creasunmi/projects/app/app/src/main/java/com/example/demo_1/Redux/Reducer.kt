package com.example.demo_1.Redux

interface Reducer<T: GeneralState, A: Action>{
    fun reduce(oldState: T, action: A): T
}