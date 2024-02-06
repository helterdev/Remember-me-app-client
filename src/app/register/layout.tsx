import { Navbar } from '@/components/Navbar/Navbar';
import React from 'react';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={` text-black  bg-[url('/register.webp')] bg-cover bg-no-repeat`}
    >
      <Navbar />
      {children}
    </section>
  );
}
