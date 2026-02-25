import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoBlue from '../../images/Logo-Blue-01.png';

function NotFoundPage() {
  useEffect(() => {
    document.title = 'Findme | Not Found';
  }, []);

  return (
    <main className="notfound-page">
      <section className="notfound-card">
        <img src={logoBlue} alt="Findme" className="notfound-logo" />
        <p className="section-tag">404</p>
        <h1 className="notfound-title">This profile is not live yet.</h1>
        <p className="notfound-copy">Claim the handle and publish a full branded page in under a minute.</p>
        <div className="notfound-actions">
          <Link to="/join" className="pill-btn primary">Claim this name</Link>
          <Link to="/" className="pill-btn ghost">Go home</Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
