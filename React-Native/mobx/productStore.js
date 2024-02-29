import { makeAutoObservable, observable, action, runInAction } from "mobx";
import axios from 'axios';
import orderService from "../api/OrdersApi";
import { mapOrder, mapOrders } from "../mapers/orders";
import productsService from "../api/ProductsApi";
import { mapProductData, mapProductMainData } from "../mapers/products";

class OrdersStore {
    constructor() {
        makeAutoObservable(this);
    }

    @observable data = null;
    @observable isLoading = false;
    @observable isLoadingProduct = true;
    @observable error = null;
    @observable selectedProduct = null;
    @observable isListEnd = false;

    @action loadProducts = async (partnerId, pageNr = 1) => {
        try {
            this.setIsLoading(true);
            const data = await productsService.fetchProducts(partnerId, pageNr);
            if (this.data && data.length > 0 && pageNr > 1) {
                this.setData(this.data.concat(mapProductMainData(data)))
            } else if (data.length == 0) {
                this.setIsListEnd(true);
            }
            else {
                this.setData(mapProductMainData(data));
                this.setIsListEnd(false);
            }
        } catch (error) {
            console.log(error)
            this.setError(error);
        } finally {
            this.setIsLoading(false);
        }
    }

    @action loadProduct = async (partnerId, productId) => {
        try {
            this.setIsLoadingProduct(true);
            const data = await productsService.fetchProduct(partnerId, productId);
            this.setSelectedProduct(mapProductData(data)[0])
        } catch (error) {
            this.setError(error);
        } finally {
            this.setIsLoadingProduct(false);

        }
    }

    @action setData = (data) => {
        this.data = data;
        this.error = null;
    };

    @action setError = (error) => {
        this.error = error;
        this.data = null;
    };

    @action setSelectedProduct = (product) => {
        this.selectedProduct = product;
        this.error = null;

    }

    @action setIsLoading(newisLoading) {
        this.isLoading = newisLoading;
    }

    @action setIsLoadingProduct(newisLoading) {
        this.isLoadingProduct = newisLoading;
    }

    @action setIsListEnd(newIsListEnd) {
        this.isListEnd = newIsListEnd;
    }

    @action setUpdatingIndex(newIndex) {
        this.updatingIndex = newIndex
    }
}

export default new OrdersStore();


