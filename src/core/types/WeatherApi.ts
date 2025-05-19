import {Weather} from "@/core/types/dto/Weather";
import {CitySearchResult} from "@/core/types/dto/City";


export interface WeatherAPI {
    fetchCities: (query: string) => Promise<CitySearchResult[]>;
    fetchWeather: (query: string) => Promise<Weather>;
    loading: boolean;
    error: Error | null;
    setError: React.Dispatch<React.SetStateAction<Error | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


