'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '@/lib/api';
import { Appointment, AppointmentStatus } from '@/lib/types';

export function useAppointments(statusFilter?: AppointmentStatus) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAppointments(statusFilter);
      setAppointments(data);
    } catch {
      setError('No se pudieron cargar las citas. Verifica que el backend esté activo.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const markDone = useCallback(
    async (id: number) => {
      await updateAppointmentStatus(id, 'DONE');
      await fetchAll();
    },
    [fetchAll]
  );

  const cancel = useCallback(
    async (id: number) => {
      await updateAppointmentStatus(id, 'CANCELLED');
      await fetchAll();
    },
    [fetchAll]
  );

  const remove = useCallback(
    async (id: number) => {
      await deleteAppointment(id);
      await fetchAll();
    },
    [fetchAll]
  );

  return {
    appointments,
    loading,
    error,
    refetch: fetchAll,
    markDone,
    cancel,
    remove,
  };
}
