import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import { deletePostcard, duplicatePostcard, getStatus, isExpired, loadPostcards } from '../lib/postcards';

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function DashboardPage() {
  const [searchParams] = useSearchParams();
  const [postcards, setPostcards] = useState([]);
  const saved = searchParams.get('saved');

  useEffect(() => {
    document.title = 'EchoPost | Dashboard';
    setPostcards(loadPostcards());
  }, []);

  const sorted = useMemo(
    () => [...postcards].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [postcards]
  );

  function onDelete(id) {
    setPostcards(deletePostcard(id));
  }

  function onDuplicate(id) {
    setPostcards(duplicatePostcard(id));
  }

  return (
    <div className="page-root">
      <SiteNav />

      <main className="shell dashboard-shell">
        <section className="dashboard-head">
          <div>
            <p className="eyebrow">Your postcards</p>
            <h1>Dashboard</h1>
          </div>
          <Link className="btn primary" to="/create">New postcard</Link>
        </section>

        {saved && <p className="save-banner">Saved and published: /{saved}</p>}

        {sorted.length === 0 ? (
          <section className="card empty-state">
            <h2>No postcards yet</h2>
            <p>Create your first EchoPost to start sharing playlist-based memories.</p>
            <Link className="btn primary" to="/create">Create postcard</Link>
          </section>
        ) : (
          <section className="card table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Privacy</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((card) => (
                  <tr key={card.id}>
                    <td>
                      <strong>/{card.slug}</strong>
                      {isExpired(card) && <small>Expired postcard</small>}
                    </td>
                    <td>{getStatus(card)}</td>
                    <td>{card.privacy}</td>
                    <td>{formatDate(card.updatedAt || card.createdAt)}</td>
                    <td className="actions">
                      <Link className="btn secondary slim" to={`/${card.slug}`}>View</Link>
                      <Link className="btn secondary slim" to={`/create?edit=${card.id}`}>Edit</Link>
                      <button className="btn secondary slim" onClick={() => onDuplicate(card.id)}>Duplicate</button>
                      <button className="btn danger slim" onClick={() => onDelete(card.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
