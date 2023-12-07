import { UserModel } from '@/models';
import axios from 'axios';

const API_URL = `http://localhost:8000/api/users/`;

export const registerUser = async (userData: UserModel) => {


    let response = await axios.post(API_URL + 'register', userData);
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
  
    return response.data;
}

export const loginUser = async (userData: UserModel) => {
    const response = await axios.post(API_URL + 'login', userData);
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
  
    return response.data;
}

export const getUser = async (id: number) => {
  const response = await axios.get(API_URL + id)

  return response.data
}

export const logoutUser = async () => {
    localStorage.removeItem('user');
}