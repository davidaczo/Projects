
//  ContentView.swift
//  bookedIn
//
//  Created by Daczo David on 26.09.2022.
//

import SwiftUI
import shared


enum MainPageButtonText: String {
    case Books  = "Books"
    case CartAndHistory = "Cart & My History"
    case Settings = "Settings"
}

struct ContentView: View {
//    @StateObject var viewModel = ContentViewViewModel()
    @EnvironmentObject var router: Router
    var body: some View {
        NavigationStack(path: $router.path) {
            ZStack(alignment: .bottom) {
                Image("book-vector")
                    .renderingMode(.template)
                    .resizable()
                    .frame(width: 350, height: 160)
                    .padding(.top, 0)
                    .foregroundColor(Color.secondari)
                VStack {
                    Spacer()
                    MainPageButton(imageName: "books.vertical", bottomText: MainPageButtonText.Books.rawValue)
                    MainPageButton(imageName: "cart", bottomText: MainPageButtonText.CartAndHistory.rawValue)
                    MainPageButton(imageName: "gearshape", bottomText: MainPageButtonText.Settings.rawValue)
                    Spacer()
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .ignoresSafeArea()
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    HStack {
                        Image(systemName: "book")
                            .font(.system(size: 30))
                            .foregroundColor(Color.secondari)
                        Text("**BookedIn**")
                            .foregroundColor(Color.secondari)
                            .font(.system(size: 50))
                        Image(systemName: "book")
                            .font(.system(size: 30))
                            .foregroundColor(Color.secondari)
                    }
                    .padding(.vertical, 30)
                }
            }
            .background(Color.gray.opacity(0.05))
            .ignoresSafeArea()
            .navigationDestination(for: Route.self) { route in
                if route == .books{
                    BooksView()
                }
//                else if route == .cart {
//                    CartView(cartItemDataSource: databaseModule.cartItemDatasource)
////                }
////                else if route == .orders {
////                    OrdersView()
////                } else if route == .settings {
////                    SettingsView()
//                } else if route == .cartAndHistory {
//                    CartAndHistoryTabView(cartItemDataSource: databaseModule.cartItemDatasource)
//                } else if route == .addressForm {
//                    AddressFormView()
//                } else if route == .orderReview {
//                    OrderReviewView(cartItemDataSource: databaseModule.cartItemDatasource, orderItemDatasource: databaseModule.orderItemDatasource)
//                }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    
    static var previews: some View {
        ContentView()
    }
}
