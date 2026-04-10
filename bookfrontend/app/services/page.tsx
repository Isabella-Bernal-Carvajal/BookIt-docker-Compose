import type { Metadata } from 'next';
import ServiceList from '@/components/services/ServiceList';
import { LayoutGrid } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Servicios — BookIt',
  description: 'Explora todos los servicios disponibles para reservar tu cita en BookIt.',
};

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="rounded-xl bg-indigo-600/20 border border-indigo-500/30 p-2">
            <LayoutGrid className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Servicios
          </h1>
        </div>
        <p className="text-sm text-slate-400 ml-11">
          Estos son los servicios disponibles para agendar una cita.
        </p>
      </div>

      <ServiceList />
    </div>
  );
}
