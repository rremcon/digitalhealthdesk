import React, {useState} from 'react';

const roleContent = {
  praktijkhouder: {
    title: 'Voor praktijkhouders',
    items: [
      'Extra digitale voordeur zonder extra fysieke balie.',
      'Flexibel inzetten van waarnemers en assistentes op piekmomenten.',
      'Realtime inzicht in wachttijden en capaciteit.',
      'Korte implementatie zonder zware IT-trajecten.',
    ],
  },
  huisarts: {
    title: 'Voor huisartsen en assistentes',
    items: [
      'Werken vanuit huis met duidelijke taken en prioriteiten.',
      'Directe triage met afgesproken protocollen.',
      'Automatische transcriptie van voicemail naar taken.',
      'Na afloop direct notitie naar het HIS.',
    ],
  },
  waarnemer: {
    title: 'Voor waarnemers',
    items: [
      'Kies korte blokken inzetbaarheid, volledig remote.',
      'Gestandaardiseerde overdracht en duidelijke follow-up.',
      'Transparante vergoeding per consult of tijdsblok.',
      'Geen losse administratie nodig.',
    ],
  },
};

function RolesPage() {
  const [roleView, setRoleView] = useState('praktijkhouder');

  return (
    <section className="page section">
      <div className="container">
        <div className="section-heading">
          <h2>Ingericht voor elke rol</h2>
          <p>Kies een rol om te zien welke waarde de digitale zorgdesk biedt.</p>
        </div>
        <div className="role-toggle">
          <button
            className={roleView === 'praktijkhouder' ? 'toggle active' : 'toggle'}
            onClick={() => setRoleView('praktijkhouder')}
            type="button"
          >
            Praktijkhouder
          </button>
          <button
            className={roleView === 'huisarts' ? 'toggle active' : 'toggle'}
            onClick={() => setRoleView('huisarts')}
            type="button"
          >
            Huisarts / assistent
          </button>
          <button
            className={roleView === 'waarnemer' ? 'toggle active' : 'toggle'}
            onClick={() => setRoleView('waarnemer')}
            type="button"
          >
            Waarnemer
          </button>
        </div>
        <div className="role-card">
          <h3>{roleContent[roleView].title}</h3>
          <ul>
            {roleContent[roleView].items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default RolesPage;
