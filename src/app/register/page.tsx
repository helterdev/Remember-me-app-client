import Formulario from '@/components/RegisterForm/Form';

export default function Register() {
  return (
    <div className='h-screen flex justify-center items-center form-cover'>
      <div className='form-cover__modify'>
        <Formulario title='Register' />
      </div>
    </div>
  );
}
