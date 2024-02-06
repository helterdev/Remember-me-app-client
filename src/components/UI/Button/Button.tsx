import { useLoadingContext } from '@/hooks/useLoading/useLoadingContext';
import { Loader } from '../Loader/Loader';
import './Button.css';

type ButtonProps = {
  message: string;
  type: 'submit' | 'button';
};
export const Button = ({ message, type }: ButtonProps) => {
  const { loading } = useLoadingContext();

  return (
    <>
      <button className="button-submit" type={type}>
        {loading ? <Loader /> : message}
      </button>
    </>
  );
};
