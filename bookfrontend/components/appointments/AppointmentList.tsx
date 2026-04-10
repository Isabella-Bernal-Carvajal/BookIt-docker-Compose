'use client';

import { Appointment, AppointmentStatus } from '@/lib/types';
import { useAppointments } from '@/hooks/useAppointments';
import AppointmentCard from './AppointmentCard';
import Spinner from '@/components/ui/Spinner';
import { ErrorAlert, EmptyState } from '@/components/ui/StateViews';
import { showToast } from '@/components/ui/Toast';

interface AppointmentListProps {
  statusFilter: AppointmentStatus | '';
  onNewAppointment?: () => void;
}

export default function AppointmentList({
  statusFilter,
  onNewAppointment,
}: AppointmentListProps) {
  const { appointments, loading, error, refetch, markDone, cancel, remove } =
    useAppointments(statusFilter || undefined);

  const handleMarkDone = async (id: number) => {
    try {
      await markDone(id);
      showToast('success', 'Cita marcada como completada.');
    } catch {
      showToast('error', 'No se pudo actualizar el estado de la cita.');
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await cancel(id);
      showToast('warning', 'Cita cancelada.');
    } catch {
      showToast('error', 'No se pudo cancelar la cita.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
      showToast('success', 'Cita eliminada correctamente.');
    } catch {
      showToast('error', 'No se pudo eliminar la cita.');
    }
  };

  if (loading) return <Spinner size="lg" />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  if (!appointments.length)
    return (
      <EmptyState
        title="Sin citas"
        description={
          statusFilter
            ? `No hay citas con estado "${statusFilter}".`
            : 'Aún no se han registrado citas.'
        }
        action={
          onNewAppointment ? (
            <button
              onClick={onNewAppointment}
              className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2"
            >
              Crear primera cita →
            </button>
          ) : undefined
        }
      />
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {appointments.map((apt: Appointment) => (
        <AppointmentCard
          key={apt.id}
          appointment={apt}
          onMarkDone={handleMarkDone}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
