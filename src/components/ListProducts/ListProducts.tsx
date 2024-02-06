import { ProductsApi } from '@/interfaces/Api';
import './ListProducts.css';
type Props = {
  product: ProductsApi;
};
export default function ListProducts({ product }: Props) {
  return (
    <li className='w-60 rounded-lg shadow-md box-border h-96'>
      <div className='flex flex-col justify-end h-full'>
        <div className='flex justify-center py-4 flex-1'>
          <img
            src={`${product.photo}`}
            alt={`${product.name}`}
            className=' w-full '
          />
        </div>
        <div className='flex justify-around py-4 items-center'>
          <div>
            <h3 className='font-normal text-base'>{product.name}</h3>
          </div>
        </div>
        <div className='h-9'>
          <button
            type='button'
            className='w-full flex justify-center h-full items-center button'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </li>
  );
}
