import React from 'react';
import {NavLink} from 'react-router-dom';

const capacity = [
  {id: 'C-01', name: 'Dr. Meijer', role: 'Huisarts', availability: 'Vandaag 14:00-18:00', status: 'Beschikbaar'},
  {id: 'C-02', name: 'M. van Dijk', role: 'Assistent', availability: 'Ma 09:00-12:00', status: 'Beschikbaar'},
  {id: 'C-03', name: 'Dr. Peters', role: 'Waarnemer', availability: 'Morgen 10:00-16:00', status: 'Stand-by'},
];

function AdminCapacity() {
  return (
    <section className="page section">
      <div className="container">
        <div className="section-heading">
          <h2>Capaciteit plannen</h2>
          <p>Koppel beschikbare zorgverleners aan praktijkvraag.</p>
        </div>
        <div className="admin-actions">
          <button className="button button-primary" type="button">
            Nieuwe inzet plannen
          </button>
          <NavLink className="button button-secondary" to="/admin">
            Terug naar dashboard
          </NavLink>
        </div>
        <div className="admin-table">
          <div className="admin-row admin-row-head">
            <span>Naam</span>
            <span>Rol</span>
            <span>Beschikbaarheid</span>
            <span>Status</span>
          </div>
          {capacity.map((item) => (
            <div key={item.id} className="admin-row">
              <span>{item.name}</span>
              <span>{item.role}</span>
              <span>{item.availability}</span>
              <span className={`chip ${item.status === 'Beschikbaar' ? 'chip-success' : 'chip-info'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminCapacity;
