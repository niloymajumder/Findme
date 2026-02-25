import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import logoBlue from '../../images/Logo-Blue-01.png';
import demoPreview from '../../images/Demo.png';
import feedPreview from '../../images/Findme-Demo-01.jpg';
import logoWhite from '../../images/Findme-logo-white-01.png';

const mockLinks = [
  'Book a strategy call',
  'Watch the newest build video',
  'Download the creator kit',
  'Shop limited release templates'
];

const insideCards = [
  {
    title: 'Brand first profile',
    text: 'Use your own imagery and voice. Findme does not look like a generic profile builder.',
    image: feedPreview
  },
  {
    title: 'Practice-style structure',
    text: 'Editorial sections, clear hierarchy, and rhythm make the page feel like a small website.'
  },
  {
    title: 'Linktree-style speed',
    text: 'Fast setup, vertical link stack patterns, and mobile-first tap targets out of the box.'
  }
];

const templateCards = [
  {
    name: 'Creator Board',
    caption: 'Large intro + stacked quick links + featured project',
    image: demoPreview
  },
  {
    name: 'Studio Profile',
    caption: 'For teams publishing updates, services, and inquiry links',
    image: logoBlue
  },
  {
    name: 'Personal Launchpad',
    caption: 'Simple page with social links, newsletter, and one CTA',
    image: feedPreview
  }
];

const creatorSamples = [
  ['@noah.builds', 'Product maker'],
  ['@sana.visuals', 'Visual designer'],
  ['@kev.music', 'Producer'],
  ['@maya.codes', 'Developer educator']
];

function LandingPage() {
  useEffect(() => {
    document.title = 'Findme | Link in bio, rebuilt';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('[data-reveal]').forEach((el, i) => {
      el.style.transitionDelay = `${i * 60}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <Navigation />
      <main>
        <section className="hero-stage">
          <div className="site-container hero-grid">
            <article className="hero-copy" data-reveal>
              <p className="section-tag">Findme 2.0</p>
              <h1 className="hero-title">
                Link in bio, <strong>without looking like everyone else.</strong>
              </h1>
              <p className="hero-subtitle">
                A complete redesign for creators and teams who want the speed of Linktree with a more branded, editorial layout.
              </p>
              <div className="hero-actions">
                <Link to="/join" className="pill-btn primary">Build your page</Link>
                <a href="#templates" className="pill-btn ghost">See templates</a>
              </div>
              <p className="hero-note">One page. Better first impression. Share anywhere.</p>
            </article>

            <article className="hero-visual" data-reveal>
              <div className="phone-shell">
                <header className="phone-head">
                  <div className="phone-user">
                    <img src={logoBlue} alt="Findme brand" className="phone-avatar" />
                    <div>
                      <strong>@findme</strong>
                      <p>Creator profile preview</p>
                    </div>
                  </div>
                  <span className="phone-badge">Live</span>
                </header>

                <ul className="phone-links">
                  {mockLinks.map((item) => (
                    <li key={item} className="phone-link">{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <div className="site-container metric-row">
            <article className="metric-card" data-reveal>
              <h3>60 sec setup</h3>
              <p>Claim a name, choose links, launch.</p>
            </article>
            <article className="metric-card" data-reveal>
              <h3>Mobile tuned</h3>
              <p>Large tap areas and strong contrast for phones.</p>
            </article>
            <article className="metric-card" data-reveal>
              <h3>Brand assets</h3>
              <p>Logo + image support directly from your library.</p>
            </article>
          </div>
        </section>

        <section id="inside" className="inside-strip">
          <div className="site-container">
            <div className="section-head">
              <p className="section-tag">Built with your brand files</p>
              <h2>From quick links to a real branded presence.</h2>
            </div>
            <div className="inside-grid">
              {insideCards.map((card) => (
                <article className="inside-card" key={card.title} data-reveal>
                  {card.image && <img src={card.image} alt={card.title} />}
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="template-section">
          <div className="site-container">
            <div className="section-head">
              <p className="section-tag">Template direction</p>
              <h2>Three looks. One consistent UX.</h2>
            </div>
            <div className="template-grid">
              {templateCards.map((template) => (
                <article className="template-card" key={template.name} data-reveal>
                  <div className="template-thumb">
                    <img src={template.image} alt={template.name} />
                  </div>
                  <h3>{template.name}</h3>
                  <p>{template.caption}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="examples" className="showcase-band">
          <div className="site-container">
            <div className="section-head">
              <p className="section-tag">Creator examples</p>
              <h2>Profiles that feel custom, not cloned.</h2>
            </div>
            <div className="showcase-grid">
              {creatorSamples.map(([handle, role]) => (
                <article className="creator-tile" key={handle} data-reveal>
                  <h3>{handle}</h3>
                  <p>{role}</p>
                  <a href={`/${handle.replace('@', '')}`}>Open profile</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="site-container cta-box" data-reveal>
            <img src={logoWhite} alt="Findme" className="cta-logo" />
            <h2>Launch your new Findme page now.</h2>
            <p>Use your current links and branding assets. Publish in minutes.</p>
            <Link to="/join" className="pill-btn primary">Start free</Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-inner">
          <p>Findme</p>
          <div className="footer-links">
            <a href="#inside">Inside</a>
            <a href="#templates">Templates</a>
            <a href="#examples">Examples</a>
            <Link to="/join">Join</Link>
          </div>
          <span>findme.link</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
