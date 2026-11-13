"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { registrationConfig } from "@/src/config/registration";

type Field = "firstName" | "lastName" | "address" | "phone" | "email" | "consent";
type Values = Record<Field, string | boolean>;
const initialValues: Values = { firstName: "", lastName: "", address: "", phone: "", email: "", consent: false };

export default function RegistrationForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [message, setMessage] = useState("");
  const [messageKind, setMessageKind] = useState<"error" | "success">("error");
  const [submitting, setSubmitting] = useState(false);
  const requestInFlight = useRef(false);

  const change = (field: Field, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
    setMessageKind("error");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || requestInFlight.current) return;
    const nextErrors: Partial<Record<Field, string>> = {};
    if (!String(values.firstName).trim()) nextErrors.firstName = "Enter your first name.";
    if (!String(values.lastName).trim()) nextErrors.lastName = "Enter your last name.";
    if (!String(values.address).trim()) nextErrors.address = "Enter your complete address.";
    const normalizedPhone = String(values.phone).trim().replace(/[\s().-]/g, "");
    if (!/^(?:\+91|91|0)?[6-9]\d{9}$/.test(normalizedPhone)) nextErrors.phone = "Enter a valid 10-digit Indian mobile number starting with 6-9. You may include +91 or a leading 0.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email).trim())) nextErrors.email = "Enter a valid email address.";
    if (!values.consent) nextErrors.consent = "Please confirm the information and review both documents before continuing.";
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      setMessage("Please review the highlighted fields.");
      return;
    }

    if (!registrationConfig.emailJsPublicKey) {
      setMessageKind("error");
      setMessage("Email service is not configured. Please contact SequrePlus directly.");
      return;
    }

    requestInFlight.current = true;
    setSubmitting(true);
    setMessage("");
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const dateStamp = `${year}${month}${day}`;
      const registrationId = `SP-${dateStamp}-${Array.from(crypto.getRandomValues(new Uint8Array(4)), (value) => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[value % 36]).join("")}`;
      const registrationDate = `${year}-${month}-${day} ${now.toLocaleTimeString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`;
      const templateParams = {
        registration_id: registrationId,
        registration_date: registrationDate,
        first_name: String(values.firstName).trim(),
        last_name: String(values.lastName).trim(),
        address: String(values.address).trim(),
        phone: String(values.phone).trim(),
        customer_email: String(values.email).trim(),
        consent_status: `Confirmed - ${registrationDate}`,
      };
      const response = await emailjs.send(
        registrationConfig.emailJsServiceId,
        registrationConfig.emailJsTemplateId,
        templateParams,
        { publicKey: registrationConfig.emailJsPublicKey },
      );
      if (response.status !== 200) throw new Error("EmailJS did not confirm the send.");
      setErrors({});
      setValues(initialValues);
      setMessageKind("success");
      setMessage(`Your registration has been emailed successfully. Reference: ${registrationId}`);
    } catch {
      setMessageKind("error");
      setMessage("We could not send your registration. Please check your connection and try again.");
    } finally {
      requestInFlight.current = false;
      setSubmitting(false);
    }
  };

  const fieldError = (field: Field) => errors[field] ? <span className="registration-error" id={`${field}-error`}>{errors[field]}</span> : null;
  const describedBy = (field: Field) => errors[field] ? `${field}-error` : undefined;

  return <form className="registration-form" onSubmit={handleSubmit} noValidate>
    <div className="registration-fields">
      <div className="registration-field"><label htmlFor="firstName">First Name <span aria-hidden="true">*</span></label><input id="firstName" name="firstName" autoComplete="given-name" value={values.firstName as string} onChange={(event) => change("firstName", event.target.value)} aria-invalid={Boolean(errors.firstName)} aria-describedby={describedBy("firstName")} required />{fieldError("firstName")}</div>
      <div className="registration-field"><label htmlFor="lastName">Last Name <span aria-hidden="true">*</span></label><input id="lastName" name="lastName" autoComplete="family-name" value={values.lastName as string} onChange={(event) => change("lastName", event.target.value)} aria-invalid={Boolean(errors.lastName)} aria-describedby={describedBy("lastName")} required />{fieldError("lastName")}</div>
      <div className="registration-field registration-field-wide"><label htmlFor="address">Complete Address <span aria-hidden="true">*</span></label><textarea id="address" name="address" autoComplete="street-address" rows={4} value={values.address as string} onChange={(event) => change("address", event.target.value)} aria-invalid={Boolean(errors.address)} aria-describedby={describedBy("address")} required />{fieldError("address")}</div>
      <div className="registration-field"><label htmlFor="phone">Phone Number <span aria-hidden="true">*</span></label><input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" value={values.phone as string} onChange={(event) => change("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={["phone-hint", describedBy("phone")].filter(Boolean).join(" ")} required /><span className="registration-hint" id="phone-hint">Enter a 10-digit Indian mobile number; +91 or a leading 0 is optional.</span>{fieldError("phone")}</div>
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

    <p className="registration-privacy">Your details will be sent to the configured SequrePlus business email for registration and follow-up. The application does not save registration details to a database.</p>
    {message && <p className={`registration-status${messageKind === "success" ? " is-success" : " is-error"}`} role={messageKind === "success" ? "status" : "alert"} aria-live={messageKind === "success" ? "polite" : "assertive"}>{message}</p>}
    <button className="button button-teal registration-submit" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Register Myself"}</button>
  </form>;
}
