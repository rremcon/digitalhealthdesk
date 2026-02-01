import React from 'react';
import {NavLink} from 'react-router-dom';

const reports = [
  {id: 'R-01', title: 'Doorlooptijd per kanaal', value: 'Gem. 28 min', status: 'Op schema'},
  {id: 'R-02', title: 'Afgehandelde vragen vandaag', value: '142', status: 'Boven verwachting'},
  {id: 'R-03', title: 'Openstaande urgenties', value: '6', status: 'Actie nodig'},
];

function AdminReports() {
  return (
    <section className="page section">
      <div className="container">
        <div className="section-heading">
          <h2>Rapportages</h2>
          <p>Realtime inzicht in kwaliteit en doorlooptijd.</p>
        </div>
        <div className="admin-actions">
          <button className="button button-primary" type="button">
            Exporteer weekrapport
          </button>
          <NavLink className="button button-secondary" to="/admin">
            Terug naar dashboard
          </NavLink>
        </div>
        <div className="admin-grid">
          {reports.map((report) => (
            <div key={report.id} className="card admin-card">
              <h3>{report.title}</h3>
              <p className="stat-value">{report.value}</p>
              <span className={`chip ${report.status === 'Actie nodig' ? 'chip-warning' : 'chip-success'}`}>
                {report.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminReports;
