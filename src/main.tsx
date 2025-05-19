import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './app/App'
import {TooltipProvider} from "@radix-ui/react-tooltip";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TooltipProvider>
            <App/>
        </TooltipProvider>
    </StrictMode>,
)
