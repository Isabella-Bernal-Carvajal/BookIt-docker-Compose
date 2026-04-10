'use client';

import { useState, FormEvent } from 'react';
import { useServices } from '@/hooks/useServices';
import { createAppointment } from '@/lib/api';
import { CreateAppointmentPayload } from '@/lib/types';
import { showToast } from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/services/ServiceCard';
import Spinner from '@/components/ui/Spinner';
import { ErrorAlert } from '@/components/ui/StateViews';
import { User, Mail, Calendar, Clock, X } from 'lucide-react';

interface AppointmentFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

interface FormFields {
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  serviceId: string;
}

interface FormErrors {
  clientName?: string;
  clientEmail?: string;
  date?: string;
  time?: string;
  serviceId?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.clientName.trim()) errors.clientName = 'El nombre es requerido.';
  if (!fields.clientEmail.trim())
    errors.clientEmail = 'El correo es requerido.';
  else if (!validateEmail(fields.clientEmail))
    errors.clientEmail = 'Ingresa un email válido.';
  if (!fields.date) errors.date = 'La fecha es requerida.';
  if (!fields.time) errors.time = 'La hora es requerida.';
  if (!fields.serviceId) errors.serviceId = 'Selecciona un servicio.';
  return errors;
}

const INPUT_BASE =
  'w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 ' +
  'focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-500 transition-all duration-200';

const ERROR_MSG = 'mt-1 text-xs text-rose-400';

export default function AppointmentForm({
  onSuccess,
  onClose,
}: AppointmentFormProps) {
  const { services, loading: servicesLoading, error: servicesError, refetch } = useServices();

  const [fields, setFields] = useState<FormFields>({
    clientName: '',
    clientEmail: '',
    date: '',
    time: '',
    serviceId: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof FormFields) => (val: string) => {
    setFields((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload: CreateAppointmentPayload = {
      clientName: fields.clientName.trim(),
      clientEmail: fields.clientEmail.trim(),
      date: fields.date,
      time: fields.time,
      serviceId: Number(fields.serviceId),
    };

    setSubmitting(true);
    try {
      await createAppointment(payload);
      showToast('success', '¡Cita registrada exitosamente!');
      onSuccess?.();
    } catch {
      showToast('error', 'No se pudo crear la cita. Verifica los datos.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Nueva Cita</h2>
          <p className="text-sm text-slate-400">Completa todos los campos para registrar una cita.</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors rounded-lg p-1 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Client Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1.5">
            <User className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
            Nombre del cliente
          </label>
          <input
            id="clientName"
            type="text"
            placeholder="Ej. María González"
            value={fields.clientName}
            onChange={(e) => set('clientName')(e.target.value)}
            className={[INPUT_BASE, errors.clientName ? 'border-rose-500 focus:ring-rose-500/50' : ''].join(' ')}
          />
          {errors.clientName && <p className={ERROR_MSG}>{errors.clientName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1.5">
            <Mail className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
            Correo electrónico
          </label>
          <input
            id="clientEmail"
            type="email"
            placeholder="maria@ejemplo.com"
            value={fields.clientEmail}
            onChange={(e) => set('clientEmail')(e.target.value)}
            className={[INPUT_BASE, errors.clientEmail ? 'border-rose-500 focus:ring-rose-500/50' : ''].join(' ')}
          />
          {errors.clientEmail && <p className={ERROR_MSG}>{errors.clientEmail}</p>}
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
              Fecha
            </label>
            <input
              id="appointmentDate"
              type="date"
              value={fields.date}
              onChange={(e) => set('date')(e.target.value)}
              className={[
                INPUT_BASE,
                '[color-scheme:dark]',
                errors.date ? 'border-rose-500 focus:ring-rose-500/50' : '',
              ].join(' ')}
            />
            {errors.date && <p className={ERROR_MSG}>{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              <Clock className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
              Hora
            </label>
            <input
              id="appointmentTime"
              type="time"
              value={fields.time}
              onChange={(e) => set('time')(e.target.value)}
              className={[
                INPUT_BASE,
                '[color-scheme:dark]',
                errors.time ? 'border-rose-500 focus:ring-rose-500/50' : '',
              ].join(' ')}
            />
            {errors.time && <p className={ERROR_MSG}>{errors.time}</p>}
          </div>
        </div>

        {/* Service selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Servicio
          </label>
          {errors.serviceId && <p className={`${ERROR_MSG} mb-2`}>{errors.serviceId}</p>}

          {servicesLoading ? (
            <Spinner size="sm" />
          ) : servicesError ? (
            <ErrorAlert message={servicesError} onRetry={refetch} />
          ) : (
            <div className="grid gap-2 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
              {services.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  service={svc}
                  selected={fields.serviceId === String(svc.id)}
                  onSelect={(id) => set('serviceId')(String(id))}
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            loading={submitting}
            size="lg"
            className="w-full"
          >
            {submitting ? 'Registrando…' : 'Registrar cita'}
          </Button>
        </div>
      </form>
    </div>
  );
}
