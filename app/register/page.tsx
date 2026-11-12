import SiteNavigation from "../site-navigation";
import RegistrationForm from "./registration-form";

export default function RegistrationPage() {
  return <main className="registration-page">
    <SiteNavigation />
    <section className="registration-section" aria-labelledby="registration-title">
      <div className="registration-shell">
        <header className="registration-heading">
          <div className="eyebrow"><span className="eyebrow-line" /> CUSTOMER DETAILS</div>
          <h1 id="registration-title">Customer Registration</h1>
          <p>Share your contact details so the SequrePlus team can help you with your security system setup.</p>
        </header>
        <RegistrationForm />
      </div>
    </section>
  </main>;
}
