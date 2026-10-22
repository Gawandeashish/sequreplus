import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SequrePlus | Smart Security Solutions",
  description:
    "Smart security assistance for your home, shop, bungalow or warehouse. Protect what matters with SequrePlus.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
