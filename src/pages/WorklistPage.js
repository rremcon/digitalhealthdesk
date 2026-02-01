import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {assignRequest, createRequest, fetchRequests} from '../api/worklistApi';

const initialRequests = [
  {
    id: 1,
    type: 'Herhaalrecept',
    channel: 'Chat',
    urgency: 'Laag',
    patient: 'Mevrouw Jansen',
    note: 'Metformine 500mg, 2x daags',
  },
  {
    id: 2,
    type: 'Uitslag bespreken',
    channel: 'E-consult',
    urgency: 'Normaal',
    patient: 'Dhr. de Vries',
    note: 'Labuitslag cholesterol',
  },
  {
    id: 3,
    type: 'Triage / afspraak',
    channel: 'Voicemail',
    urgency: 'Hoog',
    patient: 'Mevrouw Bakker',
    note: 'Benauwd bij traplopen',
  },
];

function WorklistPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [assigned, setAssigned] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Herhaalrecept',
    channel: 'Chat',
    urgency: 'Laag',
    patient: '',
    note: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadRequests = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRequests();
        const normalized = Array.isArray(data)
          ? data.map((item) => ({
              id: item.id ?? item.requestId ?? Date.now(),
              type: item.type ?? 'Zorgvraag',
              channel: item.channel ?? 'Chat',
              urgency: item.urgency ?? 'Normaal',
              patient: item.patient ?? item.patientName ?? 'Onbekende patiënt',
              note: item.note ?? item.description ?? '',
            }))
          : [];
        if (isMounted && normalized.length) {
          setRequests(normalized);
        }
      } catch (err) {
        if (isMounted) {
          setRequests(initialRequests);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    loadRequests();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.patient.trim()) {
      setError('Vul de naam van de patiënt in.');
      return;
    }
    setError('');
    const newRequest = {
      ...formData,
      id: Date.now(),
      patient: formData.patient.trim(),
      note: formData.note.trim() || 'Geen extra notitie.',
    };
    setRequests((prev) => [newRequest, ...prev]);
    try {
      await createRequest({
        type: newRequest.type,
        channel: newRequest.channel,
        urgency: newRequest.urgency,
        patient: newRequest.patient,
        note: newRequest.note,
      });
    } catch (err) {
      setError('Opslaan naar backend mislukt. Lokaal toegevoegd.');
    }
    setFormData((prev) => ({...prev, patient: '', note: ''}));
  };

  const handleAssign = async (request) => {
    setRequests((prev) => prev.filter((item) => item.id !== request.id));
    setAssigned((prev) => [
      {id: request.id, patient: request.patient, type: request.type, channel: request.channel},
      ...prev,
    ]);
    try {
      await assignRequest(request.id, {assignee: 'huisarts'});
    } catch (err) {
      setError('Toewijzen via backend mislukt. Lokaal bijgewerkt.');
    }
  };

  return (
    <section className="page section section-muted">
      <div className="container">
        <div className="section-heading">
          <h2>Werklijst demo</h2>
          <p>Voeg een zorgvraag toe en wijs deze door om de flow te ervaren.</p>
        </div>
        <div className="worklist">
          <form className="worklist-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="patient">Patiënt</label>
              <input
                id="patient"
                name="patient"
                value={formData.patient}
                onChange={handleChange}
                placeholder="Naam patiënt"
              />
            </div>
            <div className="form-row">
              <label htmlFor="type">Type vraag</label>
              <select id="type" name="type" value={formData.type} onChange={handleChange}>
                <option>Herhaalrecept</option>
                <option>Triage / afspraak</option>
                <option>Uitslag bespreken</option>
                <option>Adviesvraag</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="channel">Kanaal</label>
              <select id="channel" name="channel" value={formData.channel} onChange={handleChange}>
                <option>Chat</option>
                <option>E-consult</option>
                <option>Voicemail</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="urgency">Urgentie</label>
              <select id="urgency" name="urgency" value={formData.urgency} onChange={handleChange}>
                <option>Laag</option>
                <option>Normaal</option>
                <option>Hoog</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="note">Notitie</label>
              <textarea
                id="note"
                name="note"
                rows="3"
                value={formData.note}
                onChange={handleChange}
                placeholder="Aanvullende context"
              />
            </div>
            {error ? <p className="form-error">{error}</p> : null}
            <button className="button button-primary" type="submit">
              Voeg toe aan werklijst
            </button>
          </form>
          <div className="worklist-items">
            {isLoading ? <p className="muted-text">Werklijst laden...</p> : null}
            {requests.map((request) => (
              <div key={request.id} className="worklist-card">
                <div className="worklist-meta">
                  <span className={`badge badge-${request.urgency.toLowerCase()}`}>
                    {request.urgency}
                  </span>
                  <span className="badge badge-muted">{request.channel}</span>
                </div>
                <h3>{request.type}</h3>
                <p className="worklist-patient">{request.patient}</p>
                <p className="worklist-note">{request.note}</p>
                <div className="worklist-actions">
                  <button className="button button-small" type="button" onClick={() => handleAssign(request)}>
                    Naar huisarts toewijzen
                  </button>
                  {request.channel.toLowerCase() === 'chat' ? (
                    <button
                      className="button button-small"
                      type="button"
                      onClick={() => navigate(`/chat/${request.id}`)}
                    >
                      Open chat
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {requests.length === 0 ? (
              <div className="empty-state">Geen openstaande vragen.</div>
            ) : null}
          </div>
        </div>
        <div className="assigned">
          <h3>Toegewezen aan zorgverleners</h3>
          {assigned.length === 0 ? (
            <p className="muted-text">Nog niets toegewezen.</p>
          ) : (
            <ul>
              {assigned.map((item) => (
                <li key={item.id}>
                  {item.patient} • {item.type} ({item.channel})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default WorklistPage;
