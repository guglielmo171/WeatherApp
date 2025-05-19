import {Weather} from "@/core/types/dto/Weather";
import {CitySearchResult} from "@/core/types/dto/City";
import {environment} from "@/configuration/environment";
import {api, BASE_URL, handleApiCall} from "@/configuration/axios";

export class WeatherService {
    private baseUrl = BASE_URL;
    private apiKey = environment.API_KEY;


    async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) throw new Error(
            `HTTP error! status: ${response.status}`
        )
        return response.json();
    }

    async fetchWeatherForecast(cityUrl: string): Promise<Weather> {
        const path = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(cityUrl)}&days=5`;
        let response = await this.fetchData<Weather>(path)
        response = {...response, url_city: cityUrl}
        return response;
    }
}

export const ApiService = {
    searchCities: async (query: string): Promise<CitySearchResult[]> => {
        return handleApiCall(
            () => api.get<CitySearchResult[]>('/search.json', {
                params: {q: encodeURIComponent(query)}
            })
        );
    },

}