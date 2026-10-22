"use client";

import { useState } from "react";

const areas = [
  { name: "Home", title: "A more considered way to protect home", text: "Monitor the entry points that matter with compatible sensors, then receive the configured alert response when a qualifying event is detected.", detail: "Doors, windows & key areas", illustration: "home" },
  { name: "Doors", title: "Keep an eye on every entry", text: "Door sensors can help you know when a protected entry point is opened, with SequrePlus Ace coordinating the configured response.", detail: "Entry-point monitoring", illustration: "door" },
  { name: "Windows", title: "Add awareness around windows", text: "Help protect vulnerable windows with compatible sensors configured for your property and receive alerts when qualifying activity is detected.", detail: "Window sensors", illustration: "window" },
  { name: "Shop", title: "Support your business after hours", text: "Configure sensors for selected business entry points and spaces, with a siren and calls to registered contacts as part of the response.", detail: "Business premises", illustration: "shop" },
  { name: "Open spaces", title: "Cover the spaces between entry points", text: "Explore compatible motion sensors for selected indoor or outdoor areas, configured to suit the way your property is used.", detail: "Configured motion detection", illustration: "open" },
];

function PropertyIllustration({ kind }: { kind: string }) {
  const shop = kind === "shop";
  const open = kind === "open";
  return (
    <svg className="solution-property-art" viewBox="0 0 720 390" role="img" aria-label={`${kind} security illustration`}>
      <defs><linearGradient id="solutionSky" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#e4f2ef"/></linearGradient></defs>
      <rect x="1" y="1" width="718" height="388" rx="22" fill="url(#solutionSky)" />
      <circle cx="578" cy="83" r="37" fill="#fff"/><circle cx="578" cy="83" r="23" fill="#d8eee9"/>
      <path d="M55 323h610" stroke="#b7c9cc" strokeWidth="3" strokeLinecap="round"/>
      {shop ? <g><path d="M177 157h366v166H177z" fill="#fff" stroke="#8ba0aa" strokeWidth="3"/><path d="M158 157h404l-31-69H189z" fill="#10233f"/><path d="M190 111h340l20 46H170z" fill="#0f9d8a"/><path d="M206 177h135v146H206z" fill="#e8f4f2" stroke="#9ab0b8" strokeWidth="3"/><path d="M376 190h137v78H376z" fill="#d9eeea" stroke="#9ab0b8" strokeWidth="3"/><path d="M430 268v55" stroke="#9ab0b8" strokeWidth="3"/><text x="377" y="145" fill="white" fontSize="18" fontWeight="700" letterSpacing="3">YOUR SHOP</text></g> : <g><path d="m133 175 227-123 227 123v148H133z" fill="#fff" stroke="#8ba0aa" strokeWidth="3"/><path d="m111 178 249-139 249 139" fill="none" stroke="#10233f" strokeWidth="14" strokeLinejoin="round"/><path d="M193 197h93v68h-93zM434 197h93v68h-93z" fill="#d9eeea" stroke="#0f9d8a" strokeWidth="3"/><path d="M324 229h72v94h-72z" fill="#f4f7f8" stroke="#8ba0aa" strokeWidth="3"/><circle cx="380" cy="278" r="4" fill="#0f9d8a"/><path d="M160 323v-31m400 31v-31" stroke="#9bb4b4" strokeWidth="8" strokeLinecap="round"/></g>}
      {open && <g fill="#c5e4dc"><circle cx="91" cy="286" r="30"/><circle cx="620" cy="291" r="38"/><path d="M72 320h38l-8-67H80zm523 4h50l-11-76h-28z"/></g>}
      <g className="solution-sensor-mark"><circle cx="225" cy="197" r="27" fill="#fff" stroke="#0f9d8a" strokeWidth="3"/><path d="M215 197h20m-10-10v20" stroke="#0f9d8a" strokeWidth="3" strokeLinecap="round"/></g>
      <g className="solution-sensor-mark"><circle cx="470" cy="198" r="27" fill="#fff" stroke="#0f9d8a" strokeWidth="3"/><path d="M460 198h20m-10-10v20" stroke="#0f9d8a" strokeWidth="3" strokeLinecap="round"/></g>
      {kind === "door" && <rect x="324" y="229" width="72" height="94" rx="3" fill="none" stroke="#0f9d8a" strokeWidth="4"/>}
      {kind === "window" && <rect x="193" y="197" width="93" height="68" rx="3" fill="none" stroke="#0f9d8a" strokeWidth="4"/>}
      <path d="M591 185v51m-17-34a26 26 0 0 1 34 0m-45-11a42 42 0 0 1 56 0" fill="none" stroke="#0f9d8a" strokeWidth="3" strokeLinecap="round" opacity=".75"/>
    </svg>
  );
}

export default function SolutionSelector({ whatsappLink, hasWhatsapp }: { whatsappLink: string; hasWhatsapp: boolean }) {
  const [selected, setSelected] = useState(0);
  const area = areas[selected];
  return <div className="solution-explorer">
    <div className="solution-tabs" role="tablist" aria-label="Choose an area to protect">
      {areas.map((item, index) => <button key={item.name} id={`solution-tab-${index}`} type="button" role="tab" aria-selected={selected === index} aria-controls="solution-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? areas.length - 1 : (selected + (event.key === "ArrowRight" ? 1 : areas.length - 1)) % areas.length;
        setSelected(next);
        document.getElementById(`solution-tab-${next}`)?.focus();
      }}><span className="solution-tab-number">0{index + 1}</span><span>{item.name}</span><span className="solution-tab-arrow" aria-hidden="true">↗</span></button>)}
    </div>
    <div className="solution-feature" id="solution-panel" role="tabpanel" aria-labelledby={`solution-tab-${selected}`}>
      <div className="solution-feature-copy"><span className="solution-feature-kicker"><i /> {area.detail}</span><h3>{area.title}</h3><p>{area.text}</p><a className="button button-dark solution-inquiry" href={whatsappLink} target={hasWhatsapp ? "_blank" : undefined} rel={hasWhatsapp ? "noreferrer" : undefined}>Ask us about {area.name.toLowerCase()} protection <span aria-hidden="true">↗</span></a></div>
      <div className="solution-art-wrap"><PropertyIllustration kind={area.illustration}/><div className="solution-art-label"><span className="solution-art-check">✓</span><span><b>Thoughtful protection</b><small>Configured around your property</small></span></div></div>
    </div>
  </div>;
}
