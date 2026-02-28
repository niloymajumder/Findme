import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  useEffect(() => {
    document.title = 'EchoPost | Not Found';
  }, []);

  return (
    <main className="postcard-screen shell">
      <section className="card centered-block">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The link you opened does not exist.</p>
        <div className="inline-actions">
          <Link className="btn primary" to="/">Home</Link>
          <Link className="btn secondary" to="/create">Create postcard</Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
