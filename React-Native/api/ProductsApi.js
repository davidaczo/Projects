import axios, { all } from 'axios';

const apiUrl = 'http://3.121.10.45/api';

const productsService = {
    async fetchProducts(partnerId, pageNr = 1) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products?page=${pageNr}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },
    async fetchProduct(partnerId, productId) {
        try {
            console.log(productId, partnerId)
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products/${productId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },
};

export default productsService;
