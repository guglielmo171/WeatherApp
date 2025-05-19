import type React from "react"
import {createContext, useContext, useState} from "react"

type TabsContextType = {
    value: string
    onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export const Tabs = ({
                         defaultValue,
                         value,
                         onValueChange,
                         className,
                         children,
                         ...props
                     }: React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
}) => {
    const [tabValue, setTabValue] = useState(value || defaultValue || "")

    const handleValueChange = (newValue: string) => {
        setTabValue(newValue)
        onValueChange?.(newValue)
    }

    return (
        <TabsContext.Provider value={{value: tabValue, onValueChange: handleValueChange}}>
            <div className={`w-full ${className || ""}`} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    )
}

export const TabsList = ({className, children, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className || ""}`}
            {...props}
        >
            {children}
        </div>
    )
}

export const TabsTrigger = ({
                                value,
                                className,
                                children,
                                ...props
                            }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) => {
    const context = useContext(TabsContext)

    if (!context) {
        throw new Error("TabsTrigger must be used within a Tabs component")
    }

    const isActive = context.value === value

    return (
        <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            } ${className || ""}`}
            onClick={() => context.onValueChange(value)}
            {...props}
        >
            {children}
        </button>
    )
}

export const TabsContent = ({
                                value,
                                className,
                                children,
                                ...props
                            }: React.HTMLAttributes<HTMLDivElement> & { value: string }) => {
    const context = useContext(TabsContext)

    if (!context) {
        throw new Error("TabsContent must be used within a Tabs component")
    }

    if (context.value !== value) {
        return null
    }

    return (
        <div
            className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className || ""}`}
            {...props}
        >
            {children}
        </div>
    )
}
