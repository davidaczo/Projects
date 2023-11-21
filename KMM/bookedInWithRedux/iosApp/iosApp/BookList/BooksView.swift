//
//  BooksView.swift
//  bookedIn
//
//  Created by Daczo David on 26.09.2022.
//

import SwiftUI
import shared
struct BooksView: View {
    @StateObject var viewModel = BooksViewModel()
    @State private var showingDetail = false

    var columns: [GridItem] = [
        GridItem(.flexible(), spacing: 6, alignment: nil),
        GridItem(.flexible(), spacing: 6, alignment: nil),
    ]

    
    var body: some View {
        
        VStack {
            ScrollView(showsIndicators: false) {
                LazyVGrid (columns:columns) {
                    ForEach(viewModel.booksArray, id: \.id) {book in
                        BookCard(viewModel: viewModel, book: book)
                    }
                }
            }
            .sheet(isPresented: $viewModel.showingDetailedScreen) {
                BookDetailedSheet(viewModel: viewModel) // ???
            }
            .background(Color.systemBackground)
            .toolbar {
                NavigationLink(value: Route.cart) {
                    Image(systemName: "cart.fill")
                        .font(.system(size: 20))
                        .foregroundColor(Color.black)
                        .overlay(
                            Circle()
                                .fill(Color.red)
                                .frame(width: 23, height: 23)
                                .overlay(
                                    Text("\(viewModel.itemCount)")
                                        .font(.subheadline)
                                        .foregroundColor(.white)
                                )
                                .shadow(color: .black, radius: 10, x: 10.0, y: 5)
                                .offset(x: 3,y: 3)
                            , alignment: .topTrailing)
                }
            }
        }
        .navigationTitle("Books")
    }
}

struct BooksView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
//            BooksView()
            
        }
        //        Text("")
    }
}
