/** Public registration routes. Email credentials are server-only environment variables. */
export const registrationConfig = {
  route: "/register",
  installationGuideRoute: "/installation-guide",
  termsRoute: "/terms",
  emailJsServiceId: "service_hzweyhv",
  emailJsTemplateId: "template_zes3f4k",
  emailJsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
} as const;
