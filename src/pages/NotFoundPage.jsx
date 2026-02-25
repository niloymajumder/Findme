import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Findme | Not Found';
  }, []);

  return (
    <main className="not-found">
      <h1>Hmm. Lost?</h1>
      <p>This Findme doesn&apos;t exist - yet.</p>
      <svg viewBox="0 0 200 140" className="lost-svg" fill="none">
        <path d="M15 95c20-40 40-40 60 0s40 40 60 0 40-40 50 0" stroke="#7B8CDE" strokeWidth="6" strokeLinecap="round" />
        <circle cx="66" cy="48" r="5" fill="#7B8CDE" />
        <circle cx="126" cy="48" r="5" fill="#7B8CDE" />
      </svg>
      <Link to="/join" className="btn btn-danger">Claim this name -></Link>
    </main>
  );
}

export default NotFoundPage;
