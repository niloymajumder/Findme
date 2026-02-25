import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logoIcon from '../../images/favicon.ico';
import coverPreview from '../../images/Findme-Demo-01.jpg';

function ProfilePage() {
  const { username } = useParams();
  const handle = username || 'creator';

  useEffect(() => {
    document.title = `@${handle} | Findme`;
  }, [handle]);

  const links = [
    { label: 'Watch latest breakdown', detail: 'YouTube', href: 'https://youtube.com' },
    { label: 'Read project notes', detail: 'Substack', href: 'https://substack.com' },
    { label: 'See shipped work', detail: 'Portfolio', href: 'https://example.com' },
    { label: 'Book collaboration call', detail: 'Calendar', href: 'https://calendly.com' },
    { label: 'Follow daily updates', detail: 'Instagram', href: 'https://instagram.com' }
  ];

  return (
    <main className="profile-page">
      <section className="profile-wrap">
        <header className="profile-header-card">
          <img src={logoIcon} alt="Findme icon" className="profile-avatar" />
          <div className="profile-meta">
            <h1>{handle}</h1>
            <p>@{handle}</p>
            <span className="profile-chip">Open for collaborations</span>
          </div>
          <button className="pill-btn ghost">Share</button>
        </header>

        <article className="profile-feature">
          <img src={coverPreview} alt="Featured content preview" />
          <div>
            <h2>Featured: Product launch system</h2>
            <p>A practical guide for building and shipping small products in public.</p>
          </div>
        </article>

        <div className="profile-list">
          {links.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="profile-link">
              <span>{item.label}</span>
              <small>{item.detail}</small>
              <em>Open</em>
            </a>
          ))}
        </div>

        <p className="profile-footer-note">Powered by Findme</p>
      </section>
    </main>
  );
}

export default ProfilePage;
