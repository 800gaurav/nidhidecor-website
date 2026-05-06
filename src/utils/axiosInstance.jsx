// src/utils/axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';


// export const baseUrl = 'http://192.168.1.52:3075';
export const baseUrl = 'https://node.axora.homes';
export const imgBaseUrl = 'https://node.axora.homes';
// export const baseUrl = 'http://localhost:5010';

const axiosInstance = (token) => {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Response interceptor to handle 401 errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        Cookies.remove('TOKEN');
        // window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosInstance;
