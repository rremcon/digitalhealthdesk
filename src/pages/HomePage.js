import React from 'react';
import {useNavigate} from 'react-router-dom';

const stats = [
  {label: 'Open vragen', value: '24'},
  {label: 'Gem. responstijd', value: '12 min'},
  {label: 'Beschikbare artsen', value: '8'},
];

const highlights = [
  {
    title: 'Meerdere kanalen, één werklijst',
    text: 'Chat, e-consult en voicemail komen samen in één dashboard.',
  },
  {
    title: 'Flexibel capaciteit inzetten',
    text: 'Waarnemers en assistentes kunnen vanuit huis meekijken.',
  },
  {
    title: 'HIS-notitie na elk consult',
    text: 'Korte overdracht wordt direct opgeslagen in het HIS.',
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="page hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Communicatieplatform voor huisartspraktijken</p>
          <h1>Een eenvoudige workflow die druk bij de balie direct verlaagt.</h1>
          <p className="hero-lead">
            Patiënten kiezen zelf hun kanaal, praktijkhouders houden regie en waarnemers
            werken flexibel mee. Alles komt samen in één duidelijke werklijst.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={() => navigate('/workflow')}>
              Bekijk workflow
            </button>
            <button className="button button-ghost" type="button" onClick={() => navigate('/werklijst')}>
              Naar werklijst demo
            </button>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-panel">
          <div className="panel-card">
            <h3>Vandaag binnengekomen</h3>
            <ul>
              <li>16 chats • 8 e-consults • 5 voicemails</li>
              <li>4 praktijken gekoppeld</li>
              <li>2 waarnemers beschikbaar</li>
            </ul>
            <div className="panel-highlight">
              <p className="panel-title">Snelste route naar zorg</p>
              <p className="panel-text">Chat direct met huisarts, zonder wachtrij.</p>
            </div>
          </div>
          <div className="panel-card panel-muted">
            <h3>Capaciteitsoverzicht</h3>
            <p>Plan extra ondersteuning op basis van realtime vraag en aanbod.</p>
            <div className="pill-row">
              <span className="pill">5 assistentes remote</span>
              <span className="pill">3 huisartsen standby</span>
              <span className="pill">2 praktijken met piekdrukte</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="grid three">
          {highlights.map((item) => (
            <div key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
