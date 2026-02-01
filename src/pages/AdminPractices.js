import React from 'react';
import {NavLink} from 'react-router-dom';

const practices = [
  {id: 'P-102', name: 'Huisartsenpraktijk Noord', city: 'Utrecht', status: 'Actief', contacts: 4},
  {id: 'P-117', name: 'Praktijk De Linde', city: 'Amersfoort', status: 'Actief', contacts: 2},
  {id: 'P-121', name: 'Medisch Centrum Buitenhof', city: 'Almere', status: 'In onboarding', contacts: 1},
];

function AdminPractices() {
  return (
    <section className="page section">
      <div className="container">
        <div className="section-heading">
          <h2>Praktijken beheren</h2>
          <p>Overzicht van aangesloten praktijken en hun contactpersonen.</p>
        </div>
        <div className="admin-actions">
          <button className="button button-primary" type="button">
            Nieuwe praktijk toevoegen
          </button>
          <NavLink className="button button-secondary" to="/admin">
            Terug naar dashboard
          </NavLink>
        </div>
        <div className="admin-table">
          <div className="admin-row admin-row-head">
            <span>Praktijk</span>
            <span>Locatie</span>
            <span>Status</span>
            <span>Contacten</span>
          </div>
          {practices.map((practice) => (
            <div key={practice.id} className="admin-row">
              <span>{practice.name}</span>
              <span>{practice.city}</span>
              <span className={`chip ${practice.status === 'Actief' ? 'chip-success' : 'chip-warning'}`}>
                {practice.status}
              </span>
              <span>{practice.contacts}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminPractices;
