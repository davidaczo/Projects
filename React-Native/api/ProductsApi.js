import { BASE_URL, DEV_URL } from '../constants/values';
import axios from './Axios'

const apiUrl = DEV_URL;

const productsService = {
    async fetchProducts(partnerId, pageNr = 1) {
        try {
            console.log("FETCHING PRODUCTS", `${apiUrl}/partner/${partnerId}/products?page=${pageNr}`)
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products?page=${pageNr}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw new Error('Failed to fetch products');
        }
    },
    async fetchProduct(partnerId, productId) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products/${productId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw new Error('Failed to fetch product');
        }
    },
    async changeStatus(productId, partnerId, deactivationText) {
        try {
            const response = await axios.put(`${apiUrl}/partner/${partnerId}/products/${productId}`, { status: deactivationText });
            return response.data.data;
        } catch (error) {
            console.error('Error updating status:', error);
            throw new Error('Failed to fetch status');
        }
    },

    async changePrice(partnerId, productId, productVariantId, price) {
        try {
            const response = await axios.put(`${apiUrl}/partner/${partnerId}/products/${productId}/product-variants/${productVariantId}`, { price });
            console.log("response.data.data", response.data.data)
            return response.data.data;
        } catch (error) {
            console.error('Error updating price:', error);
            throw new Error('Failed to fetch price');
        }
    },

    async fetchCategories(partnerId) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/categories`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw new Error('Failed to fetch categories');
        }
    },

    async fetchProductsByCategory(partnerId, categoryId, pageNr = 1) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products?category=${categoryId}&page=${pageNr}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw new Error('Failed to fetch products by category:');
        }
    },

    async fetchProductsBySearchQuery(partnerId, searchQuery, pageNr = 1) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products?search=${searchQuery}&page=${pageNr}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching products by searchQuery:', error);
            throw new Error('Failed to fetch products by searchQuery');
        }
    },

    async fetchProductsBySearchQueryAndCategoryId(partnerId, searchQuery, pageNr = 1, categoryId) {
        try {
            const response = await axios.get(`${apiUrl}/partner/${partnerId}/products?category=${categoryId}&search=${searchQuery}&page=${pageNr}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching products by searchQuery and categoryId:', error);
            throw new Error('Failed to fetch products by searchQuery and categoryId');
        }
    }
};

export default productsService;
