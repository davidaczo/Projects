import axios from 'axios';

const apiUrl = 'http://3.121.10.45/api';

const storeService = {

    async updateOrder(partnerId, date, newStatus) {
        try {
            console.log(date, newStatus)
            const response = await axios.post(
                `${apiUrl}/partner/${partnerId}/timetable_special_shipments`,
                {
                    "timetable_special_shipments": {
                        "date": date,
                        "time": newStatus
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating status:', error);
            throw new Error('Failed to update store status');
        }
    }

};

export default storeService;
