import axios, {AxiosError, AxiosResponse} from 'axios';
import {environment} from "@/configuration/environment";

export const BASE_URL = 'https://api.weatherapi.com/v1';
// Configurazione base dell'istanza Axios
export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        if (environment.API_KEY) {
            config.params = {
                key: environment.API_KEY,
                ...config.params,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor per le risposte (gestisci errori globalmente)
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // Gestione errori globale
        return Promise.reject(error);
    }
);



// Utility semplice per gestire errori
export const handleApiCall = async <T>(
    apiCall: () => Promise<AxiosResponse<T>>
): Promise<T> => {
    try {
        const response = await apiCall();
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error?.message || error.message);
        }
        throw error;
    }
};

export default api;
