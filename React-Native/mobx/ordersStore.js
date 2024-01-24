import { makeAutoObservable, observable, action, runInAction } from "mobx";
import axios from 'axios';
import orderService from "../api/OrdersApi";

const mapOrder = (apiResponse) => {
    const orderData = apiResponse.data;
    const {
        id,
        code,
        status,
        message,
        created,
        billing_address,
        shipping_address,
        items,
    } = orderData[0];

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
};

const mapOrders = (apiResponse) => {
    const ordersData = apiResponse.data;
    const orders = ordersData.map((orderData) => {
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
    @observable updatingIndex = -1;
    @observable isUnproccedOrder = false;

    @action loadOrders = async (partnerId) => {
        try {
            this.setIsLoading(true);

            const data = await orderService.fetchOrders(partnerId);

            runInAction(() => {
                let sortedDataList = mapOrders(data).sort((a, b) => {
                    const dateA = new Date(a.created).getTime();
                    const dateB = new Date(b.created).getTime();
                    return dateB - dateA;
                });

                const registeredStatuses = sortedDataList.filter(item => ["registered"].includes(item.status));
                const processingStatuses = sortedDataList.filter(item => ["processing"].includes(item.status));
                const otherStatuses = sortedDataList.filter(item => !["registered", "processing"].includes(item.status));

                sortedDataList = [...registeredStatuses, ...processingStatuses, ...otherStatuses];
                this.setData(sortedDataList)

                this.isUnproccedOrder = this.data.some(order => order.status === 'registered');
            });

        } catch (error) {
            this.setError(error);
        } finally {
            this.setIsLoading(false);
        }
    }

    @action loadOrder = async (partnerId, orderId) => {
        try {
            const orderIndex = this.data.findIndex(order => order.id === orderId);
            const resp = await orderService.fetchOrder(partnerId, orderId);
            if (orderIndex !== -1) {
                runInAction(() => {
                    const updatedOrder = mapOrder(resp);
                    this.data[orderIndex].status = updatedOrder.status;
                    this.setData([...this.data]);
                    this.isUnproccedOrder = this.data.some(order => order.status === 'registered');
                });
            }
        } catch (error) {
            this.setError(error);
        } finally {
            this.setUpdatingIndex(-1);
        }
    }

    @action updateOrder = async (partnerId, orderId, newStatus) => {
        try {
            await orderService.updateOrder(partnerId, orderId, newStatus);
            runInAction(() => {
                this.loadOrder(partnerId, orderId);
            });
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
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
    // action to set error

    @action setIsLoading(newisLoading) {
        this.isLoading = newisLoading;
    }

    @action setUpdatingIndex(newIndex) {
        this.updatingIndex = newIndex
    }
}

// export class
export default new OrdersStore();


