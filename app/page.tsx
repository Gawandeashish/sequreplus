import { BRAND_NAME } from "@/config/brand";
import SolutionSelector from "./solution-selector";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
const whatsappLink = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${BRAND_NAME}, I'd like to explore a security solution for my property.`)}`
  : "#contact";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand${light ? " brand-light" : ""}`} href="#home" aria-label={`${BRAND_NAME} home`}>
      <span className="brand-mark" aria-hidden="true"><span /></span>
      <span className="brand-word">{BRAND_NAME.split(/(?=[A-Z])/).map((part, index) => index === 0 ? part : <span key={`${part}-${index}`}>{part}</span>)}</span>
    </a>
  );
}

function Icon({ kind }: { kind: "home" | "shop" | "warehouse" }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /><path d="M8 10h.01M16 10h.01" /></>,
    shop: <><path d="M3 10v10h18V10M2 10l2-7h16l2 7a3 3 0 0 1-5 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-5-2Z" /><path d="M9 20v-5h6v5" /></>,
    warehouse: <><path d="m3 9 9-6 9 6v11H3z" /><path d="M7 20v-7h10v7M7 9h.01M12 9h.01M17 9h.01" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg>;
}

type WorkflowIconName = "door" | "window" | "motion" | "vibration" | "hub" | "siren" | "phone" | "app" | "remote" | "cellular" | "wifi" | "dual" | "wired" | "wireless" | "hybrid";

function WorkflowIcon({ kind }: { kind: WorkflowIconName }) {
  const paths: Record<WorkflowIconName, React.ReactNode> = {
    door: <><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 21V7h10M15.5 14h.01" /></>,
    window: <><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M12 4v16M3 12h18" /></>,
    motion: <><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12" /><circle cx="12" cy="12" r="4" /></>,
    vibration: <><path d="M4 8v8m4-11v14m4-16v18m4-15v12m4-9v6" /></>,
    hub: <><rect x="5" y="5" width="14" height="14" rx="3" /><path d="M9 9h6v6H9zM12 2v3m0 14v3M2 12h3m14 0h3" /></>,
    siren: <><path d="M6 17h12l-1-8a5 5 0 0 0-10 0l-1 8Zm-2 3h16M12 2V1M4 5 2 3m18 2 2-2M2 11H1m22 0h-1" /></>,
    phone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M10 5h4m-3 14h2" /></>,
    app: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 5h4m-5 5h2m4 0h.01m-6 3h2m4 0h.01m-6 3h2m4 0h.01" /></>,
    remote: <><rect x="6" y="2" width="12" height="20" rx="5" /><circle cx="12" cy="7" r="1.4" /><path d="M9.5 12h5m-5 4h5" /></>,
    cellular: <><path d="M5 20V5m0 0L2.5 8M5 5l2.5 3M12 20V9m0 0L9.5 12M12 9l2.5 3M19 20v-6m0 0-2.5 3m2.5-3 2.5 3" /></>,
    wifi: <><path d="M2 8.5a15.5 15.5 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-10.5 3.5a5.5 5.5 0 0 1 7 0" /><circle cx="12" cy="19" r="1" /></>,
    dual: <><rect x="3" y="3" width="10" height="18" rx="2" /><path d="M6 6h4m-3 12h2m7-10a7 7 0 0 1 6 0m-5 3a3.5 3.5 0 0 1 4 0m-2 3h.01" /></>,
    wired: <><rect x="8" y="8" width="8" height="8" rx="1" /><path d="M12 8V3M12 16v5M8 12H3m13 0h5" /><circle cx="12" cy="3" r="1" /><circle cx="12" cy="21" r="1" /><circle cx="3" cy="12" r="1" /><circle cx="21" cy="12" r="1" /></>,
    wireless: <><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M6.2 6.2a8.2 8.2 0 0 0 0 11.6m11.6 0a8.2 8.2 0 0 0 0-11.6M3.4 3.4a12.2 12.2 0 0 0 0 17.2m17.2 0a12.2 12.2 0 0 0 0-17.2" /></>,
    hybrid: <><rect x="8" y="8" width="8" height="8" rx="1" /><path d="M12 8V3M8 12H3m13 0h5m-9 4v5" /><circle cx="12" cy="3" r="1" /><circle cx="3" cy="12" r="1" /><circle cx="21" cy="12" r="1" /><path d="M18.5 4.5a5 5 0 0 1 2 2" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg>;
}

const solutions = [
  { number: "01", kind: "home" as const, title: "Home security", description: "Help protect selected doors and entry points while you’re home or away.", cta: "Explore home security" },
  { number: "02", kind: "shop" as const, title: "Shop security", description: "Stay informed about configured security events at your business premises.", cta: "Explore shop security" },
  { number: "03", kind: "warehouse" as const, title: "Bungalows & warehouses", description: "Explore practical security options for larger properties and storage spaces.", cta: "Discuss your property" },
];

const workflowSensors: { kind: WorkflowIconName; title: string; description: string }[] = [
  { kind: "door", title: "Door sensors", description: "Protected doors" },
  { kind: "window", title: "Window sensors", description: "Protected windows" },
  { kind: "motion", title: "Motion sensors", description: "Configured indoor or outdoor areas" },
  { kind: "vibration", title: "Vibration sensors", description: "Compatible protected surfaces" },
];

const systemOptionGroups = [
  {
    id: "connectivity-options",
    number: "01",
    title: "Connectivity",
    description: "How supported communication and connected features work.",
    options: [
      { kind: "cellular" as const, title: "GSM-Based System", description: "Uses cellular connectivity for supported communication and alert features." },
      { kind: "wifi" as const, title: "Wi-Fi-Based System", description: "Uses a Wi-Fi connection for supported connected features." },
      { kind: "dual" as const, title: "GSM + Wi-Fi System", description: "Combines cellular and Wi-Fi connectivity where supported, offering more connectivity options." },
    ],
  },
  {
    id: "sensor-options",
    number: "02",
    title: "Sensor connection",
    description: "How compatible sensors connect to the controller.",
    options: [
      { kind: "wired" as const, title: "Wired Sensor System", description: "Connects compatible sensors to the controller using physical wiring. Suitable where a wired installation is preferred." },
      { kind: "wireless" as const, title: "Wireless Sensor System", description: "Uses compatible wireless sensors, reducing the need to run sensor cables." },
      { kind: "hybrid" as const, title: "Hybrid Sensor System", description: "Supports compatible wired and wireless sensors in one system, offering greater installation flexibility." },
    ],
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header" id="home">
        <div className="nav-wrap">
          <Brand />
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#home">Home</a><a href="#solutions">Security solutions</a><a href="#how-it-works">How it works</a><a href="#remote-control">Remote control</a><a href="#contact">Contact</a>
          </nav>
          <a className="button button-small button-dark nav-cta" href="#contact">Protect my property <Arrow diagonal /></a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner page-width">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> Smart security for your property</div>
            <h1 id="hero-title">One Alert.<br /><span>A Chance to<br />Prevent Theft.</span></h1>
            <p className="hero-tagline"><span>Detect Early. Respond in Time. Protect What Matters.</span></p>
            <p className="hero-description">Add an active layer of security to your home or shop. {BRAND_NAME} Ace detects configured events, sounds a loud siren, and calls up to 5 registered contact numbers to help you respond quickly.</p>
            <div className="hero-actions">
              <a className="button button-teal" href="#contact">Protect My Property <Arrow diagonal /></a>
              <a className="text-link" href="#how-it-works">How It Works <Arrow /></a>
            </div>
            <div className="hero-footnote"><span className="status-dot" /> A more informed way to protect your space</div>
          </div>
          <div className="hero-visual" role="img" aria-label={`Illustration of the ${BRAND_NAME} security device protecting a property entry`}>
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="visual-glow" />
            <div className="visual-card">
              <div className="visual-card-top"><span>{BRAND_NAME.toUpperCase()}</span><span className="live-pill"><i /> SYSTEM READY</span></div>
              <div className="device-stage">
                <div className="device-shadow" />
                <div className="device"><div className="device-top" /><div className="device-face"><div className="device-lens"><i /></div><div className="device-indicator" /></div><div className="device-base" /></div>
                <div className="device-caption"><span className="caption-icon">⌂</span><span><b>Protected entry</b><small>Connected entry-point sensor</small></span><span className="caption-check">✓</span></div>
              </div>
              <div className="visual-card-bottom"><span>SMART SECURITY</span><span>01 / 03</span></div>
            </div>
            <div className="visual-label label-top"><span className="label-dot" />Thoughtful protection</div>
            <div className="visual-label label-bottom">Designed around your property <span>↗</span></div>
          </div>
        </div>
        <div className="hero-bottom page-width"><span>SECURITY THAT FITS REAL LIFE</span><span className="scroll-cue"><i /> Scroll to explore</span><span>01 — 04</span></div>
      </section>

      <section className="process-section section-pad" id="how-it-works" aria-labelledby="process-title">
        <div className="page-width">
          <div className="workflow-heading">
            <div className="eyebrow"><span className="eyebrow-line" /> How it works</div>
            <h2 id="process-title">What Happens When Someone Tries to Enter?</h2>
            <p>Discover how connected sensors, {BRAND_NAME} Ace and configured alerts work together to help protect your premises.</p>
          </div>

          <div className="workflow-diagram" role="group" aria-label={`Compatible configured sensors monitor a property, communicate with ${BRAND_NAME} Ace and can trigger a loud siren and calls to up to five registered contact numbers.`}>
            <div className="workflow-stage sensor-stage">
              <div className="stage-heading"><span>STAGE A</span><h3>Sensors Around the Property</h3></div>
              <div className="property-scene" role="img" aria-label="House illustration with door, window, motion and vibration sensor markers">
                <svg className="property-building" aria-hidden="true" viewBox="0 0 360 210" fill="none">
                  <path d="M28 185h304" stroke="#b8c8d1" strokeWidth="2" strokeLinecap="round" />
                  <path d="m72 91 108-65 108 65v94H72V91Z" fill="#f3f8f9" stroke="#8aa0ad" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M58 93 180 18l122 75" stroke="#10233f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M111 109h42v37h-42zM207 109h42v37h-42z" fill="#e5f4f1" stroke="#0f9d8a" strokeWidth="2" />
                  <path d="M171 128h23v57h-23z" fill="#fff" stroke="#8aa0ad" strokeWidth="2" />
                  <path d="M182 155h.01" stroke="#0f9d8a" strokeWidth="4" strokeLinecap="round" />
                  <path d="M91 177v-15m178 15v-15" stroke="#c2d5d4" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span className="property-marker marker-window" aria-hidden="true"><WorkflowIcon kind="window" /></span>
                <span className="property-marker marker-door" aria-hidden="true"><WorkflowIcon kind="door" /></span>
                <span className="property-marker marker-motion" aria-hidden="true"><WorkflowIcon kind="motion" /></span>
                <span className="property-marker marker-vibration" aria-hidden="true"><WorkflowIcon kind="vibration" /></span>
              </div>
              <div className="sensor-key">{workflowSensors.map((sensor) => <div className="sensor-key-item" key={sensor.kind}>
                <span className="sensor-icon"><WorkflowIcon kind={sensor.kind} /></span><span><b>{sensor.title}</b><small>{sensor.description}</small></span>
              </div>)}</div>
              <p className="stage-footnote">Compatible sensors must be configured for their selected areas. Sensor options may vary by package.</p>
            </div>

            <div className="flow-arrow" aria-label="Sensors connect to the controller"><span>→</span></div>

            <div className="workflow-stage controller-stage">
              <div className="stage-heading"><span>STAGE B</span><h3>Central Controller</h3></div>
              <div className="controller-illustration"><div className="controller-icon"><WorkflowIcon kind="hub" /></div><span className="controller-brand">{BRAND_NAME.toUpperCase()}</span><h4>{BRAND_NAME} Ace</h4><p>Connects compatible sensors and coordinates the configured security response.</p></div>
            </div>

            <div className="flow-arrow controller-arrow" aria-label="The controller triggers configured alerts"><span>→</span></div>

            <div className="workflow-stage response-stage">
              <div className="stage-heading"><span>STAGE C</span><h3>Immediate Alert Response</h3></div>
              <div className="loud-siren"><WorkflowIcon kind="siren" /><span><b>LOUD SIREN</b><small>Alarm response</small></span></div>
              <div className="response-count"><WorkflowIcon kind="phone" /><span><b>Calls to up to 5 contacts</b><small>Registered contact numbers, maximum five total</small></span></div>
              <div className="response-contact-preview" aria-hidden="true"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
            </div>
          </div>

          <div className="workflow-explain" aria-label="How the system works">
            <article><span>01</span><div><h4>Detect</h4><p>Compatible sensors monitor their configured areas.</p></div></article>
            <article><span>02</span><div><h4>Coordinate</h4><p>{BRAND_NAME} Ace processes detected events according to its configuration.</p></div></article>
            <article><span>03</span><div><h4>Alert</h4><p>The configured response activates the siren and initiates calls to up to five registered contact numbers.</p></div></article>
          </div>

        </div>
      </section>

      <section className="cctv-comparison section-pad" aria-labelledby="cctv-comparison-title">
        <div className="page-width">
          <div className="comparison-heading">
            <div className="eyebrow">SMART SECURITY. PROACTIVE PROTECTION.</div>
            <h2 id="cctv-comparison-title">CCTV Records. {BRAND_NAME} Alerts.</h2>
            <p>CCTV can help you see what happened after an incident. {BRAND_NAME} Ace adds an active layer of security by detecting configured events, sounding a loud siren, and calling up to 5 registered contact numbers to help you respond quickly.</p>
          </div>
          <div className="comparison-cards">
            <article className="comparison-card cctv-card">
              <div className="comparison-card-content">
                <span className="comparison-icon cctv-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17h22a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5H7z"/><path d="m34 21 8-5v17l-8-5M15 32v8m-5 0h15"/><circle cx="14" cy="24" r="3"/></svg></span>
                <h3>CCTV</h3><p>Monitor and review recorded activity.</p>
              </div>
            </article>
            <article className="comparison-card ace-card">
              <div className="comparison-card-content">
                <span className="comparison-icon ace-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M24 5 39 11v11c0 10-6.4 16.8-15 21-8.6-4.2-15-11-15-21V11z"/><path d="m16.5 24 5 5 10-11"/></svg></span>
                <h3>{BRAND_NAME} Ace</h3><p>Detect, alert, and help deter unauthorized entry.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="solutions-section section-pad" id="solutions" aria-labelledby="solutions-title">
        <div className="page-width">
          <div className="section-heading heading-row"><div><div className="eyebrow"><span className="eyebrow-line" /> Security solutions</div><h2 id="solutions-title">What Would You Like to Protect?</h2></div><p>From your front door to vulnerable windows and open spaces, explore security options for your property.</p></div>
          <SolutionSelector whatsappLink={whatsappLink} hasWhatsapp={Boolean(whatsappNumber)} />
          <div className="section-footnote"><span className="footnote-mark">+</span> Not sure what you need? We’ll help you figure it out.</div>
        </div>
      </section>

      <section className="system-options-section section-pad" id="system-options" aria-labelledby="system-options-title">
        <div className="page-width">
          <header className="system-options-heading">
            <div className="eyebrow"><span className="eyebrow-line" /> Understand your options</div>
            <h2 id="system-options-title">Not All Security Systems Work the Same Way.</h2>
            <p>From connectivity to sensor installation, the right security setup depends on your property and needs. Understand the options before choosing your system.</p>
          </header>

          <div className="system-options-groups">
            {systemOptionGroups.map((group) => (
              <section className="system-options-group" key={group.id} aria-labelledby={`${group.id}-title`}>
                <div className="system-options-group-heading">
                  <span>{group.number}</span>
                  <div><h3 id={`${group.id}-title`}>{group.title}</h3><p>{group.description}</p></div>
                </div>
                <div className="system-options-cards">
                  {group.options.map((option) => (
                    <article className="system-option-card" key={option.title}>
                      <span className="system-option-icon" aria-hidden="true"><WorkflowIcon kind={option.kind} /></span>
                      <h4>{option.title}</h4>
                      <p>{option.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="system-options-note"><span className="system-options-note-icon" aria-hidden="true"><WorkflowIcon kind="hub" /></span><span><strong>Two different choices.</strong> Connectivity and sensor connection are separate. For example, GSM + Wi-Fi connectivity can be paired with wired and wireless sensors where the system supports that combination.</span></p>

          <aside className="hybrid-recommendation" aria-labelledby="hybrid-recommendation-title">
            <div className="hybrid-recommendation-copy">
              <div className="hybrid-recommendation-label"><span className="eyebrow-line" /> Our recommendation</div>
              <span className="hybrid-verification-status">Proposed setup · model specifications to confirm</span>
              <h3 id="hybrid-recommendation-title">{BRAND_NAME} Hybrid</h3>
              <p className="hybrid-tagline">Dual Connectivity. Flexible Sensor Setup.</p>
              <p className="hybrid-description">A proposed configuration pairing GSM + Wi-Fi with compatible wired and wireless sensors may offer more installation flexibility. Confirm these specifications for the selected model before treating them as available features.</p>
              <a className="button button-teal hybrid-cta" href="#contact">Explore {BRAND_NAME} Hybrid <Arrow diagonal /></a>
            </div>
            <ul className="hybrid-benefits" aria-label="Proposed configuration details">
              <li>GSM + Wi-Fi connectivity</li>
              <li>Wired + wireless sensor compatibility</li>
              <li>Flexible installation options</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="remote-control-section section-pad" id="remote-control" aria-labelledby="remote-control-title">
        <div className="page-width">
          <div className="remote-control-heading">
            <div className="eyebrow"><span className="eyebrow-line" /> Remote control</div>
            <h2 id="remote-control-title">Your Security. Under Your Control.</h2>
            <p>Choose a control method that fits your setup.</p>
          </div>
          <div className="remote-control-diagram">
            <div className="remote-controller">
              <span className="remote-controller-icon" aria-hidden="true"><WorkflowIcon kind="hub" /></span>
              <span className="remote-controller-label">SECURITY CONTROLLER</span>
              <h3>{BRAND_NAME} Ace</h3>
            </div>
            <div className="remote-control-connector" aria-hidden="true"><span /><span /><span /></div>
            <div className="remote-control-cards">
              <article className="remote-control-card">
                <span className="remote-control-icon" aria-hidden="true"><WorkflowIcon kind="app" /></span>
                <h3>Mobile Application</h3>
                <p>Arm your security system through the supported mobile application.</p>
              </article>
              <article className="remote-control-card">
                <span className="remote-control-icon" aria-hidden="true"><WorkflowIcon kind="phone" /></span>
                <h3>Registered Mobile Number</h3>
                <p>Phone-based control, where supported by your configuration.</p>
              </article>
              <article className="remote-control-card">
                <span className="remote-control-icon remote-fob" aria-hidden="true"><WorkflowIcon kind="remote" /></span>
                <h3>Simple Remote Control</h3>
                <p>Use a dedicated remote, if supported by your configuration.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-pattern" aria-hidden="true" /><div className="page-width contact-inner"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Your next step</div><h2 id="contact-title">Ready to Add Another Layer of Security?</h2><p>Tell us what you want to protect, and we’ll help you explore the right {BRAND_NAME} solution.</p><div className="contact-actions"><a className="button button-white" href={whatsappLink} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined} aria-label={`Chat with ${BRAND_NAME} on WhatsApp`}>Chat with us on WhatsApp <Arrow diagonal /></a><a className="contact-secondary" href={whatsappLink} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined}>Request a consultation <Arrow /></a></div>{!whatsappNumber && <p className="config-note">WhatsApp contact will be available once the business number is configured.</p>}</div><div className="contact-index">LET’S TALK <span>01 — 01</span></div></section>

      <footer className="site-footer"><div className="page-width"><div className="footer-main"><div className="footer-brand"><Brand light /><p>Protect What Matters.<br />Stay Alert, Even When You’re Away.</p></div><div className="footer-column"><span className="footer-label">EXPLORE</span><a href="#home">Home</a><a href="#solutions">Security solutions</a><a href="#how-it-works">How it works</a><a href="#remote-control">Remote control</a></div><div className="footer-column"><span className="footer-label">GET IN TOUCH</span><a href={whatsappLink} target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noreferrer" : undefined}>WhatsApp: {whatsappNumber ? `+${whatsappNumber}` : "Number to be added"}</a><a href="#contact">Contact: details to be added</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</span><span>Thoughtful security for the spaces that matter.</span></div></div></footer>
    </main>
  );
}
