'use client';
import { IoAtSharp, IoLockClosedOutline } from 'react-icons/io5';
import { Button } from '../UI/Button/Button';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputsLogin } from '@/interfaces/Data';
import { useAuth } from '@/hooks/useAuth/useAuth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '../RegisterForm/Form.css';
import '@/components/UI/Input/Input.css';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>();

  const { singin } = useAuth();
  const router = useRouter();

  const onsubmit: SubmitHandler<InputsLogin> = async (data) => {
    singin(data);
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (response?.ok) {
      return router.push('/home');
    }
  };

  return (
    <form className='registerForm' onSubmit={handleSubmit(onsubmit)}>
      <div className='py-4 text-2xl font-bold text-center'>
        <h3>Login</h3>
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
            {...register('email', {
              required: { value: true, message: 'El Username es requerido' },
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
            {...register('password', {
              required: { value: true, message: 'La contraseña es requerida' },
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 carácteres',
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
      <div className='flex-row'>
        <div>
          <input type='checkbox' />
          <label>Remember me </label>
        </div>
        <span className='span'>Forgot password?</span>
      </div>
      <Button message='Login' type='submit' />
      <p className='p'>
        You do not have an account?
        <span className='span'>
          <Link href={'/register'}>Sign Up</Link>
        </span>
      </p>
    </form>
  );
};
