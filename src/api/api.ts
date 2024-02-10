import { InputsLogin, InputsRegister } from '@/interfaces/Data';
import axios from './conifg';

const url = process.env.NEXT_PUBLIC_PRODUCTS_API || '';

export const userRegister = async (data: InputsRegister) => {
  const response = await axios.post(`/register`, data);

  return response;
};

export const loginRequest = async (data: InputsLogin) => {
  return await axios.post(`/login`, data);
};

export const logout = async () => {
  return await axios.post('/logout');
};
