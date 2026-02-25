import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav-shell ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="container nav-row">
        <Link to="/" className="wordmark">Findme</Link>
        <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#how">How it works</a>
          <a href="#examples">See examples</a>
          <Link className="btn btn-primary" to="/join">Get your Findme</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
