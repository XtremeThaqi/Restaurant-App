"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { demoTimes, localDate, validateReservation, type ReservationErrors, type ReservationValues } from "../lib/reservation";
const initial: ReservationValues = { date: "", time: "", guests: "2", requests: "" };
export default function Reservation() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [minDate, setMinDate] = useState("");
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); setMinDate(localDate(tomorrow));
    return () => clearTimeout(timer.current);
  }, []);
  function update(key: keyof ReservationValues, value: string) {
    setValues(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
    setState("idle");
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const found = validateReservation(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.current?.querySelector<HTMLElement>("[name='" + first + "']")?.focus();
      return;
    }
    busy.current = true; setState("loading");
    // Intentional local simulation. No fetch, storage, analytics or booking API.
    timer.current = setTimeout(() => { setState("success"); setValues(initial); busy.current = false; }, 500);
  }
  const fieldProps = (key: keyof ReservationValues) => ({ name: key, id: key, "aria-invalid": Boolean(errors[key]), "aria-describedby": errors[key] ? key + "-error" : undefined });
  const error = (key: keyof ReservationValues) => errors[key] ? <span className="field-error" id={key + "-error"}>{errors[key]}</span> : null;
  return <section id="reservations" tabIndex={-1} className="section reservation-section" aria-labelledby="reservation-heading"><div className="container reservation-grid">
    <div className="reservation-copy"><p className="eyebrow">04 / Your seat at the table</p><h2 id="reservation-heading">Make time<br />for <em>the table.</em></h2><p className="lead">An occasion, a catch-up, or just because.</p><p>Explore how a reservation could feel. Choose a date, a time and your party size to try the experience.</p><div className="demo-explainer" id="reservation-notice"><span className="outlined-label">Interactive demo</span><p>This does not book a table. Times are examples and do not represent availability. Nothing is sent or saved. Please use example requests only; no personal details are needed.</p></div></div>
    <form ref={form} onSubmit={submit} noValidate aria-describedby="reservation-notice" className="reservation-form" aria-busy={state === "loading"}>
      <div className="form-heading"><h3>Plan a visit</h3><span className="demo-tag">Demo only</span></div>
      <p className="fine-print">Required fields are marked *. No account or contact details required.</p>
      <fieldset disabled={state === "loading"}><legend className="sr-only">Example reservation details</legend>
        <div className="form-grid"><div className="field"><label htmlFor="date">Date *</label><input {...fieldProps("date")} type="date" required min={minDate || undefined} value={values.date} onChange={event => update("date", event.target.value)} />{error("date")}</div>
        <div className="field"><label htmlFor="time">Time *</label><select {...fieldProps("time")} required value={values.time} onChange={event => update("time", event.target.value)}><option value="">Select a time</option>{demoTimes.map(time => <option key={time} value={time}>{time}</option>)}</select>{error("time")}</div></div>
        <div className="field"><label htmlFor="guests">Number of guests *</label><select {...fieldProps("guests")} required value={values.guests} onChange={event => update("guests", event.target.value)}>{Array.from({ length: 8 }, (_, index) => <option key={index} value={index + 1}>{index + 1} {index === 0 ? "guest" : "guests"}</option>)}</select>{error("guests")}</div>
        <div className="field"><label htmlFor="requests">Example special requests <span>(optional)</span></label><textarea {...fieldProps("requests")} rows={3} maxLength={300} placeholder="For example: a quiet table" value={values.requests} onChange={event => update("requests", event.target.value)} />{error("requests")}</div>
        <button className="button button-dark submit-button" type="submit">{state === "loading" ? "Previewing…" : "Preview reservation"}<span aria-hidden="true">↗</span></button>
      </fieldset>
      <div aria-live="polite" aria-atomic="true" className="form-status">{Object.values(errors).filter(Boolean).length > 0 && <p>Please check the highlighted fields.</p>}{state === "loading" && <p>Preparing your local demo preview…</p>}{state === "success" && <p className="success-message"><strong>Demo complete. No table has been booked.</strong> Your example was processed only in this page. No information was sent or saved.</p>}</div>
    </form>
  </div></section>;
}
