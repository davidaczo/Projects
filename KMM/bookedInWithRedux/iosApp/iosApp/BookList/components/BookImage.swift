//
//  BookImage.swift
//  bookedIn
//
//  Created by Daczo David on 27.09.2022.
//

import SwiftUI
import shared

struct BookImage: View {
    let imageUrl: String
    
    var body: some View {
        AsyncImage(url: URL(string: imageUrl )) { phase in
            if let image = phase.image {
                image.resizable()
            } else if phase.error != nil {
                Color.red // Indicates an error.
            } else {
                Color.blue
            }
        }
        .frame(width: 110, height: 180)
        .clipShape(RoundedRectangle(cornerRadius: 15))
//        .padding(.top, 5)
    }
}

struct BookImage_Previews: PreviewProvider {
    static var previews: some View {
        BookImage(imageUrl: "")
    }
}
