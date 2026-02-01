import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {registerUser} from "../api/authApi";
import logo from "../assets/newlogo-digizorger.png";

function Registrate() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [consent, setConsent] = useState(false);
    const [formData, setFormData] = useState({
        salutation: 'Dhr.',
        firstname: '',
        lastname: '',
        practiceName: '',
        role: 'Praktijkhouder',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    async function registerUser(e) {
        e.preventDefault();
        setErrorMessage(null);

        if (!formData.firstname.trim() || !formData.lastname.trim() || !formData.email.trim() || !formData.phone.trim()) {
            setErrorMessage("Vul alle verplichte velden in.");
            return;
        }
        if (formData.password.length < 8) {
            setErrorMessage("Wachtwoord moet minimaal 8 tekens bevatten.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Wachtwoorden komen niet overeen.");
            return;
        }
        if (!consent) {
            setErrorMessage("Geef toestemming voor verwerking van gegevens.");
            return;
        }

        try {
            setIsLoading(true);
            const payload = {
                salutation: formData.salutation,
                firstname: formData.firstname.trim(),
                lastname: formData.lastname.trim(),
                birthdate: '',
                address: formData.practiceName.trim(),
                zipcode: '',
                city: '',
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                helpingtool: 'Niet van toepassing',
                username: formData.email.trim(),
                password: formData.password,
            };
            await registerUser(payload);
            navigate('/inloggen');
        } catch (e) {
            setErrorMessage("Registratie mislukt. Controleer de gegevens of probeer later opnieuw.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="page section">
            <div className="container auth-grid">
                <div className="auth-card">
                    <div className="auth-header">
                        <img src={logo} alt="Digitale Zorgdesk logo" className="brand-logo" />
                        <div>
                            <h1>Registreren</h1>
                            <p>Alleen toegankelijk voor geautoriseerde zorginstellingen.</p>
                        </div>
                    </div>
                    <form className="auth-form" onSubmit={registerUser}>
                        <div className="form-row">
                            <label htmlFor="salutation">Aanhef</label>
                            <select id="salutation" name="salutation" value={formData.salutation} onChange={handleChange}>
                                <option value="Dhr.">Dhr.</option>
                                <option value="Mevr.">Mevr.</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <label htmlFor="firstname">Voornaam</label>
                            <input
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="Voornaam"
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="lastname">Achternaam</label>
                            <input
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Achternaam"
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="practiceName">Praktijknaam</label>
                            <input
                                id="practiceName"
                                name="practiceName"
                                value={formData.practiceName}
                                onChange={handleChange}
                                placeholder="Huisartspraktijk Noord"
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="role">Rol</label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange}>
                                <option>Praktijkhouder</option>
                                <option>Assistent</option>
                                <option>Waarnemer</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">Werk e-mail</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="naam@praktijk.nl"
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="phone">Telefoon</label>
                            <input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="06 12345678"
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">Wachtwoord</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Minimaal 8 tekens"
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="confirmPassword">Herhaal wachtwoord</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <label className="consent">
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                            />
                            Ik geef toestemming voor de verwerking van mijn gegevens.
                        </label>
                        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
                        <button className="button button-primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Registreren...' : 'Registreer'}
                        </button>
                    </form>
                    <div className="auth-footer">
                        <button className="link-button" type="button" onClick={() => navigate('/inloggen')}>
                            Al een account? Log in
                        </button>
                        <button className="link-button" type="button" onClick={() => navigate('/')}>
                            Terug naar overzicht
                        </button>
                    </div>
                </div>
                <div className="auth-side">
                    <h2>Na registratie</h2>
                    <ul>
                        <li>We verifiëren je praktijkgegevens.</li>
                        <li>Je krijgt toegang tot de werklijst en workflow.</li>
                        <li>We helpen met de eerste inrichting van kanalen.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Registrate;