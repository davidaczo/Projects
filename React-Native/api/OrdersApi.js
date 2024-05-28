import { BASE_URL, DEV_URL } from '../constants/values';
import axios from './Axios'

const apiUrl = DEV_URL;

const orderService = {
    async fetchOrders(partnerId, pageNr = 1) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/orders?page=${pageNr}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },

    async fetchOrder(partnerId, orderId) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/orders/${orderId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },
    async updateOrder(partnerId, orderId, newStatus) {
        console.log('API Response:', partnerId, orderId, newStatus)
        try {
            const response = await axios.put(
                `${apiUrl}/partner/${partnerId}/orders/${orderId}`,
                { status: newStatus }
            );
            console.log("UPDATE ORDER RESPONSE", response.data)
            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw new Error('Failed to update order');
        }
    }

};

export default orderService;
