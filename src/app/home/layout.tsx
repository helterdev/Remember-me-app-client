import AuthNavbar from '@/components/AuthNavbar/AuthNavbar';
import React from 'react';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AuthNavbar />
      {children}
    </section>
  );
}
