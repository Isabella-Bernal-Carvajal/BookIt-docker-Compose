// ─────────────────────────────────────────────────────────────────
// lib/api.ts — Centralised HTTP layer for BookIt API
// All calls go through this module; never call fetch directly in UI.
// ─────────────────────────────────────────────────────────────────

import axios from 'axios';
import {
  Appointment,
  AppointmentStatus,
  CreateAppointmentPayload,
  Service,
} from './types';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Services ────────────────────────────────────────────────────

/**
 * GET /services
 * Returns the full list of available services.
 */
export async function getServices(): Promise<Service[]> {
  const { data } = await client.get<Service[]>('/services');
  return data;
}

// ── Appointments ─────────────────────────────────────────────────

/**
 * GET /appointments?status=<status?>
 * Returns appointments, optionally filtered by status.
 */
export async function getAppointments(
  status?: AppointmentStatus
): Promise<Appointment[]> {
  const params = status ? { status } : undefined;
  const { data } = await client.get<Appointment[]>('/appointments', {
    params,
  });
  return data;
}

/**
 * POST /appointments
 * Creates a new appointment and returns it.
 */
export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<Appointment> {
  const { data } = await client.post<Appointment>('/appointments', payload);
  return data;
}

/**
 * PATCH /appointments/:id/status
 * Updates an appointment's status to DONE or CANCELLED.
 */
export async function updateAppointmentStatus(
  id: number,
  status: AppointmentStatus
): Promise<Appointment> {
  const { data } = await client.patch<Appointment>(
    `/appointments/${id}/status`,
    { status }
  );
  return data;
}

/**
 * DELETE /appointments/:id
 * Removes an appointment permanently.
 */
export async function deleteAppointment(id: number): Promise<void> {
  await client.delete(`/appointments/${id}`);
}
