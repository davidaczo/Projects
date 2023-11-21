//
//  Address.swift
//  bookedIn
//
//  Created by Daczo David on 30.09.2022.
//

import Foundation

class Address: ObservableObject {
    @Published var city: String
    @Published var street: String
    @Published var number: String
    @Published var additionalInfo: String
    
    private init() {
        self.city = ""
        self.street = ""
        self.number = ""
        self.additionalInfo = ""
    }
    
    static let orderAddress = Address()
}
