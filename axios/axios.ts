import axios from 'axios';
import { firebaseAuth } from '../config/firebase';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const useAxiosInstance = () => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        // Make sure to format the token exactly as expected by your backend
        config.headers.Authorization = `Bearer ${token.trim()}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor to handle token expiration
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the error is unauthorized and we haven't tried to refresh yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Get current user from Firebase
          const user = firebaseAuth.currentUser;
          if (user) {
            // Force refresh the token
            const newToken = await user.getIdToken(true);
            localStorage.setItem('token', newToken);
            
            // Update the failed request's authorization header
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            
            // Retry the request with new token
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
