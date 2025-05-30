import {Weather} from "@/core/types/dto/Weather";
import {CitySearchResult} from "@/core/types/dto/City";
import {api, handleApiCall} from "@/configuration/axios";

export const ApiService = {
    searchCities: async (query: string): Promise<CitySearchResult[]> => {
        return handleApiCall(
            () => api.get<CitySearchResult[]>('/search.json', {
                params: {q: encodeURIComponent(query)}
            })
        );
    },
    fetchWeatherForecast: async (cityUrl: string): Promise<Weather> =>{
        return handleApiCall(
            ()=> api.get<Weather>('/forecast.json',{
                params: {
                    q: encodeURIComponent(cityUrl),
                    days: 5
                }
            })
        ).then(response=>({
            ...response,
            url_city:cityUrl
        }))
        // return {
        //
        // }
    }


}