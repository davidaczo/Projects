import { axiosWithCredentials } from './obm-axios';

export const fetchAllCountries = async () => {
  try {

    const response = await axiosWithCredentials.get(
      'http://localhost:8082/api/countries'
    );
    console.log('all countries in fetch = ', response.data);
    return response.data;
  } catch (error) {
    console.log('Problem with fetching countries: ', error);
    return [];
  }
};

export const insertCountry = async (name: string) => {
  console.log('inserting country');
  try {
    const axiosConfig = {
       headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
       }
     };

    const postData = JSON.stringify({
      "countryName": name,
    });
    await axiosWithCredentials.post(
      'http://localhost:8082/api/countries', postData, axiosConfig,
    );
  } catch (error) {
    console.log('Problem with inserting country: ', error);
    return [];
  }
};


export const deleteCountryByCountryId = async (countryId: number | string) => {
  try {
    await axiosWithCredentials.delete(
      `http://localhost:8082/api/countries/${countryId}`,
    );
  } catch (error) {
    console.log('Problem with deleting data: ', error);
    return [];
  }
};

export const fetchLocationsByCountry = async (countryId: number) => {
  try {
    const response = await axiosWithCredentials.get(
      `http://localhost:8082/api/locations/countries/${countryId}`,
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('Problem with fetching data: ', error);
    return [];
  }
};

