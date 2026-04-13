import { Service } from '@/lib/types';
import { Clock, Tag } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface ServiceCardProps {
  service: Service;
  selected?: boolean;
  onSelect?: (id: number) => void;
}

export default function ServiceCard({
  service,
  selected,
  onSelect,
}: ServiceCardProps) {
  const interactive = typeof onSelect === 'function';

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => e.key === 'Enter' && onSelect(service.id)
          : undefined
      }
      onClick={interactive ? () => onSelect(service.id) : undefined}
      className={[
        'group relative rounded-2xl border p-5 transition-all duration-200',
        interactive ? 'cursor-pointer' : '',
        selected
          ? 'border-indigo-500/70 bg-indigo-600/15 ring-1 ring-indigo-500/40'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8',
      ].join(' ')}
    >
      {/* Glow on selected */}
      {selected && (
        <div className="absolute inset-0 rounded-2xl bg-indigo-600/5 pointer-events-none" />
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
            {service.name}
          </h3>
          <p className="mt-1 text-sm text-slate-400 line-clamp-2">
            {service.description}
          </p>
        </div>
        <Badge variant="service" label={`${service.duration_minutes} min`} />
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {service.duration_minutes} minutos
        </span>
        <span className="flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" />
          ID {service.id}
        </span>
      </div>
    </div>
  );
}
