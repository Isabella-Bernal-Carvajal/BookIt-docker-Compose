import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import ToastContainer from '@/components/ui/Toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BookIt — Sistema de Reservas de Citas',
  description:
    'Gestiona citas y servicios de forma sencilla con BookIt. Reserva, cancela y sigue el estado de tus citas en tiempo real.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {/* Ambient background blobs */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-indigo-800/15 blur-3xl" />
        </div>

        <Navbar />

        <main className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
          {children}
        </main>

        <ToastContainer />
      </body>
    </html>
  );
}
