import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { LoadingProvider } from '@/context/LoadingContex';
import { Toaster } from 'sonner';
import { AuthContextProvider } from '@/context/AuthContext';
import SessionAuthProvider from '@/context/SessionAuthProvider';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({
  weight: ['200', '400', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Remender App',
  description: 'Todo app for user',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${montserrat.className}`}>
        <SessionAuthProvider>
          <LoadingProvider>
            <AuthContextProvider>
              {children}
              <Toaster position='top-right' />
            </AuthContextProvider>
          </LoadingProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
