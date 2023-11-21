package com.example.demo_1.WebsocketConnection

import com.google.gson.Gson
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import okio.ByteString
import java.util.concurrent.TimeUnit

data class MyData(val name: String, val age: Int)

class WebSocketEcho : WebSocketListener() {
    private fun run() {
        val client: OkHttpClient = OkHttpClient.Builder()
            .readTimeout(0, TimeUnit.MILLISECONDS)
            .build()
        val request: Request = Request.Builder()
            .url("http://localhost:8080/")
            .build()
        client.newWebSocket(request, this)


    }

    override fun onOpen(webSocket: WebSocket, response: Response) {
        val gson = Gson()
        val myData = MyData("John", 25)
        val json = gson.toJson(myData)

        webSocket.send(json)
        webSocket.close(1000, "Goodbye, World!")
    }

    override fun onMessage(webSocket: WebSocket, text: String) {
        println("MESSAGE22: $text")
    }

    override fun onMessage(webSocket: WebSocket, bytes: ByteString) {
        println("MESSAGE22: " + bytes.hex())
    }

    override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
        webSocket.close(1000, null)
        println("CLOSE: $code $reason")
    }

    override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
        t.printStackTrace()
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            WebSocketEcho().run()
        }
    }
}