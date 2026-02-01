import React, {useContext} from 'react';
import {NavLink, Navigate, Route, Routes} from 'react-router-dom';
import './styles/App.css';
import logo from './assets/newlogo-digizorger.png';
import HomePage from './pages/HomePage';
import WorkflowPage from './pages/WorkflowPage';
import WorklistPage from './pages/WorklistPage';
import RolesPage from './pages/RolesPage';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';
import Registrate from './pages/Registrate';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import AdminPractices from './pages/AdminPractices';
import AdminCapacity from './pages/AdminCapacity';
import AdminReports from './pages/AdminReports';
import AdminRequests from './pages/AdminRequests';
import {AuthContext} from './context/AuthContext';

function isAdminUser(user) {
  if (!user || !user.authorities) {
    return false;
  }
  const authorities = Array.isArray(user.authorities) ? user.authorities : [user.authorities];
  return authorities.some((authority) =>
    String(authority).toUpperCase().includes('ADMIN'),
  );
}

function AdminRoute({children}) {
  const {isAuth, user} = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to="/inloggen" replace />;
  }
  if (!isAdminUser(user)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <img src={logo} alt="Digitale Zorgdesk logo" className="brand-logo" />
            <div>
              <p className="brand-name">Digitale Zorgdesk</p>
              <p className="brand-tagline">De flexibele digitale voordeur voor de huisartspraktijk</p>
            </div>
          </div>
          <nav className="site-nav">
            <NavLink to="/" end>
              Overzicht
            </NavLink>
            <NavLink to="/workflow">Workflow</NavLink>
            <NavLink to="/werklijst">Werklijst</NavLink>
            <NavLink to="/chat">Chat</NavLink>
            <NavLink to="/rollen">Rollen</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <div className="header-actions">
            <NavLink className="button button-secondary" to="/inloggen">
              Inloggen
            </NavLink>
            <NavLink className="button button-primary" to="/registreren">
              Registreer
            </NavLink>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workflow" element={<WorkflowPage />} />
          <Route path="/werklijst" element={<WorklistPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:conversationId" element={<ChatPage />} />
          <Route path="/rollen" element={<RolesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/inloggen" element={<Login />} />
          <Route path="/registreren" element={<Registrate />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/praktijken"
            element={
              <AdminRoute>
                <AdminPractices />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/capaciteit"
            element={
              <AdminRoute>
                <AdminCapacity />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/rapportages"
            element={
              <AdminRoute>
                <AdminReports />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/aanvragen"
            element={
              <AdminRoute>
                <AdminRequests />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <p className="footer-title">Digitale Zorgdesk</p>
            <p>Flexibele capaciteit voor huisartspraktijken.</p>
          </div>
          <div className="footer-links">
            <span>Beveiliging</span>
            <span>Integraties</span>
            <span>Support</span>
            <NavLink to="/admin">Admin</NavLink>
          </div>
          <p className="footer-copy">© 2026 Digitale Zorgdesk</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

