import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const steps = [
  {
    id: 'intake',
    title: 'Intake via chat, e-consult of voicemail',
    text: 'Patiënt kiest kanaal. Standaard intakevragen sturen de vraag naar het juiste pad.',
  },
  {
    id: 'triage',
    title: 'Triage en prioritering',
    text: 'Assistent beoordeelt urgentie, wijst zorgverlener toe en zet vervolgactie klaar.',
  },
  {
    id: 'afhandeling',
    title: 'Afhandeling door huisarts of waarnemer',
    text: 'Zorgverlener behandelt de vraag, plant vervolg of rondt af met advies.',
  },
  {
    id: 'his',
    title: 'Notitie in HIS + terugkoppeling',
    text: 'Korte samenvatting wordt opgeslagen en patiënt krijgt direct reactie.',
  },
];

function WorkflowPage() {
  const [activeStep, setActiveStep] = useState(steps[0].id);
  const navigate = useNavigate();
  const current = steps.find((step) => step.id === activeStep);

  return (
    <section className="page section">
      <div className="container">
        <div className="section-heading">
          <h2>Workflow in 4 eenvoudige stappen</h2>
          <p>Doorloop een zorgvraag van binnenkomst tot HIS-notitie.</p>
        </div>
        <div className="workflow">
          <div className="workflow-steps">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                className={activeStep === step.id ? 'workflow-step active' : 'workflow-step'}
                onClick={() => setActiveStep(step.id)}
              >
                <span className="workflow-number">{index + 1}</span>
                <span>{step.title}</span>
              </button>
            ))}
          </div>
          <div className="workflow-panel">
            <h3>{current.title}</h3>
            <p>{current.text}</p>
            <div className="workflow-actions">
              <button className="button button-primary" type="button" onClick={() => navigate('/werklijst')}>
                Bekijk werklijst
              </button>
              <button className="button button-secondary" type="button" onClick={() => navigate('/rollen')}>
                Bekijk rollen
              </button>
            </div>
          </div>
        </div>
        <div className="hint">
          <span>Tip:</span> klik op een stap om de workflow te volgen.
        </div>
      </div>
    </section>
  );
}

export default WorkflowPage;
