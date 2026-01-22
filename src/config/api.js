// Frontend API configuration
// Values are loaded from .env (development) or .env.production (production)

export const BASE_URL = import.meta.env.VITE_API_URL;
export const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';

const config = {
  BASE_URL,
  USE_BACKEND
};

export default config;
