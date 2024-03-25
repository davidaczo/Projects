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
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products/${productId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },
    async changeStatus(productId, partnerId, deactivationText) {
        try {
            const response = await axios.put(`${apiUrl}/partner/${partnerId}/products/${productId}`, { status: deactivationText });
            return response.data.data;
        } catch (error) {
            console.error('Error updating orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },

    async fetchCategories(partnerId) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/categories`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },

    async fetchProductsByCategory(partnerId, categoryId, pageNr = 1) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products?category=${categoryId}&page=${pageNr}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },

    async fetchProductsBySearchQuery(partnerId, searchQuery, pageNr = 1) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products?search=${searchQuery}&page=${pageNr}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    },

    async fetchProductsBySearchQueryAndCategoryId(partnerId, searchQuery, pageNr = 1, categoryId) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products?category=${categoryId}search=${searchQuery}&page=${pageNr}`);

            return response.data.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Failed to fetch orders');
        }
    }
};

export default productsService;
