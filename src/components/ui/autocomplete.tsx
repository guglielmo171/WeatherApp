import React, {useEffect, useState} from 'react';
import {Check, ChevronDown, Search} from "lucide-react";
import {ApiService} from "@/core/services/WeatherService";
import {useQuery} from "@tanstack/react-query";
import {CitySearchResult} from "@/core/types/dto/City";

const Autocomplete = ({value,onChange}:React.InputHTMLAttributes<HTMLInputElement>) => {
   // const {fetchCities}=useWeatherApi();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [list, setList] = useState<string[]>([]);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    // UNICA FONTE DI VERITÀ - Usa solo useQuery con cache condivisa
    const {
        data:cities
    } = useQuery<CitySearchResult[]>({
        queryKey: ['cities', debouncedSearch], // Stessa key del HomePage
        queryFn: () => ApiService.searchCities(debouncedSearch),
        enabled: debouncedSearch.length >= 2, // Esegui solo con almeno 2 caratteri
        staleTime: 5 * 60 * 1000, // 5 minuti cache
    });

    // Debouncing logic con useEffect
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [search]);


    // Mappa cities a list di nomi (come nel tuo codice originale)
    useEffect(() => {
        if (cities && cities.length > 0) {
            setList(cities.map(city => city.name));
        } else {
            setList([]);
        }
    }, [cities]);

    // Sincronizza search con value del parent
    useEffect(() => {
        if (value !== search) {
            setSearch(value as string || '');
        }
    }, [value]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        setSearch(inputText);

        // Gestisci apertura/chiusura dropdown
        if (inputText.length >= 2 && !open) {
            setOpen(true);
        } else if (inputText.length < 2) {
            setOpen(false);
        }

        // Propaga l'evento al parent
        if (onChange) {
            onChange(e);
        }
    };
    // useEffect(() => {
    //     // Non fare richieste se search è troppo breve
    //     if (search.length < 2) {
    //         setList([]);
    //         return;
    //     }
    //
    //     // Aggiungi un debounce per evitare troppe chiamate API
    //     const timer = setTimeout(async () => {
    //         try {
    //             const cities = await fetchCities(search);
    //             setList(cities.map(city => city.name));
    //         } catch (error) {
    //             console.error("Errore nel recuperare le città:", error);
    //             setList([]);
    //         }
    //     }, 300); // Aspetta 300ms prima di fare la richiesta
    //
    //     // Cleanup function
    //     return () => clearTimeout(timer);
    // }, [search]);


    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //
    //     const inputText = e.target.value;
    //     setSearch(inputText);
    //     // Apre il menu se c'è testo nell'input
    //     if (inputText.length > 2 && !open) {
    //         setOpen(true);
    //     }
    //     // Chiudi il menu se l'input è vuoto
    //     else if (inputText.length === 0) {
    //         setOpen(false);
    //     }
    //     if (onChange) {
    //         onChange(e);
    //     }
    // };


    return (
        <div className="w-full max-w-md mx-auto" >
            <div className="relative mt-2">
                {/* Input trigger */}
                <div
                    className="flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex-1 flex items-center">
                        <input
                            className="w-full border-none bg-transparent outline-none"
                            placeholder="Seleziona una città"
                            value={search}
                            onChange={handleSearchChange}
                            onClick={(e) => e.stopPropagation()}

                        />
                    </div>
                    <div className="flex items-center">
                        {value && (
                            <button
                                className="mr-1 text-gray-500 hover:text-gray-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSearch('');
                                }}
                            >
                                &times;
                            </button>
                        )}
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                </div>

                {/* Dropdown content */}
                {open && (
                    <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg">
                        <div className="px-3 py-2 border-b">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Search className="h-4 w-4" />
                                <span className="text-xs">Risultati per "{search}"</span>
                            </div>
                        </div>

                        {list.length > 0 ? (
                            list.map((option,idx) => (
                                <div
                                    key={idx}
                                    className={`relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-blue-100 ${value === option ? 'bg-blue-50' : ''}`}
                                    onClick={() => {
                                        // setValue(option);
                                        // setSearch(option);
                                        // setOpen(false);
                                        // Crea un evento sintetico simile a quello generato da un input
                                        const syntheticEvent = {
                                            target: { value: option },
                                            preventDefault: () => {},
                                            stopPropagation: () => {}
                                        };

                                        // Chiama handleSearchChange con l'evento sintetico
                                        handleSearchChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);

                                        // Chiudi il dropdown
                                        setOpen(false);
                                    }}
                                >
                  <span className={`block truncate ${value === option ? 'font-medium' : 'font-normal'}`}>
                    {option}
                  </span>
                                    {value === option && (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Check className="h-4 w-4 text-blue-600" />
                    </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="py-6 text-center text-sm text-gray-500">
                                Nessun risultato trovato
                            </div>
                        )}
                    </div>
                )}
            </div>

            {value && (
                <div className="mt-4 p-2 bg-blue-50 rounded-md text-sm">
                    Città selezionata: <strong>{value}</strong>
                </div>
            )}
        </div>
    );
};


export default Autocomplete;