import Layout from "@ui/Layout";
import HomePage from "@/app/pages/HomePage";
import NotFoundPage from "@/app/pages/NotFoundPage";
import WeatherDetail from "@/app/pages/WeatherDetail";
import React from "react";
import {LoaderFunctionArgs} from "react-router-dom";
import {ApiService} from "@/core/services/WeatherService";
import {queryClient} from "@/app/App";

const routes = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: 'forecastDetail/:cityUrl',
                element: <WeatherDetail
                />,
                loader:async  ({params}: LoaderFunctionArgs) => {

                    if (!params.cityUrl) {
                        throw new Response("City not found", {status: 404});
                    }
                    try {
                        const weatherData = await queryClient.ensureQueryData({
                            queryKey: ['weather', params.cityUrl],
                            queryFn: () => ApiService.fetchWeatherForecast(params.cityUrl!),
                            staleTime: 10 * 60 * 1000, // 10 minuti fresh
                        });

                        return weatherData;
                    } catch (error) {
                        console.error('Failed to load weather data:', error);
                        throw new Response("Failed to load weather data", { status: 500 });
                    }
                }
            },
            {
                path: '*',
                element: <NotFoundPage/>,
            }
        ]
    }
];

export default routes;