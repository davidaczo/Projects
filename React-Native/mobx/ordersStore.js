import { makeAutoObservable, observable, action } from "mobx";
import axios from 'axios';
import orderService from "../api/OrdersApi";


const mapOrders = (apiResponse) => {
    // Extracting the 'data' field from the API response
    const ordersData = apiResponse.data;
    // Mapping each order in the data array
    const orders = ordersData.map((orderData) => {
        // Extracting fields from the order data
        const {
            id,
            code,
            status,
            message,
            created,
            billing_address,
            shipping_address,
            items,
        } = orderData;

        // Mapping items array for the order
        const mappedItems = items.map((item) => {
            const {
                base_price,
                quantity,
                name,
                image,
                discount_rate,
                attributes,
                current_price,
            } = item;

            // Mapping attributes for the item
            const mappedAttributes = Object.entries(attributes).reduce(
                (acc, [key, value]) => {
                    acc[key] = value.map((attr) => attr.value);
                    return acc;
                },
                {}
            );

            return {
                base_price,
                quantity,
                name,
                image,
                discount_rate,
                attributes: mappedAttributes,
                current_price,
            };
        });

        return {
            id,
            code,
            status,
            message,
            created,
            billing_address,
            shipping_address,
            items: mappedItems,
        };
    });

    return orders
}

class OrdersStore {
    constructor() {
        makeAutoObservable(this);
    }

    @observable data = null;
    @observable isLoading = false;
    @observable error = null;

    // action to call API and search images
    @action loadOrders = async (partnerId) => {
        try {
            this.setIsLoading(true);
            const data = await orderService.fetchOrders(partnerId);
            this.setData(mapOrders(data));
        } catch (error) {
            this.setError(error);
        } finally {
            this.setIsLoading(false);
        }
    }

    @action updateOrder = async (partnerId, orderId, newStatus) => {
        console.log("update111")
        try {
            console.log('updating', partnerId, orderId)
            await orderService.updateOrder(partnerId, orderId, newStatus);
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    }

    // action to set data
    @action setData = (data) => {
        this.data = data;
        this.error = null;
    };

    // action to set error
    @action setError = (error) => {
        this.error = error;
        this.data = null;
    };

    @action setIsLoading(newisLoading) {
        this.isLoading = newisLoading;
    }
}

// export class
export default new OrdersStore();


