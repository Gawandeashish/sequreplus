import type { Metadata } from "next";
import { BRAND_NAME } from "@/config/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Smart Security Solutions`,
  description:
    `Smart security assistance for your home, shop, bungalow or warehouse. Protect what matters with ${BRAND_NAME}.`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
