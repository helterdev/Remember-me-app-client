import Link from 'next/link';
import { MdBook } from "react-icons/md";
import './Navbar.css';
export const Navbar = () => {
  return (
    <header className='header'>
      <div className='w-4/5 mx-auto flex justify-between items-center bg-transparent py-8'>
        <div>
            <Link className='flex items-center' href={'/'}><MdBook className='w-6 h-6'/><span className='font-bold'>Home</span></Link>
        </div>
        <nav>
          <ul className='flex items-center gap-x-2'>
            <li>
              <Link href={'/register'}><span className= 'nav-button'>Sing Up</span></Link>
            </li>
            <li>
              <Link href={'/login'}><span className='nav-button nav-button__modify'>Login</span></Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
