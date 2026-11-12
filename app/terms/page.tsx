import Link from "next/link";
import SiteNavigation from "../site-navigation";

export default function TermsPage() {
  return <main>
    <SiteNavigation />
    <section className="content-page section-pad" aria-labelledby="terms-title">
      <div className="page-width terms-content">
        <div className="eyebrow"><span className="eyebrow-line" /> CUSTOMER INFORMATION</div>
        <h1 id="terms-title">Terms &amp; Conditions</h1>
        <p className="content-page-description">Registration terms are being prepared. Please review the information below before using the customer registration form.</p>
        <div className="terms-notice" role="note"><strong>Publication pending</strong><p>SequrePlus has not yet published its complete customer terms. This page is an interim notice, not a substitute for the final terms. Do not treat registration as acceptance of terms that have not been provided.</p></div>
        <h2>Information and contact</h2>
        <p>Customer registration is intended to collect only the name, address, phone number and email needed to identify a customer and discuss installation and product usage. The registration form is not connected to a secure registration service yet, and currently does not transmit or save the information entered.</p>
        <h2>Installation information</h2>
        <p>Installation instructions depend on the product and configuration. Review the applicable guide and contact SequrePlus if you need help understanding setup or usage.</p>
        <h2>Customer rights</h2>
        <p>Any consent requested for contact does not waive statutory customer rights and is not a guarantee of legal protection. Nothing on this interim page limits rights provided by applicable law.</p>
        <Link className="button button-teal terms-guide-link" href="/installation-guide" target="_blank" rel="noreferrer">View Installation Guide <span className="arrow" aria-hidden="true">↗</span></Link>
      </div>
    </section>
  </main>;
}
