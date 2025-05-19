import React, {useEffect, useState} from 'react';
import {Weather} from "@/types/dto/Weather";
import WeatherCard from "@components/WeatherCard";
import Autocomplete from "@ui/autocomplete";
import useWeatherApi from "@/hooks/useWeatherApi";
import {CitySearchResult} from "@/types/dto/City";

const initialKeySearch = localStorage.getItem('searchKey')
interface FavoritesState {
    ids: string[];       // Solo gli ID dei preferiti
    weatherData: Weather[]; // Dati meteo dei preferiti
}

const HomePage = () => {
    const {fetchCities,fetchWeather:fetchWeatherForecast,loading,error}=useWeatherApi();

    const [searchQuery, setSearchQuery] = useState(initialKeySearch || 'Italy');

    const [cities, setCities] = useState<CitySearchResult[]>([])
    const [weatherData, setWeatherData] = useState<Weather[]>([]);
    // const [ip, setIp] = useState("")
    const [favorites, setFavorites] = useState<FavoritesState>({
        ids: [],
        weatherData: []
    })

    useEffect(() => {
        (async () => {
            // setIp(await getUserIP());
            const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            setFavorites(prev => ({
                ...prev,
                ids: storedFavorites
            }));

            // Carica i dati meteo (se necessario)
            if (storedFavorites.length > 0) {
                const weatherPromises = storedFavorites.map((id: string) =>
                    fetchWeatherForecast(id)
                );
                const weatherResults = await Promise.all(weatherPromises);
                setFavorites(prev => ({
                    ...prev,
                    weatherData: weatherResults
                }));
            }
        })()

    }, []);

    // Trigger search state
    useEffect(() => {
        if (searchQuery.length < 3) return; // Cerca solo dopo 3+ caratteri
        localStorage.setItem('searchKey', searchQuery)
        const timer = setTimeout(async () => {
            try {
                const cities = await fetchCities(searchQuery);
                // console.log('cities', cities)
                setCities(cities.slice(0, 5)); // Limita a 5 risultati
            } catch (err) {
                const apiError = err instanceof Error ? err : new Error('Unknown  error');
                throw apiError;
            }
        }, 500); // Debounce di 500ms

        return () => clearTimeout(timer); // Cleanup
    }, [searchQuery]);

    const toggleFavorite = async (weather:Weather)=>{
        // if (favorites.ids.some(id => id === weather.url_city)) return;
        const isPresent = favorites.ids.includes(weather.url_city);
        const updatedIds = isPresent
            ? favorites.ids.filter(id => id !== weather.url_city)
            : [...favorites.ids, weather.url_city];

        console.log(updatedIds)
        // Aggiorna sessionStorage
        localStorage.setItem("favorites", JSON.stringify(updatedIds));


        // Aggiorna lo stato in un'unica operazione
        try{
            const weatherData= await fetchWeatherForecast(weather.url_city);
            setFavorites(prev => ({
                ids: updatedIds,
                weatherData: isPresent
                    ? prev.weatherData.filter(w => w.url_city !== weather.url_city)
                    : [...prev.weatherData, weatherData]
            }));
        }catch (e) {
            if (e instanceof Error) {
            console.error("Failed to fetch favorite weather:", error);
            }else{
                console.error("An error occurred");
            }
            // Fallback: aggiorna solo gli ID se il fetch fallisce
            setFavorites(prev => ({ ...prev, ids: updatedIds }));
        }
    }

    // Trigger state cities changes
    useEffect(() => {
        if (cities.length === 0) return;
        (async () => {
            try {
                const weatherPromises = cities.map(city => fetchWeatherForecast(city.url));
                const weatherResults = await Promise.all(weatherPromises);
                // console.log('weatherResults', weatherResults)
                setWeatherData(weatherResults);
            } catch (err) {
                const apiError = err instanceof Error ? err : new Error('Unknown API error');
                throw apiError;
            }
        })()
    }, [cities]);

    return (
        <div className="min-h-screen p-4 bg-gradient-to-b from-sky-50 to-blue-100">
            <h1 className="text-3xl font-bold mb-8 text-blue-800 text-center">Ricerca una localita</h1>
            <Autocomplete
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca una città..."
            />

            {loading && <p className="mt-2">Caricamento...</p>}
            {error && <p className="mt-2 text-red-500">{error.message}</p>}

            <div className="container mx-auto py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weatherData.map((city, index) => (
                            <WeatherCard isFavorite={favorites.ids.includes(city.url_city)} key={index} weatherData={city}  addFavourites={toggleFavorite}/>
                    ))}
                </div>

                <h1 className="text-3xl font-bold mb-8 text-blue-800 text-center py-12">Le Tue Città</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.weatherData.length > 0 && favorites.weatherData.map((city, index) => (
                        <WeatherCard key={index} weatherData={city} addFavourites={toggleFavorite} isFavorite={favorites.ids.includes(city.url_city)} />
                ))}
                </div>

                {!(favorites.weatherData.length > 0) &&  <div className="py-6 text-center text-sm text-gray-500">
                    Nessun risultato trovato
                </div>}

            </div>
        </div>
    )
};

export default HomePage;