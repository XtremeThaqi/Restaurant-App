export interface ReservationValues { date: string; time: string; guests: string; requests: string; }
export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>;
export const demoTimes = ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00"] as const;
export function localDate(date = new Date()) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}
export function validateReservation(values: ReservationValues, today = localDate()): ReservationErrors {
  const errors: ReservationErrors = {};
  const parsed = new Date(values.date + "T12:00:00");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || !Number.isFinite(parsed.getTime()) || localDate(parsed) !== values.date) errors.date = "Choose a valid reservation date.";
  else if (values.date <= today) errors.date = "Choose a date from tomorrow onwards for this demo.";
  if (!demoTimes.some(time => time === values.time)) errors.time = "Choose an example time.";
  if (!/^[1-8]$/.test(values.guests)) errors.guests = "Choose between 1 and 8 guests.";
  if (values.requests.length > 300) errors.requests = "Keep example requests within 300 characters.";
  return errors;
}
