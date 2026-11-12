"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { registrationConfig } from "@/config/registration";

type Field = "firstName" | "lastName" | "address" | "phone" | "email" | "consent";
type Values = Record<Field, string | boolean>;
const initialValues: Values = { firstName: "", lastName: "", address: "", phone: "", email: "", consent: false };

export default function RegistrationForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const change = (field: Field, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const nextErrors: Partial<Record<Field, string>> = {};
    if (!String(values.firstName).trim()) nextErrors.firstName = "Enter your first name.";
    if (!String(values.lastName).trim()) nextErrors.lastName = "Enter your last name.";
    if (!String(values.address).trim()) nextErrors.address = "Enter your complete address.";
    if (!/^\+?[0-9\s().-]{7,20}$/.test(String(values.phone).trim())) nextErrors.phone = "Enter a valid phone number, including country code if applicable.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email).trim())) nextErrors.email = "Enter a valid email address.";
    if (!values.consent) nextErrors.consent = "Please confirm the information and review both documents before continuing.";
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      setMessage("Please review the highlighted fields.");
      return;
    }

    // No registration service is configured. Do not retain or claim to submit personal data.
    setSubmitting(true);
    setMessage("Registration is not available yet because secure registration service is still being configured. Your information has not been sent or saved.");
    setSubmitting(false);
  };

  const fieldError = (field: Field) => errors[field] ? <span className="registration-error" id={`${field}-error`}>{errors[field]}</span> : null;
  const describedBy = (field: Field) => errors[field] ? `${field}-error` : undefined;

  return <form className="registration-form" onSubmit={handleSubmit} noValidate>
    <div className="registration-fields">
      <div className="registration-field"><label htmlFor="firstName">First Name <span aria-hidden="true">*</span></label><input id="firstName" name="firstName" autoComplete="given-name" value={values.firstName as string} onChange={(event) => change("firstName", event.target.value)} aria-invalid={Boolean(errors.firstName)} aria-describedby={describedBy("firstName")} required />{fieldError("firstName")}</div>
      <div className="registration-field"><label htmlFor="lastName">Last Name <span aria-hidden="true">*</span></label><input id="lastName" name="lastName" autoComplete="family-name" value={values.lastName as string} onChange={(event) => change("lastName", event.target.value)} aria-invalid={Boolean(errors.lastName)} aria-describedby={describedBy("lastName")} required />{fieldError("lastName")}</div>
      <div className="registration-field registration-field-wide"><label htmlFor="address">Complete Address <span aria-hidden="true">*</span></label><textarea id="address" name="address" autoComplete="street-address" rows={4} value={values.address as string} onChange={(event) => change("address", event.target.value)} aria-invalid={Boolean(errors.address)} aria-describedby={describedBy("address")} required />{fieldError("address")}</div>
      <div className="registration-field"><label htmlFor="phone">Phone Number <span aria-hidden="true">*</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" value={values.phone as string} onChange={(event) => change("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} required />{fieldError("phone")}</div>
      <div className="registration-field"><label htmlFor="email">Email Address <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={values.email as string} onChange={(event) => change("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} required />{fieldError("email")}</div>
    </div>

    <div className="registration-resources" aria-label="Registration documents">
      <Link href={registrationConfig.installationGuideRoute} target="_blank" rel="noreferrer">View Installation Guide <span aria-hidden="true">↗</span></Link>
      <Link href={registrationConfig.termsRoute} target="_blank" rel="noreferrer">Read Terms &amp; Conditions <span aria-hidden="true">↗</span></Link>
    </div>

    <div className="registration-consent-wrap">
      <div className="registration-consent">
        <input id="consent" name="consent" type="checkbox" checked={values.consent as boolean} onChange={(event) => change("consent", event.target.checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={describedBy("consent")} required />
        <label htmlFor="consent">I confirm that the information provided above is accurate. I have read and understood the <Link href={registrationConfig.termsRoute} target="_blank" rel="noreferrer">Terms &amp; Conditions</Link> and <Link href={registrationConfig.installationGuideRoute} target="_blank" rel="noreferrer">Installation Guide</Link>. I acknowledge that the SequrePlus team may contact me to explain the installation and usage instructions.</label>
      </div>
      {fieldError("consent")}
    </div>

    <p className="registration-privacy">Your details are requested for customer registration and follow-up about installation and usage. This form is not connected to a registration service yet, so information entered here is not transmitted or stored.</p>
    {message && <p className={`registration-status${errors[Object.keys(errors)[0] as Field] ? " is-error" : ""}`} role="status" aria-live="polite">{message}</p>}
    <button className="button button-teal registration-submit" type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Register Myself"}</button>
  </form>;
}
