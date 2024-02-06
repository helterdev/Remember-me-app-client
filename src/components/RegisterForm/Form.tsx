'use client';
import { IoAtSharp, IoLockClosedOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';
import './Form.css';
import '../UI/Input/Input.css';
import { Button } from '../UI/Button/Button';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputsRegister } from '@/interfaces/Data';
import { userRegister } from '@/api/api';
import { useLoadingContext } from '@/hooks/useLoading/useLoadingContext';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNotify } from '@/hooks/useNotify/useNotify';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth/useAuth';
import { useRouter } from 'next/navigation';

type FormProps = {
  title: string;
};

type ApiError = {
  message: string;
  status: number;
};

const Formulario = ({ title }: FormProps) => {
  const {
    formState: { errors, isSubmitSuccessful },
    register,
    handleSubmit,
    reset,
  } = useForm<InputsRegister>();

  //CustomHooks Context
  const { isLoading, stopLoading } = useLoadingContext();
  const { saveUser, isAuthenticate, setIsAuthenticate } = useAuth();
  //NotifyHook
  const notify = useNotify();
  //router
  const router = useRouter();
  useEffect(() => {
    if (isSubmitSuccessful) {
      return reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (isAuthenticate) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticate, router]);
  const onsubmit: SubmitHandler<InputsRegister> = async (data) => {
    isLoading();
    try {
      const response: AxiosResponse = await userRegister(data);
      if (response.status === 200) {
        saveUser(response.data);
        stopLoading();
        return notify('Usuario registrado con éxito', 500, 'succes');
      }
    } catch (error) {
      const axiosError = axios.isAxiosError(error);
      if (axiosError) {
        const axiosError: AxiosError<ApiError> = error;
        if (axiosError.code === 'ERR_NETWORK') {
          stopLoading();
          return notify('Error al conectar al servirdor', 500, 'error');
        }

        stopLoading();
        return notify('El email ya se encuentra registrado', 500, 'error');
      }
    }
  };

  return (
    <form className='registerForm' onSubmit={handleSubmit(onsubmit)}>
      <div className='py-4 text-2xl font-bold text-center'>
        <h3>{title}</h3>
      </div>
      <div className='flex-column'>
        <label htmlFor='username' id='username'>
          Username
        </label>
      </div>
      <div>
        <div className='input-container'>
          {<CiUser />}
          <input
            type='text'
            className='input'
            placeholder='Enter your username'
            {...register('username', {
              required: { value: true, message: 'El Username es requerido' },
              minLength: {
                value: 3,
                message: 'El username debe contener al menos 3 carácteres',
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  'Ingrese un username valido, signos especiales aceptados: _',
              },
            })}
          />
        </div>
        {errors.username && (
          <p role='alert' className='text-red-500 text-xs'>
            {errors.username.message}
          </p>
        )}
      </div>
      <div className='flex-column'>
        <label htmlFor='email' id='email'>
          Email
        </label>
      </div>
      <div>
        <div className='input-container'>
          {<IoAtSharp />}
          <input
            type='email'
            className='input'
            placeholder='Enter your email'
            id='email'
            {...register('email', {
              required: { value: true, message: 'El email es requerido' },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Ingrese un formato valido, ej: xxx@email.com',
              },
            })}
          />
        </div>
        {errors.email && (
          <p role='alter' className='text-red-500 text-xs'>
            {errors.email.message}
          </p>
        )}
      </div>
      <div className='flex-column'>
        <label htmlFor='password' id='password'>
          Password
        </label>
      </div>
      <div>
        <div className='input-container'>
          {<IoLockClosedOutline />}
          <input
            type='password'
            className='input'
            placeholder='Enter your password'
            id='password'
            {...register('password', {
              required: { value: true, message: 'La contraseña es requerida' },
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al minímo 8 carácteres',
              },
            })}
          />
        </div>
        {errors.password && (
          <p role='alter' className='text-red-500 text-xs'>
            {errors.password.message}
          </p>
        )}
      </div>

      <Button message='Register' type='submit' />
      <p className='p'>
        Do you already have an account?
        <span className='span'>
          <Link href={'/login'}>Sign In</Link>
        </span>
      </p>
    </form>
  );
};

export default Formulario;
