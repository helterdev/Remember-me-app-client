'use client';
import { Button } from '@/components/UI/Button/Button';
import { ButtonHome } from '@/components/UI/ButtonHome/ButtonHome';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [width, setWidth] = useState<number | null>(null);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  if (width === null) {
    return <></>;
  }
  return (
    <main className='h-screen flex justify-center items-center bg-slate-900'>
      {width < 900 ? (
        <div className='w-2/5'>
          <Link href={'/register'}>
            <Button message='Start App' type='button' />
          </Link>
        </div>
      ) : (
        <div>
          <Link href={'/register'}>
            <ButtonHome />
          </Link>
        </div>
      )}
    </main>
  );
}
