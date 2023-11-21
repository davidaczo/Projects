import SwiftUI
import shared

enum Route: Hashable {
    case books
    case cart
    case orders
    case settings
    case cartAndHistory
    case addressForm
    case orderReview
}


@main
struct iOSApp: App {
    @StateObject private var router = Router()
    var book = CartItem()
    var body: some Scene {
		WindowGroup {
			ContentView()
                .environmentObject(router)
		}
	}
}
