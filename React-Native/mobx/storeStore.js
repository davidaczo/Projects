import { makeAutoObservable, observable, action, computed } from "mobx";
import productsService from "../api/ProductsApi";
import { mapProductData, mapProductMainData } from "../mapers/products";
import storeService from "../api/StoreApi";

class StoreStore {
    constructor() {
        makeAutoObservable(this);
    }

    @action
    async changeStoreStatus(partnerId, date, newStatus) {
        try {
            console.log(date, newStatus)
            const data = await storeService.updateOrder(partnerId, date, newStatus);
            return data.success;
        } catch (error) {
            console.error(error);
            // throw new Error('Failed to update store status');
        }

    }
}
export const storeStore = new StoreStore();


