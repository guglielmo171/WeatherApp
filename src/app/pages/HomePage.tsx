import React, {useEffect, useState} from 'react';
import {Weather} from "@/core/types/dto/Weather";
import WeatherCard from "@components/WeatherCard";
import Autocomplete from "@ui/autocomplete";
import {CitySearchResult} from "@/core/types/dto/City";
import {useQueries, useQuery} from "@tanstack/react-query";
import {ApiService} from "@/core/services/WeatherService";

const initialKeySearch = localStorage.getItem('searchKey')
interface FavoritesState {
    ids: string[];       // Solo gli ID dei preferiti
    weatherData: Weather[]; // Dati meteo dei preferiti
}

const HomePage = () => {

    const [searchQuery, setSearchQuery] = useState(initialKeySearch || 'Italy');
    const [debounceSearch, setDebounceSearch] = useState(searchQuery)
    const [favorites, setFavorites] = useState<FavoritesState>({
        ids: [],
        weatherData: []
    });

    // Debouncing per searchQuery
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // 1. Query per cercare città
    const {
        data:cities,
        isLoading: citiesLoading,
        error: citiesError,
        isFetching: citiesFetching
    } = useQuery<CitySearchResult[]>({
        queryKey: ['cities', debounceSearch],
        queryFn: () => ApiService.searchCities(debounceSearch),
        enabled: debounceSearch.length >= 2,
        staleTime: 30000,
        select: (data) => data.slice(0, 5) // Limita a 5 risultati
    });

    // 2. Query parallele per weather delle città trovate
    const weatherQueries = useQueries({
        queries: (cities || []).map(city => ({
            queryKey: ['weather', city.url],
            queryFn: () => ApiService.fetchWeatherForecast(city.url),
            staleTime: 10 * 60 * 1000, // 10 minuti per weather
            enabled: !!city.url
        }))
    });

    // 3. Query per caricare favorites al mount
    const {
        data: storedFavoriteIds
    } = useQuery<string[]>({
        queryKey: ['favorites', 'ids'],
        queryFn: () => {
            const stored = localStorage.getItem("favorites");
            return Promise.resolve(JSON.parse(stored || "[]"));
        },
        staleTime: Infinity, // Non rifare questa query
    });

    // 4. Query parallele per weather dei favoriti
    const favoriteWeatherQueries = useQueries({
        queries: (favorites.ids || []).map(cityUrl => ({
            queryKey: ['weather', cityUrl],
            queryFn: () => ApiService.fetchWeatherForecast(cityUrl),
            staleTime: 10 * 60 * 1000,
            enabled: !!cityUrl
        }))
    });

    // Sincronizza favorites con localStorage
    useEffect(() => {
        if (storedFavoriteIds) {
            setFavorites(prev => ({
                ...prev,
                ids: storedFavoriteIds
            }));
        }
    }, [storedFavoriteIds]);

    // Aggiorna weatherData dei favoriti quando le query si completano
    useEffect(() => {
        const favoriteWeatherData = favoriteWeatherQueries
            .map(query => query.data)
            .filter((data): data is Weather => !!data);

        if (favoriteWeatherData.length > 0) {
            setFavorites(prev => ({
                ...prev,
                weatherData: favoriteWeatherData
            }));
        }
    }, [favoriteWeatherQueries]);

    // Salva searchQuery in localStorage
    useEffect(() => {
        if (debounceSearch.length >= 2) {
            localStorage.setItem('searchKey', debounceSearch);
        }
    }, [debounceSearch]);

    // ✅ Calcola weatherData direttamente nel render
    const favoriteWeatherData = favoriteWeatherQueries
        .map(query => query.data)
        .filter((data): data is Weather => !!data);


    const toggleFavorite = async (weather:Weather)=>{
        // if (favorites.ids.some(id => id === weather.url_city)) return;
        const isPresent = favorites.ids.includes(weather.url_city);
        const updatedIds = isPresent
            ? favorites.ids.filter(id => id !== weather.url_city)
            : [...favorites.ids, weather.url_city];

        console.log(updatedIds)
        // Aggiorna sessionStorage
        localStorage.setItem("favorites", JSON.stringify(updatedIds));

        // Aggiorna stato
        setFavorites(prev => ({
            ids: updatedIds,
            weatherData: isPresent
                ? prev.weatherData.filter(w => w.url_city !== weather.url_city)
                : [...prev.weatherData, weather]
        }));
    }

    // Estrai weatherData dalle query
    const weatherData = weatherQueries
        .map(query => query.data)
        .filter((data): data is Weather => !!data);

    const isLoadingWeather = weatherQueries.some(query => query.isLoading);
    const hasWeatherError = weatherQueries.some(query => query.error);

    return (
        <div className="min-h-screen p-4 bg-gradient-to-b from-sky-50 to-blue-100">
            <h1 className="text-3xl font-bold mb-8 text-blue-800 text-center">Ricerca una localita</h1>
            <Autocomplete
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca una città..."
            />

            {/*Loading states*/}
            {citiesLoading && <p className="mt-2">Caricamento citta ...</p>}
            {citiesFetching && !citiesLoading && <p className="mt-2">Aggiornamento citta ...</p>}

            {isLoadingWeather && <p className="mt-2">Caricamento meteo...</p>}

            {/* Error states */}
            {citiesError && (
                <p className="mt-2 text-red-500">
                    Errore nel caricamento città: {citiesError.message}
                </p>
            )}
            {hasWeatherError && (
                <p className="mt-2 text-red-500">
                    Errore nel caricamento meteo
                </p>
            )}


            <div className="container mx-auto py-4">
                {/* Risultati ricerca */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weatherData.map((city, index) => (
                            <WeatherCard
                                isFavorite={favorites.ids.includes(city.url_city)}
                                key={`${city.url_city}-${index}`}
                                weatherData={city}
                                addFavourites={toggleFavorite}
                            />
                    ))}
                </div>

                {/* Empty state per ricerca */}
                {cities && cities.length === 0 && debounceSearch.length >= 2 && (
                    <div className="text-center py-4">
                        Nessuna città trovata per "{debounceSearch}"
                    </div>
                )}

                {/* Sezione Favoriti */}
                <h1 className="text-3xl font-bold mb-8 text-blue-800 text-center py-12">Le Tue Città</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteWeatherData.length > 0 &&
                        favoriteWeatherData.map((city, index) => (
                        <WeatherCard
                            key={`${city.url_city}-${index}`}
                            weatherData={city}
                            addFavourites={toggleFavorite}
                            isFavorite={favorites.ids.includes(city.url_city)}
                        />
                    ))}
                </div>

                {/* Empty state per favoriti */}
                {favoriteWeatherData.length === 0 && (
                    <div className="py-6 text-center text-sm text-gray-500">
                        Nessun preferito salvato
                    </div>
                )}

            </div>
        </div>
    )
};

export default HomePage;