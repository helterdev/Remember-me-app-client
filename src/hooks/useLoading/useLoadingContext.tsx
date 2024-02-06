'use client';
import { LoadingContext } from '@/context/LoadingContex';
import { Loading } from '@/interfaces/LoadingContext';
import { useContext } from 'react';

export const useLoadingContext = (): Loading => {
  const Loading = useContext(LoadingContext);
  if (!Loading) {
    throw new Error(
      'useLoadingContext debe ser utilizado dentro de un LoadingProvider'
    );
  }

  return Loading;
};
