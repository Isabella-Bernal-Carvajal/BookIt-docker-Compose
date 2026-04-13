// ─────────────────────────────────────────────
// lib/types.ts — BookIt shared TypeScript types
// ─────────────────────────────────────────────

export type AppointmentStatus = 'PENDING' | 'DONE' | 'CANCELLED';

export interface Service {
  id: number;
  name: string;
  description: string;
  duration_minutes: number;
}

export interface Appointment {
  id: number;
  client_name: string;
  client_email: string;
  date: string;       // ISO date string  e.g. "2024-05-20"
  time: string;       // "HH:mm"
  status: AppointmentStatus;
  service: Service;
}

export interface CreateAppointmentPayload {
  client_name: string;
  client_email: string;
  date: string;
  time: string;
  service_id: number;
}
