//
//  Router.swift
//  iosApp
//
//  Created by Daczo David on 17.11.2022.
//  Copyright © 2022 orgName. All rights reserved.
//

import Foundation

class Router: ObservableObject {
    @Published var path : [Route] = []
    
    func reset() {
        path = []
    }
}
