import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
    'Acces-Control-Allow-Origin': '*',
    "Accept": "*/*",
};

const axiosInstance = axios.create({
    baseURL: 'http://172.23.220.228:8000/api', // Replace with your API base URL
    // timeout: 50000, // Request timeout in milliseconds
    headers: headers
  });

export const getOrders = async() => {
    return await axiosInstance.get('/partner/1/orders/1',{ responseType: 'json'})
    .then(response => {
      // Handle the response here
      console.log("getting orders from axiosAuth: ",response.data);
    })
    .catch(error => {
      // Handle the error here
      console.error('Axios request failed:', error);
    });
}