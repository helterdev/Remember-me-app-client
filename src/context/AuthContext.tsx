'use client';
import { loginRequest } from '@/api/api';
import { useLoadingContext } from '@/hooks/useLoading/useLoadingContext';
import { useNotify } from '@/hooks/useNotify/useNotify';
import { AuthProvider, UserState } from '@/interfaces/AuthContex';
import { InputsLogin } from '@/interfaces/Data';
import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { createContext, useState } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

interface AxiosData {
  message: string;
}

export const AuthContext = createContext<AuthProvider>({} as AuthProvider);

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<UserState | null>(null);
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);
  const notify = useNotify();
  const { isLoading, stopLoading } = useLoadingContext();
  const saveUser = (data: UserState) => {
    if (data) {
      setUser(data);
      setIsAuthenticate(true);
    }
  };

  const singin = async (data: InputsLogin) => {
    isLoading();
    try {
      const response = await loginRequest(data);
      if (response.status === 200) {
        stopLoading();
        return notify('Welcome', 500, 'succes');
      }
    } catch (error) {
      stopLoading();
      const axiosError = axios.isAxiosError(error);
      if (axiosError) {
        const err: AxiosError = error;
        if (err.code === 'ERR_NETWORK') {
          return notify('Lost connection', 500, 'error');
        }
        return notify(`${err.response?.data}`, 500, 'error');
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{ saveUser, user, isAuthenticate, setIsAuthenticate, singin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
