import SiteNavigation from "./site-navigation";
import { BRAND_NAME } from "@/config/brand";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
const whatsappLink = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${BRAND_NAME}, I'd like to explore a security solution for my property.`)}`
  : "/contact";

const pageContent = {
  howItWorks: {
    eyebrow: "A clear, connected response",
    title: "How It Works",
    description: `Compatible sensors monitor configured areas and communicate with ${BRAND_NAME} Ace. When a configured event is detected, the system can sound its siren and call up to five registered contacts.`,
    points: ["Sensors detect configured events.", `${BRAND_NAME} Ace coordinates the system response.`, "The configured siren and contact alerts help you respond quickly."],
  },
  products: {
    eyebrow: "Security solutions",
    title: "Products for the spaces you protect",
    description: `Explore ${BRAND_NAME} security options for homes, shops, bungalows and warehouses, with compatible connectivity and sensor configurations to suit your property.`,
    points: ["Home and entry-point security", "Shop and business security", "Wired, wireless and hybrid sensor options"],
  },
  installation: {
    eyebrow: "Plan your setup",
    title: "Installation Guide",
    description: `Choose protected areas and compatible sensors, then plan how they connect to ${BRAND_NAME} Ace. Installation options depend on your property's layout and selected system.`,
    points: ["Identify doors, windows and other areas to monitor.", "Choose compatible wired, wireless or hybrid sensors.", "Configure the controller and contact numbers for your setup."],
  },
  contact: {
    eyebrow: "Your next step",
    title: "Talk with SequrePlus",
    description: "Tell us what you want to protect and we’ll help you explore the right security solution for your property.",
    points: ["Discuss your property and priorities.", "Explore compatible system options.", "Plan a setup that fits your needs."],
  },
} as const;

export default function ContentPage({ page }: { page: keyof typeof pageContent }) {
  const content = pageContent[page];

  return (
    <main>
      <SiteNavigation />
      <section className="content-page section-pad" aria-labelledby="content-page-title">
        <div className="page-width">
          <div className="eyebrow"><span className="eyebrow-line" />{content.eyebrow}</div>
          <h1 id="content-page-title">{content.title}</h1>
          <p className="content-page-description">{content.description}</p>
          <ul>{content.points.map((point) => <li key={point}>{point}</li>)}</ul>
          <a className="button button-teal" href={whatsappLink} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined}>
            {whatsappNumber ? "Chat with us on WhatsApp" : "Contact us"}<span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
