import { makeAutoObservable, observable, action, runInAction } from "mobx";
import axios from 'axios';
import orderService from "../api/OrdersApi";
import { mapOrder, mapOrders } from "../mapers/orders";

class OrdersStore {
    constructor() {
        makeAutoObservable(this);
    }

    @observable data = null;
    @observable isLoading = false;
    @observable error = null;
    @observable updatingIndex = -1;
    @observable isUnproccedOrder = false;
    @observable isListEnd = false;

    @action loadOrders = async (partnerId, pageNr) => {
        try {
            this.setIsLoading(true);

            const data = await orderService.fetchOrders(partnerId, pageNr);
            console.log("fetched data pageNr: ", pageNr, data.length)
            runInAction(() => {
                mappedData = mapOrders(data)
                if (this.data && mappedData.length > 0 && pageNr > 1) {
                    console.log('concatenating data')
                    this.setData(this.data.concat(mappedData))
                } else if (data.length == 0) {
                    console.log('setting end')
                    this.setIsListEnd(true);
                }
                else {
                    console.log('setting data')
                    this.setData(mappedData);
                    this.setIsListEnd(false);
                }
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

    @action setIsListEnd(newIsListEnd) {
        this.isListEnd = newIsListEnd;
    }


    @action setIsLoading(newisLoading) {
        this.isLoading = newisLoading;
    }

    @action setUpdatingIndex(newIndex) {
        this.updatingIndex = newIndex
    }
}

// export class
export default new OrdersStore();


