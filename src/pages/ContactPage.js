import React from 'react';

function ContactPage() {
  return (
    <section className="page section section-cta">
      <div className="container cta-grid">
        <div>
          <h2>Plan een korte intake</h2>
          <p>
            We richten de kanalen in, koppelen de werklijst en helpen met de eerste
            waarnemende artsen. Alles volledig volgens AVG en NEN7510.
          </p>
          <div className="contact-details">
            <div>
              <p className="contact-label">E-mail</p>
              <p>info@digitalezorgdesk.nl</p>
            </div>
            <div>
              <p className="contact-label">Telefoon</p>
              <p>+31 (0)20 123 45 67</p>
            </div>
          </div>
        </div>
        <div className="cta-actions">
          <button className="button button-primary" type="button">
            Plan een gesprek
          </button>
          <button className="button button-secondary" type="button">
            Ontvang voorbeeldofferte
          </button>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
