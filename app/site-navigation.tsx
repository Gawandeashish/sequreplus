"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME } from "@/config/brand";

const links = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
const protectedHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${BRAND_NAME}, I'd like to explore a security solution for my property.`)}`
  : "/contact";

export default function SiteNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header" id="home">
      <div className="nav-wrap">
        <Link className="brand" href="/" aria-label={`${BRAND_NAME} home`} onClick={closeMenu}>
          <Image className="brand-logo" src="/sequreplus-logo.png" alt="SequrePlus" width={1024} height={224} priority />
        </Link>
        <nav className={`main-nav${open ? " is-open" : ""}`} id="primary-navigation" aria-label="Main navigation">
          <Link className="home-link" href="/" aria-label="Home" onClick={closeMenu}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></svg>
            <span className="home-link-label">Home</span>
          </Link>
          {links.map((link) => <a href={link.href} key={link.label} onClick={closeMenu}>{link.label}</a>)}
          <a className="button button-small button-dark nav-cta" href={protectedHref} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined} onClick={closeMenu}>Get Protected <span className="arrow" aria-hidden="true">↗</span></a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
