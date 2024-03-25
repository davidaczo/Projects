import { makeAutoObservable, observable, action, computed } from "mobx";
import productsService from "../api/ProductsApi";
import { mapProductData, mapProductMainData } from "../mapers/products";

class ProductStore {
    constructor() {
        makeAutoObservable(this);
        this.disableAlertActive = false;
    }

    @observable data = null;
    @observable isLoading = false;
    @observable isLoadingProduct = true;
    @observable error = null;
    @observable selectedProduct = null;
    @observable isListEnd = false;
    @observable disableAlertActive = null;
    @observable wasProductDisabled = false;
    @observable categories = null;

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

    @action changeProductStatus = async (productId, partnerId, deactivationText) => {
        try {
            const data = await productsService.changeStatus(productId, partnerId, deactivationText);
            this.setSelectedProduct(mapProductData([data])[0])
        } catch (error) {
            this.setError(error);
        } finally {
            this.setIsLoadingProduct(false);

        }
    }

    @action loadCategories = async (partnerId) => {
        try {
            this.setIsLoading(true);
            const categories = await productsService.fetchCategories(partnerId);
            this.setCategories(categories);
        }
        catch (error) {
            this.setError(error);
        } finally {
            this.setIsLoading(false);
        }
    }

    @action loadProductsByCategory = async (partnerId, categoryId, pageNr = 1) => {
        try {
            this.setIsLoading(true);
            const data = await productsService.fetchProductsByCategory(partnerId, categoryId, pageNr);
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

    @action loadProductsBySearchQuery = async (partnerId, searchQuery, pageNr = 1, categoryId = null) => {
        try {
            this.setIsLoading(true);
            let data;
            if (categoryId) {
                data = await productsService.fetchProductsBySearchQuery(partnerId, searchQuery, pageNr, categoryId);
            } else {
                data = await productsService.fetchProductsBySearchQuery(partnerId, searchQuery, pageNr);
            }
            if (this.data && data.length > 0 && pageNr > 1) {
                this.setData(this.data.concat(mapProductMainData(data)))
            } else if (data.length == 0 && pageNr == 1) {
                this.setData([]);
                this.setIsListEnd(true);
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

    @action setData = (data) => {
        this.data = data;
        this.error = null;
    };

    @action setCategories = (categories) => {
        this.categories = categories;
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
        this.updatingIndex = newIndex;
    }

    @action setDisableAlertActive() {
        this.disableAlertActive = !this.disableAlertActive;
    }

    @computed get isProductActive() {
        return this.selectedProduct && this.selectedProduct.status === 'active';
    }

}

export const productStore = new ProductStore();


