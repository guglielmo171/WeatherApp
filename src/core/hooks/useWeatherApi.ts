// import {Weather} from "@/types/dto/Weather";
// import {CitySearchResult} from "@/types/dto/City";
// import {environment} from "@/configuration/environment";
// import {WeatherAPI} from "@/types/WeatherApi";
// import {useCallback, useState} from "react";
//
import {WeatherAPI} from "@/core/types/WeatherApi";

// const {API_KEY}=environment;
//
//
// const useWeatherApi = ():WeatherAPI => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<Error | null>(null);
//     const resetError = useCallback(() => {
//         setError(null);
//     }, []);
//
//
//     const fetchData = useCallback(async <T,>(url:string):Promise<T> => {
//         setLoading(true);
//         setError(null);
//         try{
//             const response=await fetch(url);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return await response.json();
//         }catch (e) {
//             const apiError = e instanceof Error ? e : new Error('Unknown API error');
//             setError(apiError);
//             throw apiError;
//         }finally {
//             setLoading(false);
//         }
//     },[])
//
//
//
//      const fetchCities =useCallback(async (query: string): Promise<CitySearchResult[]> => {
//          try{
//              return await fetchData<CitySearchResult[]>(`${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`);
//          }catch (err) {
//              const apiError = err instanceof Error ? err : new Error('Unknown API error');
//              console.error('Failed to fetch cities:', apiError);
//              throw new Error('Could not load cities. Please try again later.');
//          }
//      },[fetchData])
//
//     const fetchWeatherForecast = useCallback(async (cityUrl: string): Promise<Weather> => {
//        try{
//            return await fetchData<Weather>(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(cityUrl)}&days=5`);
//        }catch (err) {
//            const apiError = err instanceof Error ? err : new Error('Unknown API error');
//            console.error('Failed to fetch Weather Forecast:', apiError);
//            throw new Error('Could not load Forecast. Please try again later.');
//        }
//     },[fetchData]);
//
//
// const getUserIp= useCallback(async () => {
//     try{
//         return await fetchData<{ip:string}>(`https://api.ipify.org?format=json`);
//     }catch (err) {
//         const apiError = err instanceof Error ? err : new Error('Unknown API error');
//         console.error('Failed to fetch User ip:', apiError);
//         throw new Error('Could not load User ip. Please try again later.');
//     }
// },[fetchData])
//
//
//     return {fetchCities, fetchWeatherForecast, getUserIp,loading,error,resetError}
// }
//
//
// export default useWeatherApi;


import {useCallback, useMemo, useState} from "react";
import {ApiService, WeatherService} from "@/core/services/WeatherService";
import {CitySearchResult} from "@/core/types/dto/City";
import {Weather} from "@/core/types/dto/Weather";

const useWeatherApi = ():WeatherAPI =>{
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<Error | null>(null);
        const service= useMemo(()=>new WeatherService(),[]);


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
        },[service]);

    const fetchWeather = useCallback(async (cityUrl: string): Promise<Weather> => {
        try{
            setLoading(true);
            setError(null);
            return await service.fetchWeatherForecast(cityUrl);
        }catch (err) {
            const apiError = err instanceof Error ? err : new Error('Unknown API error');
            console.error('Failed to fetch cities:', apiError);
            throw new Error('Could not load cities. Please try again later.');
        }finally {
            setLoading(false);
        }
    },[service]);

        return {fetchCities,fetchWeather, loading, error,setError,setLoading}

}

export default useWeatherApi;