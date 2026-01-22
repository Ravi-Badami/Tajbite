// Frontend API configuration
const API_CONFIG = {
  development: {
    BASE_URL: 'http://localhost:5000',
    USE_BACKEND: true  // Set to false to use mock data
  },
  production: {
    BASE_URL: 'https://tajbite-api.onrender.com', // Your deployed backend URL
    USE_BACKEND: true
  }
};

const ENV = import.meta.env.MODE || 'development';
const config = API_CONFIG[ENV];

export const BASE_URL = config.BASE_URL;
export const USE_BACKEND = config.USE_BACKEND;

export default config;
