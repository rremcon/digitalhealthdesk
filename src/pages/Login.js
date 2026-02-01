import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../api/authApi";
import logo from "../assets/newlogo-digizorger.png";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        setErrorMessage(null);
        if (email.trim() === '' || password.trim() === '') {
            setErrorMessage("Vul je e-mail en wachtwoord in.");
            return;
        }
        try {
            setIsLoading(true);
            const response = await loginUser(email.trim(), password);
            const token = response.jwt ?? response.token ?? response.accessToken;
            if (!token) {
                setErrorMessage("Inloggen mislukt. Ontbrekende toegangstoken.");
                return;
            }
            login(token, '/werklijst');
        } catch (e) {
            setErrorMessage("Inloggen mislukt. Controleer je gegevens.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <>
            <section className="page section">
                <div className="container auth-grid">
                    <div className="auth-card">
                        <div className="auth-header">
                            <img src={logo} alt="Digitale Zorgdesk logo" className="brand-logo" />
                            <div>
                                <h1>Inloggen</h1>
                                <p>Voor praktijkhouders, assistentes en waarnemers.</p>
                            </div>
                        </div>
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <label htmlFor="email-field">Werk e-mail</label>
                                <input
                                    type="email"
                                    id="email-field"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="naam@praktijk.nl"
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="password-field">Wachtwoord</label>
                                <input
                                    type="password"
                                    id="password-field"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
                            <button className="button button-primary" type="submit" disabled={isLoading}>
                                {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
                            </button>
                        </form>
                        <div className="auth-footer">
                            <button className="link-button" type="button" onClick={() => navigate('/registreren')}>
                                Nog geen account? Registreer praktijk
                            </button>
                            <button className="link-button" type="button" onClick={() => navigate('/')}>
                                Terug naar overzicht
                            </button>
                        </div>
                    </div>
                    <div className="auth-side">
                        <h2>Wat gebeurt er na inloggen?</h2>
                        <ul>
                            <li>Je ziet de actuele werklijst met openstaande zorgvragen.</li>
                            <li>Je kunt taken toewijzen aan huisartsen of assistentes.</li>
                            <li>Notities worden klaargezet voor het HIS.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;