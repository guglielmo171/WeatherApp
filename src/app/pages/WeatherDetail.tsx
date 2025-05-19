"use client"

import React, {useState} from "react"
import {WeatherIcons} from "@components/WeatherIcons"
import {Link, useLoaderData} from "react-router-dom";
import {Weather} from "@/core/types/dto/Weather";
import {getShortWeekday, getTimeFromEpoch} from "@/core/utils/dates";
import {Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis} from "recharts";
import {NameType} from "recharts/types/component/DefaultTooltipContent";
import {getWeatherGradient} from "@/core/utils/weather";


const WeatherDetail: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"forecast" | "hourly">("forecast")
    const {Thermometer, Droplets, Wind, Sunrise, Sunset, Eye, Gauge, Sun} = WeatherIcons
    const weatherData: Weather = useLoaderData();

    function handlePressure() {
        const index = weatherData.forecast.forecastday[0].hour.findIndex((h) => getTimeFromEpoch(h.time_epoch) === getTimeFromEpoch(weatherData.location.localtime_epoch))
        return weatherData.forecast.forecastday[0].hour[index].pressure_in;
    }

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div
                className={`bg-gradient-to-r ${getWeatherGradient(
                    weatherData.current.condition.text,
                )} p-8 text-white relative overflow-hidden`}
            >
                <Link
                    to={'/'}
                    className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
                >
                    <WeatherIcons.ArrowLeft className="h-5 w-5"/>
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">{weatherData.location.name}</h1>
                        {/*<h1 className="text-3xl md:text-4xl font-bold">{getHour(weatherData.location.localtime)}</h1>*/}

                        <p className="text-xl opacity-90">
                            {new Date().toLocaleDateString("it-IT", {weekday: "long", day: "numeric", month: "long"})}
                        </p>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0">

                        <img src={weatherData.current.condition.icon} alt="icona del meteo"
                             className="h-12 w-12 rounded-full"/>
                        <span className="text-6xl font-bold ml-4">{weatherData.current.temp_c}°</span>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex items-center">
                        <Thermometer className="h-6 w-6 mr-3 text-white/80"/>
                        <div>
                            <p className="text-white/80">Percepita</p>
                            <p className="text-xl font-semibold">{weatherData.current.feelslike_c}°C</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Droplets className="h-6 w-6 mr-3 text-white/80"/>
                        <div>
                            <p className="text-white/80">Umidità</p>
                            <p className="text-xl font-semibold">{weatherData.current.humidity}%</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Wind className="h-6 w-6 mr-3 text-white/80"/>
                        <div>
                            <p className="text-white/80">Vento</p>
                            <p className="text-xl font-semibold">{weatherData.current.wind_kph} km/h</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Sun className="h-6 w-6 mr-3 text-white/80"/>
                        <div>
                            <p className="text-white/80">UV Index</p>
                            <p className="text-xl font-semibold">{weatherData.current.uv}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="p-6">
                {/* Additional info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <Sunrise className="h-6 w-6 mr-3 text-orange-500"/>
                        <div>
                            <p className="text-gray-500">Alba</p>
                            <p className="font-medium">{weatherData.forecast.forecastday[0].astro.sunrise}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Sunset className="h-6 w-6 mr-3 text-orange-500"/>
                        <div>
                            <p className="text-gray-500">Tramonto</p>
                            <p className="font-medium">{weatherData.forecast.forecastday[0].astro.sunset}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Eye className="h-6 w-6 mr-3 text-blue-500"/>
                        <div>
                            <p className="text-gray-500">Visibilità</p>
                            <p className="font-medium">{weatherData.current.vis_km} km</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Gauge className="h-6 w-6 mr-3 text-blue-500"/>
                        <div>
                            <p className="text-gray-500">Pressione</p>
                            <p className="font-medium">{handlePressure()} hPa</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`py-2 px-4 font-medium ${
                                activeTab === "forecast"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTab("forecast")}
                        >
                            Previsioni 5 giorni
                        </button>
                        <button
                            className={`py-2 px-4 font-medium ${
                                activeTab === "hourly"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTab("hourly")}
                        >
                            Previsioni orarie
                        </button>
                    </div>

                    {/* Forecast content */}
                    {activeTab === "forecast" && (
                        <div className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {weatherData.forecast.forecastday.map((day, index) => (
                                    <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                                        <div
                                            className="text-center font-medium mb-2 uppercase">{getShortWeekday(day.date)}</div>
                                        <div
                                            className="flex justify-center mb-2">
                                            <img src={day.day.condition.icon} alt="icona del meteo"
                                                 className="h-12 w-12 rounded-full"/>

                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-600 font-medium">{day.day.mintemp_c}°</span>
                                            <div className="w-full mx-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-400 to-red-400"
                                                    style={{width: "100%"}}
                                                ></div>
                                            </div>
                                            <span className="text-red-500 font-medium">{day.day.maxtemp_c}°</span>
                                        </div>
                                        <div className="mt-3 text-sm text-gray-500 flex justify-between">
                                            <div className="flex items-center">
                                                <Droplets className="h-3 w-3 mr-1"/>
                                                <span>{day.day.totalprecip_mm}%</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Wind className="h-3 w-3 mr-1"/>
                                                <span>{day.day.maxwind_kph} km/h</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Hourly content with chart */}
                    {activeTab === "hourly" && (
                        <div className="mt-4">
                            <div className="bg-white border rounded-lg p-4 shadow-sm">
                                <h3 className="text-lg font-medium mb-4">Andamento temperatura (24 ore)</h3>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={weatherData.forecast.forecastday[0].hour}
                                                   margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                                            <XAxis
                                                dataKey="time_epoch"
                                                tickFormatter={(value) => getTimeFromEpoch(value)}
                                                tick={{fontSize: 12}}
                                            />
                                            <YAxis
                                                domain={['dataMin - 2', 'dataMax + 2']}
                                                tickFormatter={(value) => `${value}°C`}
                                                width={40}
                                                tick={{fontSize: 12}}
                                            />
                                            <Tooltip

                                                content={(tooltipProps: TooltipProps<string, NameType>) => {
                                                    if (!tooltipProps.active || !tooltipProps.payload?.length) return null;
                                                    const {active, payload, label} = tooltipProps;
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div
                                                                className="bg-white p-2 border rounded shadow-sm text-sm">
                                                                <p className="font-medium">{getTimeFromEpoch(label)}</p>
                                                                <p className="text-blue-500">{`${payload[0].value}°C`}</p>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="temp_c"
                                                stroke="#3b82f6"
                                                strokeWidth={2}
                                                dot={{r: 2}}
                                                activeDot={{r: 4}}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                                    {weatherData.forecast.forecastday[0].hour.slice(0, 6).map((hour, index) => (
                                        <div key={index} className="text-center">
                                            <div
                                                className="text-sm font-medium">{getTimeFromEpoch(hour.time_epoch)}</div>
                                            <div className="my-1 flex justify-center">
                                                <img src={hour.condition.icon} alt="icona del meteo"
                                                     className="h-12 w-12 rounded-full"/>
                                            </div>
                                            <div className="text-sm font-medium">{Math.round(hour.temp_c)}°</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WeatherDetail
