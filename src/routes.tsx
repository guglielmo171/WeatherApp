import Layout from "@ui/Layout";
import HomePage from "@/app/pages/HomePage";
import NotFoundPage from "@/app/pages/NotFoundPage";
import WeatherDetail from "@/app/pages/WeatherDetail";
import React from "react";
import {LoaderFunctionArgs} from "react-router-dom";
import {WeatherService} from "@/core/services/WeatherService";

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
                loader: ({params}: LoaderFunctionArgs) => {

                    // Puoi usare il loader per precaricare i dati
                    if (!params.cityUrl) {
                        throw new Response("City not found", {status: 404});
                    }
                    const service = new WeatherService();
                    return service.fetchWeatherForecast(params.cityUrl);
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