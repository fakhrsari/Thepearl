// src/services/bookingsService.ts
import { supabase } from '../lib/supabaseClient'

/** Shape of data coming from the form */
export interface BookingInput {
  name:     string;
  phone:    string;
  date:     Date;
  time:     string;
  category: string;
  service:  string;
}

/** Returns true if no booking exists at that date+time */
export async function isSlotAvailable(date: string, time: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('date', date)
    .eq('time_slot', time)

  if (error) throw error
  return data.length === 0
}

/** Inserts a new booking row */
export async function createBooking(input: BookingInput) {
  const payload = {
    name:       input.name,
    email:      input.phone,
    date:       input.date.toISOString().slice(0,10),
    time_slot:  input.time,
    category:   input.category,
    service:    input.service,
  };

  const { data, error } = await supabase
    .from('bookings')
    .insert([payload]);

  if (error) {
    // Postgres 23505 is unique-violation
    if (error.code === '23505') {
      throw new Error('Sorry, that date & time is already booked.');
    }
    throw error;
  }

  return data;

}