import { NextResponse } from "next/server";
import { registrationEmailConfig } from "@/config/registration-email";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const indianMobilePattern = /^(?:\+91|91|0)?[6-9]\d{9}$/;
const consentText = "I confirm that the information provided above is accurate. I have read and understood the Terms & Conditions and Installation Guide. I acknowledge that the SequrePlus team may contact me to explain the installation and usage instructions.";

type RegistrationPayload = {
  firstName?: unknown;
  lastName?: unknown;
  address?: unknown;
  phone?: unknown;
  email?: unknown;
  consent?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let payload: RegistrationPayload;
  try {
    payload = await request.json() as RegistrationPayload;
  } catch {
    return NextResponse.json({ error: "The registration details could not be read. Please try again." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "The registration details could not be read. Please try again." }, { status: 400 });
  }

  const firstName = clean(payload.firstName, 100);
  const lastName = clean(payload.lastName, 100);
  const address = clean(payload.address, 2000);
  const phoneInput = clean(payload.phone, 30);
  const phone = phoneInput.replace(/[\s().-]/g, "");
  const email = clean(payload.email, 254).toLowerCase();

  if (!firstName || !lastName || !address || !phone || !email || payload.consent !== true) {
    return NextResponse.json({ error: "Please complete all required fields and confirm consent." }, { status: 400 });
  }
  if (!emailPattern.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!indianMobilePattern.test(phone)) return NextResponse.json({ error: "Enter a valid Indian mobile number, optionally with +91." }, { status: 400 });

  const { apiKey, from, to } = registrationEmailConfig;
  if (!apiKey || !from || !to) {
    return NextResponse.json({ error: "Email delivery is not configured yet. Your details were not sent." }, { status: 503 });
  }

  const submittedAt = new Date();
  const timestamp = submittedAt.toISOString();
  const registrationId = `SP-${crypto.randomUUID()}`;
  const fullName = `${firstName} ${lastName}`;
  const subjectName = fullName.replace(/[\r\n\u0000-\u001f]/g, " ").slice(0, 180);
  const emailText = [
    "New SequrePlus customer registration",
    "",
    `Registration ID: ${registrationId}`,
    `Submitted at (UTC): ${timestamp}`,
    `First name: ${firstName}`,
    `Last name: ${lastName}`,
    `Complete address: ${address}`,
    `Mobile number: ${phoneInput}`,
    `Email address: ${email}`,
    "Consent status: Confirmed",
    `Consent timestamp (UTC): ${timestamp}`,
    `Consent wording: ${consentText}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Customer registration: ${subjectName}`, text: emailText }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      return NextResponse.json({ error: "We could not send your registration email. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, registrationId, submittedAt: timestamp });
  } catch {
    return NextResponse.json({ error: "Email delivery could not be confirmed. Please try again later." }, { status: 502 });
  }
}
