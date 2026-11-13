import "server-only";

/** Resend email settings. These values are read only from the server runtime. */
export const registrationEmailConfig = {
  apiKey: process.env.RESEND_API_KEY,
  from: process.env.REGISTRATION_FROM_EMAIL,
  to: process.env.REGISTRATION_TO_EMAIL,
};
