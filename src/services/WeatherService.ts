import {BASE_URL} from "@/hooks/useWeatherApi";
import {Weather} from "@/types/dto/Weather";
import {CitySearchResult} from "@/types/dto/City";
import {environment} from "@/configuration/environment";

export class WeatherService {
    private baseUrl = BASE_URL;
    private apiKey=environment.API_KEY;


    async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) throw new Error(
            `HTTP error! status: ${response.status}`
        )
        return response.json();
    }

    async fetchCities(query: string): Promise<CitySearchResult[]> {
        const path=`${this.baseUrl}/search.json?key=${this.apiKey}&q=${encodeURIComponent(query)}`;
        return this.fetchData<CitySearchResult[]>(path);
    }

    async fetchWeatherForecast(cityUrl: string): Promise<Weather> {
        const path=`${this.baseUrl}/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(cityUrl)}&days=5`;
        let  response =await this.fetchData<Weather>(path)
        response={...response,url_city:cityUrl}
        return response;
    }
}