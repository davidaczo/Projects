import { axiosWithCredentials } from './obm-axios';

export const fetchAllLocations = async () => {
  try {

    const response = await axiosWithCredentials.get(
      'http://localhost:8082/api/locations'
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.log('Problem with fetching locations: ', error);
    return [];
  }
};

export const insertLocations = async (name: string) => {
  console.log('inserting country');
  try {
    const axiosConfig = {
       headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
       }
     };

    const postData = JSON.stringify({
      "locationName": name,
    });
    await axiosWithCredentials.post(
      'http://localhost:8082/api/locations', postData, axiosConfig,
    );
  } catch (error) {
    console.log('Problem with inserting location: ', error);
    return [];
  }
};