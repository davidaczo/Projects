//
//  MainPageButton.swift
//  bookedIn
//
//  Created by Daczo David on 26.09.2022.
//

import SwiftUI

struct myLabel: View {
    let imageName: String
    let bottomText: String
    var body: some View{
        VStack {
            Circle()
                .fill(Color.main)
                .frame(width: 100, height: 100)
                .shadow(radius: 10)
                .overlay(
                    Image(systemName: imageName)
                        .font(.system(size: 50))
                        .foregroundColor(Color.white)
                )
            Text(bottomText)
                .bold()
                .foregroundColor(Color.secondari)
        }
        .padding(.bottom, 50)
    }
}

struct MainPageButton: View {
    let imageName: String
    let bottomText: String
    var body: some View {
        HStack{
            if bottomText == MainPageButtonText.Books.rawValue {
                NavigationLink(value: Route.books) {
                    myLabel(imageName: imageName, bottomText: bottomText)
                }
            } else if bottomText == MainPageButtonText.CartAndHistory.rawValue {
                NavigationLink(value: Route.cartAndHistory) {
                    myLabel(imageName: imageName, bottomText: bottomText)
                }
            } else if bottomText == MainPageButtonText.Settings.rawValue {
                NavigationLink(value: Route.settings) {
                    myLabel(imageName: imageName, bottomText: bottomText)
                }
            }
        }
    }
}


struct MainPageButton_Previews: PreviewProvider {
    static var previews: some View {
        MainPageButton(imageName: "books.vertical", bottomText: "Cart & My History")
    }
}
