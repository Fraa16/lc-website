/**
 * Booking data layer.
 *
 * Availability is still MOCK data (same pattern as the design prototype).
 * To connect a real calendar (Cal.com, Calendly or an own backend), replace
 * `useAvailability` – the BookingSection only depends on its return shape.
 */
import { useMemo } from 'react';
import { pad2 } from './format';

export type MeetingMode = 'video' | 'phone';

export interface BookingDay {
  /** ISO date, e.g. "2026-11-09" */
  iso: string;
  /** "MO" … "FR" */
  weekday: string;
  /** "09.11." (desktop label) */
  label: string;
  /** "09" (mobile label) */
  dayOfMonth: string;
  /** "Montag, 9. November" (confirmation text) */
  long: string;
}

export interface Availability {
  days: BookingDay[];
  times: string[];
  /** "KW 46" */
  weekLabel: string;
  isFree: (dayIndex: number, timeIndex: number) => boolean;
}

const WEEKDAYS = ['MO', 'DI', 'MI', 'DO', 'FR'];
const TIMES = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];

const toIsoDate = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

/** ISO 8601 calendar week. */
function isoWeek(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/** Monday–Friday of the coming week ("Freie Termine der nächsten Woche"). */
export function nextWeekDays(today = new Date()): BookingDay[] {
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const daysUntilMonday = (8 - monday.getDay()) % 7 || 7;
  monday.setDate(monday.getDate() + daysUntilMonday);

  return WEEKDAYS.map((weekday, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      iso: toIsoDate(d),
      weekday,
      label: `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.`,
      dayOfMonth: pad2(d.getDate()),
      long: d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }),
    };
  });
}

export function useAvailability(): Availability {
  return useMemo(() => {
    const days = nextWeekDays();
    // Parse as a local date; `new Date('YYYY-MM-DD')` would be UTC midnight.
    const [y, m, d] = days[0].iso.split('-').map(Number);
    return {
      days,
      times: TIMES,
      weekLabel: `KW ${isoWeek(new Date(y, m - 1, d))}`,
      // MOCK: deterministic "booked" slots, as in the prototype.
      isFree: (dayIndex, timeIndex) => (dayIndex * 2 + timeIndex) % 4 !== 0,
    };
  }, []);
}

export interface BookingRequest {
  name: string;
  email: string;
  telefon: string;
  firma: string;
  mode: MeetingMode;
  day: BookingDay;
  time: string;
}

/**
 * Stores the booking request in the existing Supabase `contact_submissions`
 * table (see supabase/migrations for the appointment columns).
 */
export async function submitBooking(b: BookingRequest) {
  const { supabase } = await import('./supabase');
  const { error } = await supabase.from('contact_submissions').insert({
    quelle: 'erstgespraech',
    name: b.name.trim(),
    email: b.email.trim(),
    telefon: b.telefon.trim() || null,
    firma: b.firma.trim() || null,
    termin_datum: b.day.iso,
    termin_uhrzeit: b.time,
    termin_art: b.mode === 'video' ? 'video' : 'telefon',
  });
  if (error) throw error;
}

/** Stores a callback request ("Rückruf") from the footer. */
export async function submitCallback(telefon: string) {
  const { supabase } = await import('./supabase');
  const { error } = await supabase.from('contact_submissions').insert({
    quelle: 'rueckruf',
    telefon: telefon.trim(),
  });
  if (error) throw error;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
