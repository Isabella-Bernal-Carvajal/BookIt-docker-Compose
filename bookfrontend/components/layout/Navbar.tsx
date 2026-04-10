'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck, LayoutGrid, BookOpen } from 'lucide-react';

const navLinks = [
  { href: '/appointments', label: 'Citas', icon: CalendarCheck },
  { href: '/services', label: 'Servicios', icon: LayoutGrid },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/appointments"
          className="flex items-center gap-2.5 group"
        >
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-2 shadow-lg shadow-indigo-900/50 group-hover:shadow-indigo-700/60 transition-shadow">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            Book<span className="text-indigo-400">It</span>
          </span>
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
                    active
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-600/40'
                      : 'text-slate-400 hover:text-white hover:bg-white/10',
                  ].join(' ')}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
