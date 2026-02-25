import { useEffect, useMemo, useState } from 'react';

const platforms = ['Instagram', 'GitHub', 'Spotify', 'LinkedIn', 'YouTube', 'Substack', 'Dribbble', 'TikTok'];
const presets = ['Minimal', 'Creative', 'Studio', 'Social'];

function JoinPage() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [selected, setSelected] = useState([]);
  const [preset, setPreset] = useState('Minimal');

  useEffect(() => {
    document.title = 'Join Findme';
  }, []);

  const availability = useMemo(() => {
    if (!username) return null;
    return username.length > 3 && !['admin', 'findme', 'team'].includes(username.toLowerCase());
  }, [username]);

  return (
    <main className="join-wrap">
      <section className="join-card">
        <p className="eyebrow">Step {step} of 3</p>

        <div className="step-panel" key={step}>
          {step === 1 && (
            <>
              <h1>What should we call you?</h1>
              <label className="input-wrap">
                <span>findme.link/</span>
                <input value={username} onChange={(e) => setUsername(e.target.value.trim())} placeholder="yourname" />
              </label>
              {availability !== null && <p className={availability ? 'ok' : 'no'}>{availability ? 'Name is available' : 'Name is taken'}</p>}
            </>
          )}

          {step === 2 && (
            <>
              <h1>Add your links</h1>
              <div className="chip-grid">
                {platforms.map((p) => {
                  const active = selected.includes(p);
                  return (
                    <button
                      key={p}
                      className={`chip ${active ? 'active' : ''}`}
                      onClick={() => setSelected((arr) => (active ? arr.filter((x) => x !== p) : [...arr, p]))}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1>Pick your vibe</h1>
              <div className="preset-grid">
                {presets.map((p) => (
                  <button key={p} className={`preset ${preset === p ? 'selected' : ''}`} onClick={() => setPreset(p)}>
                    <div className="preset-thumb" />
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="join-actions">
          {step > 1 && <button className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>Back</button>}
          {step < 3 ? (
            <button className="btn btn-primary" onClick={() => setStep((s) => s + 1)}>Continue</button>
          ) : (
            <button className="btn btn-primary">Launch my Findme</button>
          )}
        </div>
      </section>
    </main>
  );
}

export default JoinPage;
