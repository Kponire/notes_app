import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      notifications.show({
        title: 'Session Expired',
        message: 'Please log in again to continue.',
        color: 'red',
      });
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'An unexpected error occurred',
        color: 'red',
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
