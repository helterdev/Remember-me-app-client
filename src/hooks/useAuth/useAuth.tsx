'use client';

import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      'useAuth debe ser utilizado dentro de un AuthContextProvider'
    );
  }
  return authContext;
};
