import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/config/brand";
import { socialLinks } from "@/config/social";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${BRAND_NAME}, I'd like to explore a security solution for my property.`)}`
  : "/contact";

const profiles = [
  { name: "Facebook", href: socialLinks.facebook, icon: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" /> },
  { name: "Instagram", href: socialLinks.instagram, icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r=".8" fill="currentColor" stroke="none" /></> },
  { name: "LinkedIn", href: socialLinks.linkedin, icon: <><path d="M5 9v10M5 5v.01M9 19v-6a4 4 0 0 1 8 0v6M9 13v6m8-6v6" /><rect x="3" y="3" width="18" height="18" rx="2" /></> },
];

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="page-width">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand brand-light" href="/" aria-label={`${BRAND_NAME} home`}><Image className="brand-logo" src="/sequreplus-logo-dark.png" alt="SequrePlus" width={2048} height={505} /></Link>
          <p>Protect What Matters.<br />Stay Alert, Even When You’re Away.</p>
          <nav className="footer-socials" aria-label="Social media">
            {profiles.filter((profile): profile is typeof profile & { href: string } => Boolean(profile.href)).map((profile) => <a key={profile.name} href={profile.href} target="_blank" rel="noreferrer" aria-label={`SequrePlus on ${profile.name}`}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{profile.icon}</svg></a>)}
          </nav>
        </div>
        <nav className="footer-column" aria-label="Explore">
          <span className="footer-label">EXPLORE</span>
          <Link href="/">Home</Link><Link href="/#solutions">Security solutions</Link><Link href="/how-it-works">How it works</Link><Link href="/#remote-control">Remote control</Link>
        </nav>
        <div className="footer-column">
          <span className="footer-label">GET IN TOUCH</span>
          <a href={whatsappHref} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined}>WhatsApp: {whatsappNumber ? `+${whatsappNumber}` : "Number to be added"}</a>
          <Link href="/contact">Contact: details to be added</Link>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</span><span>Thoughtful security for the spaces that matter.</span></div>
    </div>
  </footer>;
}
