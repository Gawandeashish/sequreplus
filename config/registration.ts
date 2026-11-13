/** Public registration routes. Email credentials are server-only environment variables. */
export const registrationConfig = {
  route: "/register",
  installationGuideRoute: "/installation-guide",
  termsRoute: "/terms",
} as const;
