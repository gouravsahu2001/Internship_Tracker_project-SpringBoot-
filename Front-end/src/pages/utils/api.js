import axios from "axios";

// Base URL of your backend API
const BASE_URL = "http://localhost:8080";

// Create Axios instance with base URL
const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Add request interceptor to include JWT token in headers
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle error responses here
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default apiClient;