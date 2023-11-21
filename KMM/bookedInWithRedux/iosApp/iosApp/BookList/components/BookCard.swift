//
//  BookCard.swift
//  bookedIn
//
//  Created by Daczo David on 27.09.2022.
//

import SwiftUI
import shared

extension BooksView {
    struct BookCard: View {
        @ObservedObject var viewModel : BooksViewModel

        var book: Book
        
    
        var body: some View {
            ZStack(alignment: .topTrailing) {
                VStack {
                    VStack {
                        BookImage(imageUrl: book.image_url)
                            .padding(.top, 5)
                        Text(book.title)
                            .bold()
                            .lineLimit(2)
                            .frame(width: 180, height: 40)
                        Text(book.authors)
                            .frame(width: 180, height: 30)
                    }
                    .foregroundColor(.white)
                    .onTapGesture {
//                        viewModel.onTapGestureHandler(book: book)
                    }

                    Text("\(book.price) RON")
                        .foregroundColor(.white)

                    Button {
//                        viewModel.add(book: book)
                    } label: {
                        Text("Add to Cart")
                            .font(.headline)
                            .fontWeight(.semibold)
                            .foregroundColor(Color.white)
                            .padding()
                            .padding(.horizontal,10)
                            .background(
                                Color.secondari
                                    .cornerRadius(20)
                                    .shadow(radius: 10)
                            )
                    }
                    .padding(.bottom, 5)
                }
                .background(
                    Rectangle()
                        .cornerRadius(20)
                        .foregroundColor(Color.main)
                        .shadow(color: .gray, radius: 10, x: 5, y: 10)
                    
                )
                .padding(.bottom, 10)
                Image(systemName: "info.circle")
                    .padding(.top, 5)
                    .padding(.trailing, 5)
                    .font(.system(size: 23))
                    .foregroundColor(.white)
            }
        }
    }
}

struct BookCard_Previews: PreviewProvider {
    
    static var previews: some View {
        //        BookCard(book: Book.example)
        //            .environmentObject(Cart.exampleCart)
        Text("")
        
    }
}
