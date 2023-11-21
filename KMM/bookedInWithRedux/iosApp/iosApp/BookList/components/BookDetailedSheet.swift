//
//  BookDetailedView.swift
//  bookedIn
//
//  Created by Daczo David on 26.09.2022.
//

import SwiftUI
import shared

extension BooksView {
struct BookDetailedSheet: View {
    @ObservedObject var viewModel: BooksViewModel
    @Environment(\.presentationMode) var presentationMode

    var body: some View {
        ZStack(alignment: .topLeading) {
            Color.secondari.edgesIgnoringSafeArea(.all)
            ScrollView {
                VStack {
                    AsyncImage(url: URL(string: viewModel.selectedBook?.image_url ?? "" )) { phase in
                        if let image = phase.image {
                            image.resizable()
                                .frame(width: 300, height: 400)
                                .padding(.top, 20)
                        } else if phase.error != nil {
                            Color.red // Indicates an error.
                        } else {
                            Color.blue
                        }
                    }
                    
                    Text(viewModel.selectedBook?.title ?? "")
                        .font(.title)
                        .bold()
                    Text(viewModel.selectedBook?.authors ?? "")
                        .font(.title2)
                    
                    Divider()
                    
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Number of pages:")
                                .font(.headline)
                            Text("\(viewModel.selectedBook?.num_pages ?? 0)")
                        }
                        Spacer()
                        VStack(alignment: .leading) {
                            Text("Rating:")
                                .font(.headline)
                            Text("\(viewModel.selectedBook?.rating.formatted() ?? "0")")
                        }
                    }
                    
                    Divider()
                    
                    VStack(alignment: .leading, spacing: 15){
                        
                        Text("Quotes")
                            .font(.headline)
                        Text("\(viewModel.selectedBook?.Quote1 ?? "")")
                        Text("\(viewModel.selectedBook?.Quote2 ?? "")")
                        Divider()
                        Text("Description")
                            .font(.headline)
                        Text(viewModel.selectedBook?.description_ ?? "")
                    }
                }
                .padding()
            }
            .foregroundColor(.white)
            Button(action: {
                print("tapped")
                presentationMode.wrappedValue.dismiss()
            }, label: {
                Image(systemName: "xmark")
                    .foregroundColor(.white)
                    .font(.largeTitle)
                    .padding(.leading, 10)
                    .padding(.top, 10)
            })
        }
    }
}
}
struct BookDetailedView_Previews: PreviewProvider {
    static var previews: some View {
//        BookDetailedView()
        Text("")
    }
}
