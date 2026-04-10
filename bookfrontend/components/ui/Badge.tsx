import { AppointmentStatus } from '@/lib/types';

type BadgeVariant = AppointmentStatus | 'service' | 'neutral';

const styles: Record<BadgeVariant, string> = {
  PENDING:
    'bg-amber-500/20 text-amber-300 border border-amber-500/40 ring-1 ring-amber-500/20',
  DONE: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 ring-1 ring-emerald-500/20',
  CANCELLED:
    'bg-rose-500/20 text-rose-300 border border-rose-500/40 ring-1 ring-rose-500/20',
  service:
    'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 ring-1 ring-indigo-500/20',
  neutral:
    'bg-slate-500/20 text-slate-300 border border-slate-500/40 ring-1 ring-slate-500/20',
};

const dot: Record<BadgeVariant, string> = {
  PENDING: 'bg-amber-400',
  DONE: 'bg-emerald-400',
  CANCELLED: 'bg-rose-400',
  service: 'bg-indigo-400',
  neutral: 'bg-slate-400',
};

const labels: Partial<Record<BadgeVariant, string>> = {
  PENDING: 'Pendiente',
  DONE: 'Completada',
  CANCELLED: 'Cancelada',
};

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
}

export default function Badge({ variant, label }: BadgeProps) {
  const text = label ?? labels[variant] ?? variant;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[variant]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot[variant]}`} />
      {text}
    </span>
  );
}
