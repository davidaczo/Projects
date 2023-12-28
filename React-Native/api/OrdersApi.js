// api/apiService.js
import axios from 'axios';

const apiUrl = 'http://192.168.1.7:8000/api';

const orderService = {
    async fetchOrders(partnerId) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/orders/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },

    async updateOrder(partnerId, orderId, newStatus) {
        console.log('API Response:')
        try {
            const response = await axios.put(
                `${apiUrl}/partner/${partnerId}/orders/${orderId}`,
                { status: newStatus }
            );
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw new Error('Failed to update order');
        }
    }

};

export default orderService;
