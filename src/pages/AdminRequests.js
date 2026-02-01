import React from 'react';
import {NavLink} from 'react-router-dom';

const requests = [
  {id: 'A-01', practice: 'Praktijk De Linde', type: 'Nieuwe praktijk', status: 'Wacht op verificatie'},
  {id: 'A-02', practice: 'MC Buitenhof', type: 'Extra capaciteit', status: 'Review nodig'},
  {id: 'A-03', practice: 'Huisartsenpraktijk Noord', type: 'Integratie HIS', status: 'In behandeling'},
];

function AdminRequests() {
  return (
    <section className="page section">
      <div className="container">
        <div className="section-heading">
          <h2>Praktijkaanvragen</h2>
          <p>Nieuwe aanvragen en updates vanuit praktijken.</p>
        </div>
        <div className="admin-actions">
          <button className="button button-primary" type="button">
            Nieuwe aanvraag verwerken
          </button>
          <NavLink className="button button-secondary" to="/admin">
            Terug naar dashboard
          </NavLink>
        </div>
        <div className="admin-table">
          <div className="admin-row admin-row-head">
            <span>Praktijk</span>
            <span>Type</span>
            <span>Status</span>
            <span>Actie</span>
          </div>
          {requests.map((request) => (
            <div key={request.id} className="admin-row">
              <span>{request.practice}</span>
              <span>{request.type}</span>
              <span className="chip chip-info">{request.status}</span>
              <button className="button button-small" type="button">
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminRequests;
