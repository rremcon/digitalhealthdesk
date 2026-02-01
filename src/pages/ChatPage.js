import React, {useEffect, useMemo, useState} from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {fetchConversations, fetchMessages, sendMessage} from '../api/chatApi';

const fallbackConversations = [
  {id: 'c-1001', patient: 'Mevrouw Jansen', subject: 'Herhaalrecept', status: 'Open'},
  {id: 'c-1002', patient: 'Dhr. de Vries', subject: 'Uitslag bespreken', status: 'In behandeling'},
  {id: 'c-1003', patient: 'Mevrouw Bakker', subject: 'Triage / afspraak', status: 'Urgent'},
];

const fallbackMessages = {
  'c-1001': [
    {id: 'm-1', sender: 'patient', text: 'Kunt u mijn herhaalrecept klaarzetten?', at: '09:12'},
    {id: 'm-2', sender: 'assistant', text: 'Welke medicatie betreft het?', at: '09:13'},
  ],
  'c-1002': [
    {id: 'm-3', sender: 'patient', text: 'Ik wil graag mijn uitslag bespreken.', at: '10:05'},
  ],
  'c-1003': [
    {id: 'm-4', sender: 'patient', text: 'Ik ben kortademig sinds vanochtend.', at: '08:47'},
    {id: 'm-5', sender: 'assistant', text: 'Kunt u uw klachten iets verder toelichten?', at: '08:48'},
  ],
};

function normalizeConversation(item) {
  return {
    id: item.id ?? String(item.conversationId ?? ''),
    patient: item.patient ?? item.patientName ?? 'Onbekende patiënt',
    subject: item.subject ?? item.topic ?? 'Zorgvraag',
    status: item.status ?? 'Open',
  };
}

function normalizeMessage(item) {
  return {
    id: item.id ?? String(item.messageId ?? ''),
    sender: item.sender ?? 'assistant',
    text: item.text ?? item.message ?? '',
    at: item.at ?? item.createdAt ?? '',
  };
}

function ChatPage() {
  const {conversationId} = useParams();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const activeId = useMemo(() => {
    if (conversationId) {
      return conversationId;
    }
    return conversations[0]?.id ?? '';
  }, [conversationId, conversations]);

  useEffect(() => {
    let isMounted = true;
    const loadConversations = async () => {
      try {
        const data = await fetchConversations();
        const normalized = Array.isArray(data) ? data.map(normalizeConversation) : [];
        if (isMounted) {
          setConversations(normalized.length ? normalized : fallbackConversations);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setConversations(fallbackConversations);
          setLoading(false);
        }
      }
    };
    loadConversations();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeId) {
      return;
    }
    let isMounted = true;
    const loadMessages = async () => {
      try {
        const data = await fetchMessages(activeId);
        const normalized = Array.isArray(data) ? data.map(normalizeMessage) : [];
        if (isMounted) {
          setMessages(normalized.length ? normalized : fallbackMessages[activeId] ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setMessages(fallbackMessages[activeId] ?? []);
        }
      }
    };
    loadMessages();
    return () => {
      isMounted = false;
    };
  }, [activeId]);

  const handleSelectConversation = (id) => {
    navigate(`/chat/${id}`);
  };

  const handleSend = async (event) => {
    event.preventDefault();
    if (!draft.trim() || !activeId) {
      return;
    }
    const tempMessage = {
      id: `tmp-${Date.now()}`,
      sender: 'assistant',
      text: draft.trim(),
      at: 'nu',
    };
    setMessages((prev) => [...prev, tempMessage]);
    setDraft('');
    try {
      await sendMessage(activeId, {message: tempMessage.text});
    } catch (err) {
      setError('Bericht verzenden mislukt. Probeer het opnieuw.');
    }
  };

  return (
    <section className="page section">
      <div className="container">
        <div className="section-heading">
          <h2>Chat</h2>
          <p>Communiceer direct met patiënten via een veilige chatomgeving.</p>
        </div>
        <div className="chat-grid">
          <div className="chat-sidebar">
            <div className="chat-sidebar-header">
              <h3>Gesprekken</h3>
              <NavLink className="link-button" to="/werklijst">
                Naar werklijst
              </NavLink>
            </div>
            {loading ? <p className="muted-text">Gesprekken laden...</p> : null}
            <div className="chat-list">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  className={conversation.id === activeId ? 'chat-list-item active' : 'chat-list-item'}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <div>
                    <p className="chat-patient">{conversation.patient}</p>
                    <p className="chat-subject">{conversation.subject}</p>
                  </div>
                  <span className={`chip ${conversation.status === 'Urgent' ? 'chip-warning' : 'chip-info'}`}>
                    {conversation.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="chat-panel">
            {activeId ? (
              <>
                <div className="chat-messages">
                  {messages.length === 0 ? (
                    <p className="muted-text">Nog geen berichten.</p>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={message.sender === 'patient' ? 'chat-bubble patient' : 'chat-bubble assistant'}
                      >
                        <p>{message.text}</p>
                        <span>{message.at}</span>
                      </div>
                    ))
                  )}
                </div>
                {error ? <p className="form-error">{error}</p> : null}
                <form className="chat-input" onSubmit={handleSend}>
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Typ een bericht..."
                  />
                  <button className="button button-primary" type="submit">
                    Verzenden
                  </button>
                </form>
              </>
            ) : (
              <p className="muted-text">Selecteer een gesprek om te starten.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatPage;
