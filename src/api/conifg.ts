import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
});

export const productsIntance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCTS_API,
  withCredentials: false,
});

export default instance;
