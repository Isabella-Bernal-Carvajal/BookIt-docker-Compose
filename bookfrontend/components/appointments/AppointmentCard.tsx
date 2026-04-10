'use client';

import { useState } from 'react';
import { Appointment } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { User, Mail, Calendar, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';

interface AppointmentCardProps {
  appointment: Appointment;
  onMarkDone: (id: number) => Promise<void>;
  onCancel: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function AppointmentCard({
  appointment,
  onMarkDone,
  onCancel,
  onDelete,
}: AppointmentCardProps) {
  const { id, clientName, clientEmail, date, time, status, service } =
    appointment;

  const [loadingDone, setLoadingDone] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handle = async (
    action: () => Promise<void>,
    setLoading: (v: boolean) => void
  ) => {
    setLoading(true);
    try {
      await action();
    } finally {
      setLoading(false);
    }
  };

  const isPending = status === 'PENDING';
  const isCancelled = status === 'CANCELLED';

  // Format date nicely
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString(
    'es-ES',
    { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
  );

  return (
    <article className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/8 hover:shadow-xl hover:shadow-black/20">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white truncate">{clientName}</h3>
          <div className="flex items-center gap-1.5 mt-0.5 text-slate-500 text-xs">
            <Mail className="w-3 h-3 shrink-0" />
            <span className="truncate">{clientEmail}</span>
          </div>
        </div>
        <Badge variant={status} />
      </div>

      {/* Service pill */}
      <div className="mb-4 flex items-center gap-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-3 py-2">
        <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
        <span className="text-sm text-indigo-300 font-medium truncate">
          {service.name}
        </span>
        <span className="ml-auto text-xs text-slate-500 shrink-0">
          {service.duration} min
        </span>
      </div>

      {/* Date & Time */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400 mb-5">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 shrink-0 text-slate-500" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 shrink-0 text-slate-500" />
          {time}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {isPending && (
          <>
            <Button
              variant="success"
              size="sm"
              loading={loadingDone}
              onClick={() => handle(() => onMarkDone(id), setLoadingDone)}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Marcar como DONE
            </Button>
            <Button
              variant="danger"
              size="sm"
              loading={loadingCancel}
              onClick={() => handle(() => onCancel(id), setLoadingCancel)}
            >
              <XCircle className="w-3.5 h-3.5" />
              Cancelar
            </Button>
          </>
        )}
        {isCancelled && (
          <Button
            variant="ghost"
            size="sm"
            loading={loadingDelete}
            onClick={() => handle(() => onDelete(id), setLoadingDelete)}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Eliminar
          </Button>
        )}
      </div>
    </article>
  );
}
