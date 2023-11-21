//
//  BooksView-ViewModel.swift
//  bookedIn
//
//  Created by Daczo David on 03.10.2022.
//

import Foundation
import Combine
import shared


extension BooksView {
    @MainActor class BooksViewModel: ObservableObject {
        var cancellable : AnyCancellable?
        let req = APIRequests()
        let sortingOptions = [
            "Rating dec.","Title (A-Z)", "Author (A-Z)"
        ]

        @Published var booksArray : [Book] = []
        @Published var selectedBook: BookDetailed?
        @Published var showingDetailedScreen: Bool = false
        @Published var itemCount : Int = 0
        
//        private var cartItemDatasource : CartItemDatasource?
        
        init() {
            loadBooks()
            loadItemsCount()
        }
        
        
        func loadItemsCount() {
            cartItemDatasource?.getCartItemsCount() { itemCount,error in
                self.itemCount = Int(truncating: itemCount ?? 0)
            }
        }
        
        func loadBooks() {
            req.getAllBooks { books, error in
                DispatchQueue.main.async {
                    self.booksArray = books ?? []
                }
            }
        }

        internal func onTapGestureHandler(book: Book) {
            req.getBookDetailedById(id: String(book.id)) { selectedBook, error in
                DispatchQueue.main.async {
                    self.selectedBook = selectedBook
                }
            }
            self.showingDetailedScreen.toggle()
        }
        
        internal func closeSheet() {
            self.showingDetailedScreen.toggle()
        }
    }
}
