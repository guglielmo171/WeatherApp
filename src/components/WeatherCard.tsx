"use client"

import React, {useEffect} from "react"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./ui/tabs"
import {WeatherIcons} from "./WeatherIcons"
import {Weather} from "@/core/types/dto/Weather";
import {Link} from "react-router-dom";
import {getShortWeekday} from "@/core/utils/dates";
import {HeartFilledIcon, HeartIcon} from "@radix-ui/react-icons";
import * as Toggle from "@radix-ui/react-toggle";

interface WeatherCardProps {
    weatherData: Weather
    addFavourites:(weather:Weather)=>void
    isFavorite: boolean
}



const WeatherCard: React.FC<WeatherCardProps> = ({weatherData,addFavourites,isFavorite:isFavourite}) => {
    const {Thermometer, Droplets, Wind, ArrowRight} = WeatherIcons


    useEffect(() => {
        console.log('weatherData', weatherData)
    }, []);
    return (
        <Card className="w-full max-w-md mx-auto overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl">{weatherData.location.name}</CardTitle>
                        <CardDescription className="text-white/80">
                            {weatherData.location.country} -
                            {new Date().toLocaleDateString("it-IT", {weekday: "long", day: "numeric", month: "long"})}
                        </CardDescription>
                    </div>
                    {/*{getWeatherIcon(weatherData.current.condition.text)}*/}
                    <img src={weatherData.current.condition.icon} alt="icona del meteo"
                         className="h-12 w-12 rounded-full"/>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <Thermometer className="mr-2 h-5 w-5 text-rose-500"/>
                        <span className="text-4xl font-bold">{weatherData.current.temp_c}°C</span>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-medium capitalize">{weatherData.current.condition.text}</div>
                        <div className="text-sm text-muted-foreground">Percepita: {weatherData.current.feelslike_c}°C
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                        <Droplets className="mr-2 h-5 w-5 text-blue-500"/>
                        <div>
                            <div className="text-sm text-muted-foreground">Umidità</div>
                            <div>{weatherData.current.humidity}%</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Wind className="mr-2 h-5 w-5 text-blue-500"/>
                        <div>
                            <div className="text-sm text-muted-foreground">Vento</div>
                            <div>{weatherData.current.wind_kph} km/h</div>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="forecast" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="forecast">Previsioni</TabsTrigger>
                        <TabsTrigger value="hourly">Orarie</TabsTrigger>
                    </TabsList>
                    <TabsContent value="forecast" className="mt-4">
                        <div className="grid grid-cols-5 gap-2 text-center">
                            {/*{weatherData.forecast.forecastday.map((day, index) => ())}*/}
                            {weatherData.forecast.forecastday.map((day, index) => (
                                <div key={index} className="p-2 rounded-md bg-muted/50">
                                    <div className="text-sm font-medium uppercase">{getShortWeekday(day.date)}</div>
                                    <div className="my-1">
                                        <img src={day.day.condition.icon} alt="icona del meteo"
                                             className="h-12 w-12 rounded-full"/>

                                    </div>
                                    <div className="text-sm">{Math.ceil(day.day.avgtemp_c)}°</div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="hourly" className="mt-4">
                        <div className="text-center py-8 text-muted-foreground">Dati orari non disponibili</div>
                    </TabsContent>
                </Tabs>

                {/* Pulsante dettagli grande e visibile */}
                <Link

                    to={`forecastDetail/${weatherData.url_city}`}
                    className="w-full mt-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                >
                    Vedi dettagli
                    <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
            </CardContent>
            <CardFooter className="bg-muted/50 px-6 py-3 text-xs text-center text-muted-foreground">
                Ultimo aggiornamento: {new Date().toLocaleTimeString("it-IT")}
                {isFavourite.toString()}
                <Toggle.Root
                    pressed={isFavourite}
                    onPressedChange={()=>addFavourites(weatherData)}
                    aria-label="Aggiungi ai preferiti"
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    {isFavourite ? <HeartFilledIcon className="text-red-400" /> : <HeartIcon />}
                </Toggle.Root>
            </CardFooter>
        </Card>
    )
}

export default React.memo(WeatherCard)
