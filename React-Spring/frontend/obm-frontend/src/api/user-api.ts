import axios from 'axios';
import { axiosWithCredentials } from './obm-axios';

export const fetchAllUsers = async () => {
  try {
    const axiosConfig = {
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Access-Control-Allow-Origin': '*',
      }
    };

    const response = await axiosWithCredentials.get(
      'http://localhost:8082/api/users', axiosConfig,
    );
    console.log('all users in fetch = ', response.data);
    return response.data;
  } catch (error) {
    console.log('Problem with fetching users: ', error);
    return [];
  }
};

export const deleteUserByUserId = async (userId: number | string) => {
  try {
    await axiosWithCredentials.delete(
      `http://localhost:8082/api/users/${userId}`,
    );
  } catch (error) {
    console.log('Problem with deleting data: ', error);
    return [];
  }
};

export const loginUser = async (name: string, password: string) => {
  try {
    console.log(name, password)
    axios.defaults.withCredentials = true;
    await axiosWithCredentials.post(
      'http://localhost:8082/login', { "username" : name, "password" : password },
    );
  } catch (error) {
    console.log('Problem with logging in: ', error);
    return ;
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(
      'http://localhost:8082/logout'
    );
  } catch (error) {
    console.log('Problem with logging out: ', error)
    return [];
  }
}

export const findUserByUsername = async (username: string) => {
  try {
    const response = await axiosWithCredentials.get(`http://localhost:8082/api/users/username`,{ params: {"username" : username}});
    return response.data;
  } catch (error) {
      console.log('Problem with logging out: ', error)
      return [];
  }
}