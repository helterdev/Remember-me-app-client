import Link from 'next/link';
import { MdBook } from 'react-icons/md';
import '../Navbar/Navbar.css';
import { Slider } from '../Slider/Slider';

export default function AuthNavbar() {
  return (
    <header>
      <div className='h-24 w-4/5 mx-auto flex justify-between items-center bg-transparent py-8'>
        <div>
          <Link className='flex items-center' href={'/home'}>
            <MdBook className='w-6 h-6' />
            <span className='font-bold'>Home</span>
          </Link>
        </div>
        <nav>
          <ul className='flex items-center gap-x-2'>
            {/* <li className='font-bold'>Nombre</li> */}
            <li>
              <Slider />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
