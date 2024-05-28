import { BASE_URL, DEV_URL } from "../constants/values";
import axios from "./Axios";

const apiUrl = DEV_URL;

const authService = {
    async getPartner(partnerId) {
        try {
            console.log(`${apiUrl}/partners/${partnerId}`)
            const response = await axios.get(
                `${apiUrl}/partners/${partnerId}`
            );
            console.log("GET PARTNER RESPONSE", response.data)
            return response.data.data[0];
        } catch (error) {
            console.error('Error while getting partner:', error);
            throw new Error('Failed to get partner');
        }
    }



};

export default authService;
