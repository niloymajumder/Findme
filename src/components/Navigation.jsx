import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import brandIcon from '../../images/favicon.ico';
import wordmark from '../../images/Findme-logo-01.png';

function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
      <nav className="site-container nav-inner">
        <Link to="/" className="brand-lockup" aria-label="Findme home">
          <img src={brandIcon} alt="Findme icon" className="brand-icon" />
          <img src={wordmark} alt="Findme" className="brand-wordmark" />
        </Link>

        <button className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <a href="/#inside">Inside</a>
            <a href="/#templates">Templates</a>
            <a href="/#examples">Examples</a>
          </div>
          <div className="nav-actions">
            <Link className="pill-btn ghost" to="/dashboard">Dashboard</Link>
            <Link className="pill-btn primary" to="/join">Get Findme</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
