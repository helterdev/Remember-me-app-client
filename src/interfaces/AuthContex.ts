import { Dispatch } from 'react';
import { InputsLogin } from './Data';
import { AxiosResponse } from 'axios';

export interface AuthProvider {
  saveUser: (data: UserState) => void;
  user: UserState | null;
  isAuthenticate: boolean;
  setIsAuthenticate: Dispatch<boolean>;
  singin: (data: InputsLogin) => void;
}
export interface UserState {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
}
