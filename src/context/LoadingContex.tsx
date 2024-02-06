'use client'
import { Loading } from "@/interfaces/LoadingContext";
import React, { createContext, useState } from "react";

interface ProviderProps {
    children: React.ReactNode
}
export const LoadingContext = createContext<Loading>({} as Loading);

export const LoadingProvider = ({children}: ProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const isLoading = (): void => {
        setLoading(true);
    }

    const stopLoading = (): void => {
        setLoading(false);
    }
    return <LoadingContext.Provider value={{loading, isLoading, stopLoading}}>
        {children}
    </LoadingContext.Provider>
}