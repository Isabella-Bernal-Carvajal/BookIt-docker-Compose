// ─────────────────────────────────────────────
// lib/types.ts — BookIt shared TypeScript types
// ─────────────────────────────────────────────

export type AppointmentStatus = 'PENDING' | 'DONE' | 'CANCELLED';

export interface Service {
  id: number;
  name: string;
  description: string;
  duration: number; // minutes
}

export interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  date: string;       // ISO date string  e.g. "2024-05-20"
  time: string;       // "HH:mm"
  status: AppointmentStatus;
  service: Service;
}

export interface CreateAppointmentPayload {
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  serviceId: number;
}
