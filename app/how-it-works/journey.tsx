import { BRAND_NAME } from "@/src/config/brand";

const stages = [
  { id: "detect", number: "01", label: "DETECT", title: "Smart Threat Detection", text: "Compatible sensors monitor configured entry points and detect unexpected movement or unauthorized entry." },
  { id: "alert", number: "02", label: "ALERT", title: "Instant Alarm Activation", text: "When a configured event is detected, the system can activate its siren to draw attention and help deter intrusion." },
  { id: "notify", number: "03", label: "NOTIFY", title: "Stay Informed", text: `${BRAND_NAME} Ace can call registered contacts when configured events occur, helping you stay informed while away.` },
  { id: "protect", number: "04", label: "PROTECT", title: "Take Immediate Action", text: "Use the configured alerts to respond promptly and help protect your home, family or business." },
];

function StageIllustration({ stage }: { stage: string }) {
  if (stage === "detect" || stage === "protect") return (
    <svg className={`journey-art art-${stage}`} viewBox="0 0 240 170" role="img" aria-label={stage === "detect" ? "Illustration of a home entrance with a configured sensor monitoring movement" : "Illustration of a home inside a protective shield"}>
      {stage === "detect" && <><path className="scan scan-one" d="M158 77a34 34 0 0 1 0 44M170 66a50 50 0 0 1 0 66"/><circle className="sensor-dot" cx="139" cy="98" r="5"/></>}
      <path className="art-ground" d="M28 145h184"/><path className="art-house" d="m62 82 58-43 58 43v63H62z"/><path className="art-roof" d="m48 84 72-53 72 53"/><path className="art-window" d="M78 91h25v23H78zm56 0h25v23h-25z"/><path className="art-door" d="M109 108h22v37h-22z"/>
      {stage === "detect" && <g className="approach-person"><circle cx="31" cy="119" r="7"/><path d="m31 127-2 14m2-10-8 7m8-7 8 5m-10 5-6 9m8-9 6 9"/></g>}
      {stage === "protect" && <path className="shield-outline" d="M120 20 186 43v44c0 40-28 67-66 81-38-14-66-41-66-81V43z"/>}
    </svg>
  );
  if (stage === "alert") return (
    <svg className="journey-art art-alert" viewBox="0 0 240 170" role="img" aria-label="Illustration of the SequrePlus Ace controller sounding a configured alarm">
      <path className="sound-wave wave-left" d="M67 61a50 50 0 0 0 0 48m-14-60a67 67 0 0 0 0 72"/><path className="sound-wave wave-right" d="M173 61a50 50 0 0 1 0 48m14-60a67 67 0 0 1 0 72"/>
      <rect className="device-body" x="83" y="29" width="74" height="112" rx="13"/><path className="device-shield" d="m120 48 20 8v15c0 14-9 24-20 29-11-5-20-15-20-29V56z"/><path className="device-check" d="m111 70 7 7 13-15"/><text x="120" y="126" textAnchor="middle">SEQURePLUS ACE</text>
    </svg>
  );
  return (
    <svg className="journey-art art-notify" viewBox="0 0 240 170" role="img" aria-label="Illustration of a phone showing a security alert and incoming call">
      <rect className="phone-body" x="82" y="12" width="76" height="146" rx="15"/><rect className="phone-screen" x="89" y="27" width="62" height="116" rx="7"/><circle className="phone-camera" cx="120" cy="20" r="2"/>
      <rect className="notification" x="94" y="44" width="52" height="35" rx="5"/><circle className="notification-dot" cx="103" cy="54" r="4"/><path className="notification-lines" d="M111 53h26m-26 7h19"/><text className="notification-text" x="99" y="71">SECURITY ALERT</text>
      <circle className="call-icon" cx="120" cy="106" r="17"/><path className="call-symbol" d="M113 98q-3 3 2 10t10 4l3-4-6-4-3 2q-3-1-4-4l2-3-4-5z"/><text className="call-label" x="120" y="135" textAnchor="middle">INCOMING CALL</text>
    </svg>
  );
}

export default function Journey() {
  return (
    <section className="journey-section section-pad" aria-labelledby="journey-title">
      <div className="page-width journey-width">
        <header className="journey-heading">
          <div className="eyebrow"><span className="eyebrow-line" />One connected security system</div>
          <h1 id="journey-title">How We Secure Your Property</h1>
          <p>Experience how our security solutions help protect your home and business with smart detection, instant alarms, and real-time mobile alerts.</p>
        </header>

        <div className="journey-stages">
          <svg className="journey-track" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className="track-base track-desktop" d="M125 250H875"/><path className="track-signal track-desktop" d="M125 250H875"/>
            <path className="track-base track-tablet" d="M250 250H750V750H250"/><path className="track-signal track-tablet" d="M250 250H750V750H250"/>
            <path className="track-base track-mobile" d="M500 125V875"/><path className="track-signal track-mobile" d="M500 125V875"/>
            <circle className="travel-signal signal-desktop" r="10"><animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.25;0.5;0.75;1" keyPoints="0;0.333;0.667;1;1" path="M125 250H875"/></circle>
            <circle className="travel-signal signal-tablet" r="10"><animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.25;0.5;0.75;1" keyPoints="0;0.333;0.667;1;1" path="M250 250H750V750H250"/></circle>
            <circle className="travel-signal signal-mobile" r="10"><animateMotion dur="12s" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.25;0.5;0.75;1" keyPoints="0;0.333;0.667;1;1" path="M500 125V875"/></circle>
          </svg>
          {stages.map((stage) => (
            <article className={`journey-stage journey-${stage.id}`} key={stage.id}>
              <div className="journey-art-wrap"><span className="journey-node" aria-hidden="true"><span>{stage.number}</span></span><StageIllustration stage={stage.id} /></div>
              <div className="journey-copy"><div className="journey-label"><span>{stage.number}</span>{stage.label}</div><h2>{stage.title}</h2><p>{stage.text}</p></div>
            </article>
          ))}
        </div>
        <p className="journey-capability-note">Sensor compatibility and alert features depend on the selected system configuration. Calls are placed to configured registered contacts, up to five numbers.</p>
      </div>
    </section>
  );
}
