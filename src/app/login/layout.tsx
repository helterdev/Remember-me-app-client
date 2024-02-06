import { Navbar } from '@/components/Navbar/Navbar';
import React from 'react';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={` bg-[url('/register.webp')] bg-cover bg-no-repeat  text-black`}
    >
      <Navbar />
      {children}
    </section>
  );
}
