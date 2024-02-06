'use client';
import { toast } from 'sonner';

export const useNotify = () => {
  const notify = (message: string, time: number, type: 'succes' | 'error') => {
    const timer = setTimeout(() => {
      if (type === 'error') return toast.error(`${message}`);
      if (type === 'succes') return toast.success(`${message}`);
      return console.error(`El tipo: ${type} no es aceptado`);
    }, time);
    return () => clearTimeout(timer);
  };

  return notify;
};
