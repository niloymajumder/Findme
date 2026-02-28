import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostcardPreview from '../components/PostcardPreview';
import { findBySlug, getRemainingMs, isExpired } from '../lib/postcards';

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

function PostcardPage() {
  const { slug } = useParams();
  const [card, setCard] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const found = findBySlug(slug);
    setCard(found);
    document.title = found ? `EchoPost | ${found.slug}` : 'EchoPost | Not Found';
  }, [slug]);

  useEffect(() => {
    if (!card) return undefined;
    const remaining = getRemainingMs(card);
    if (remaining === null) return undefined;

    setCountdown(remaining);
    const timer = setInterval(() => {
      setCountdown(getRemainingMs(card));
    }, 1000);

    return () => clearInterval(timer);
  }, [card]);

  const expired = useMemo(() => (card ? isExpired(card) : false), [card]);
  const requiresPassword = card?.privacy === 'password';

  function unlock() {
    if (!card) return;
    if (passwordInput === card.password) setUnlocked(true);
  }

  if (!card) {
    return (
      <main className="postcard-screen shell">
        <section className="card centered-block">
          <h1>Postcard not found</h1>
          <p>This memory page does not exist. Create one to start sharing.</p>
          <Link className="btn primary" to="/create">Create postcard</Link>
        </section>
      </main>
    );
  }

  if (expired) {
    return (
      <main className="postcard-screen shell">
        <section className="card centered-block">
          <h1>This postcard has expired</h1>
          <p>Expiry mode was enabled for this page.</p>
          <Link className="btn primary" to="/create">Create a new one</Link>
        </section>
      </main>
    );
  }

  if (requiresPassword && !unlocked) {
    return (
      <main className="postcard-screen shell">
        <section className="card centered-block">
          <h1>Password protected</h1>
          <p>Enter the password to view this postcard.</p>
          <div className="password-row">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
            />
            <button className="btn primary" onClick={unlock}>Unlock</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="postcard-screen shell">
      {countdown !== null && countdown > 0 && (
        <p className="countdown-pill">Expires in {formatCountdown(countdown)}</p>
      )}
      <PostcardPreview postcard={card} showFooter />
    </main>
  );
}

export default PostcardPage;

