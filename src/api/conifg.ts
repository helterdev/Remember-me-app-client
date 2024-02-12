import axios from 'axios';
const url = process.env.NEXT_PUBLIC_URL;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXTAUTH_SECRET}`,
  },
});

export default instance;
