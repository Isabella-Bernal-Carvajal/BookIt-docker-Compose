'use client';

import { AppointmentStatus } from '@/lib/types';

const OPTIONS: { label: string; value: AppointmentStatus | '' }[] = [
  { label: 'Todas', value: '' },
  { label: 'Pendientes', value: 'PENDING' },
  { label: 'Completadas', value: 'DONE' },
  { label: 'Canceladas', value: 'CANCELLED' },
];

interface StatusFilterProps {
  value: AppointmentStatus | '';
  onChange: (v: AppointmentStatus | '') => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar por estado"
      className="flex flex-wrap gap-2"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value as AppointmentStatus | '')}
          className={[
            'px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200',
            value === opt.value
              ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/60 ring-1 ring-indigo-500/30'
              : 'text-slate-400 border-slate-700 hover:text-white hover:border-slate-500',
          ].join(' ')}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
