import { LoginForm } from '@/components/LoginForm/Login';
export default function Login() {
  return (
    <div className='h-screen flex justify-center items-center form-cover'>
      <div className='form-cover__modify'>
        <LoginForm />
      </div>
    </div>
  );
}
