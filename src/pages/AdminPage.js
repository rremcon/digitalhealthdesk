import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

function AdminPage() {
  const {isAuth, user} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <section className="page section">
      <div className="container">
        <div className="section-heading">
          <h2>Administrator dashboard</h2>
          <p>Beheer praktijken, capaciteit en kwaliteitsrapportages op één plek.</p>
        </div>

        {!isAuth ? (
          <div className="card admin-card">
            <h3>Inloggen vereist</h3>
            <p>Log in om praktijkgegevens en capaciteit te beheren.</p>
            <button className="button button-primary" type="button" onClick={() => navigate('/inloggen')}>
              Inloggen
            </button>
          </div>
        ) : (
          <>
            <div className="admin-header">
              <div>
                <p className="eyebrow">Beheeromgeving</p>
                <h3>Welkom {user?.firstname ? user.firstname : 'beheerder'}</h3>
              </div>
              <button className="button button-secondary" type="button">
                Exporteer overzicht
              </button>
            </div>

            <div className="admin-grid">
              <div className="card admin-card">
                <h3>Praktijken</h3>
                <p>Onboard nieuwe praktijken en beheer contactpersonen.</p>
                <NavLink className="button button-small" to="/admin/praktijken">
                  Praktijken beheren
                </NavLink>
              </div>
              <div className="card admin-card">
                <h3>Capaciteit</h3>
                <p>Match waarnemers en assistentes aan drukte.</p>
                <NavLink className="button button-small" to="/admin/capaciteit">
                  Capaciteit plannen
                </NavLink>
              </div>
              <div className="card admin-card">
                <h3>Kwaliteit</h3>
                <p>Bekijk doorlooptijden en responstijden per praktijk.</p>
                <NavLink className="button button-small" to="/admin/rapportages">
                  Rapportage openen
                </NavLink>
              </div>
            </div>

            <div className="admin-table">
              <div className="admin-table-header">
                <h3>Vandaag</h3>
                <NavLink className="link-button" to="/admin/aanvragen">
                  Bekijk aanvragen
                </NavLink>
              </div>
              <div className="admin-row">
                <span>Nieuwe praktijkaanvragen</span>
                <span>3</span>
              </div>
              <div className="admin-row">
                <span>Openstaande incidenten</span>
                <span>1</span>
              </div>
              <div className="admin-row">
                <span>Capaciteitstekort meldingen</span>
                <span>2</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default AdminPage;
