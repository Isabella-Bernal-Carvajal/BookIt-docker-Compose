'use client';

import { useState } from 'react';
import { AppointmentStatus } from '@/lib/types';
import AppointmentList from '@/components/appointments/AppointmentList';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import StatusFilter from '@/components/appointments/StatusFilter';
import Button from '@/components/ui/Button';
import { Plus, X } from 'lucide-react';

export default function AppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | ''>('');
  const [showForm, setShowForm] = useState(false);
  // Increment to force list refetch after form success
  const [listKey, setListKey] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setListKey((k) => k + 1);
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Citas
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Administra las reservas de tus clientes.
          </p>
        </div>
        <Button
          variant={showForm ? 'outline' : 'primary'}
          size="md"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? (
            <>
              <X className="w-4 h-4" />
              Cerrar
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Nueva cita
            </>
          )}
        </Button>
      </div>

      {/* Inline form panel */}
      {showForm && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md p-6 shadow-2xl">
          <AppointmentForm
            onSuccess={handleSuccess}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Filter + List */}
      <section>
        <div className="mb-5">
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        </div>
        <AppointmentList
          key={listKey}
          statusFilter={statusFilter}
          onNewAppointment={() => setShowForm(true)}
        />
      </section>
    </div>
  );
}
