import './App.css'
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "@/routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

  export const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minuti
                gcTime: 10 * 60 * 1000, // 10 minuti (era cacheTime)
                retry: 2,
                refetchOnWindowFocus: false,
            },
        },
    });
const App = () => {
    const router = createBrowserRouter(routes);
    return <QueryClientProvider client={queryClient}>

        <RouterProvider router={router}/>
        {/* DevTools per development */}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
}

export default App
