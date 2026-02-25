import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../../images/favicon.ico';

const platforms = ['Instagram', 'GitHub', 'Spotify', 'LinkedIn', 'YouTube', 'Substack', 'Dribbble', 'TikTok'];
const presets = [
  { id: 'minimal', name: 'Minimal', note: 'Neutral and clean' },
  { id: 'studio', name: 'Studio', note: 'Editorial and bold' },
  { id: 'sunset', name: 'Sunset', note: 'Warm and expressive' },
  { id: 'mono', name: 'Mono', note: 'High contrast look' }
];

function JoinPage() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [selected, setSelected] = useState([]);
  const [preset, setPreset] = useState('minimal');

  useEffect(() => {
    document.title = 'Join Findme';
  }, []);

  const availability = useMemo(() => {
    if (!username) return null;
    return username.length > 3 && !['admin', 'findme', 'team'].includes(username.toLowerCase());
  }, [username]);

  const canContinue = step !== 1 || availability;
  const previewLinks = selected.length ? selected : ['Instagram', 'YouTube', 'Newsletter'];

  return (
    <main className="join-page">
      <div className="join-layout">
        <section className="join-form-panel">
          <Link to="/" className="back-home">Back to home</Link>
          <div className="progress-track" aria-label="Onboarding steps">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className={`progress-dot ${step >= stepNumber ? 'active' : ''}`}>
                {stepNumber}
              </div>
            ))}
          </div>

          <div className="step-panel" key={step}>
            {step === 1 && (
              <>
                <p className="section-tag">Step 1 of 3</p>
                <h1 className="join-title">Choose your Findme URL</h1>
                <label className="input-line">
                  <span className="username-prefix">findme.link/</span>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                    placeholder="yourname"
                    autoComplete="off"
                  />
                </label>
                {availability !== null && (
                  <p className={`status-text ${availability ? 'ok' : 'no'}`}>
                    {availability ? 'Name is available.' : 'Name is already taken.'}
                  </p>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <p className="section-tag">Step 2 of 3</p>
                <h1 className="join-title">Select your main links</h1>
                <div className="chip-wrap">
                  {platforms.map((platform) => {
                    const active = selected.includes(platform);
                    return (
                      <button
                        key={platform}
                        className={`chip-btn ${active ? 'active' : ''}`}
                        onClick={() => setSelected((items) => (active ? items.filter((x) => x !== platform) : [...items, platform]))}
                      >
                        {platform}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className="section-tag">Step 3 of 3</p>
                <h1 className="join-title">Pick a visual direction</h1>
                <div className="theme-grid">
                  {presets.map((option) => (
                    <button
                      key={option.id}
                      className={`theme-card ${preset === option.id ? 'active' : ''}`}
                      onClick={() => setPreset(option.id)}
                    >
                      <strong>{option.name}</strong>
                      <p>{option.note}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="join-actions">
            {step > 1 && (
              <button className="pill-btn ghost" onClick={() => setStep((s) => s - 1)}>
                Back
              </button>
            )}
            {step < 3 ? (
              <button className="pill-btn primary" onClick={() => canContinue && setStep((s) => s + 1)} disabled={!canContinue}>
                Continue
              </button>
            ) : (
              <Link className="pill-btn primary" to={`/${username || 'yourname'}`}>
                Launch page
              </Link>
            )}
          </div>
        </section>

        <aside className="join-preview-panel">
          <div className={`preview-phone theme-${preset}`}>
            <header className="preview-head">
              <img src={logoIcon} alt="Findme icon" />
              <div>
                <strong>@{username || 'yourname'}</strong>
                <p>Creator mode</p>
              </div>
            </header>

            <ul className="preview-mini-links">
              {previewLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="preview-foot">Preview URL: findme.link/{username || 'yourname'}</p>
        </aside>
      </div>
    </main>
  );
}

export default JoinPage;
