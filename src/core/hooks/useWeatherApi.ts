import {useCallback, useState} from "react";
import {ApiService} from "@/core/services/WeatherService";
import {CitySearchResult} from "@/core/types/dto/City";
import {Weather} from "@/core/types/dto/Weather";
import {WeatherAPI} from "@/core/types/WeatherApi";

const useWeatherApi = ():WeatherAPI =>{
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<Error | null>(null);


        const fetchCities = useCallback(async (query: string): Promise<CitySearchResult[]> => {
            try{
                setLoading(true);
                setError(null);
                return await ApiService.searchCities(query);
            }catch (err) {
                const apiError = err instanceof Error ? err : new Error('Unknown API error');
                console.error('Failed to fetch cities:', apiError);
                throw new Error('Could not load cities. Please try again later.');
            }finally {
                setLoading(false);
            }
        },[]);

    const fetchWeather = useCallback(async (cityUrl: string): Promise<Weather> => {
        try{
            setLoading(true);
            setError(null);
            return await ApiService.fetchWeatherForecast(cityUrl);
        }catch (err) {
            const apiError = err instanceof Error ? err : new Error('Unknown API error');
            console.error('Failed to fetch cities:', apiError);
            throw new Error('Could not load cities. Please try again later.');
        }finally {
            setLoading(false);
        }
    },[]);

        return {fetchCities,fetchWeather, loading, error,setError,setLoading}

}

export default useWeatherApi;