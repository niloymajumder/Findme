import { Link, useLocation } from 'react-router-dom';

function SiteNav() {
  const location = useLocation();
  const onCreate = location.pathname === '/create';
  const onDashboard = location.pathname === '/dashboard';

  return (
    <header className="site-nav-wrap">
      <nav className="site-nav shell">
        <Link className="brand" to="/">
          <span className="brand-dot" />
          EchoPost
        </Link>
        <div className="nav-links">
          <Link className={`nav-link ${onCreate ? 'active' : ''}`} to="/create">Create</Link>
          <Link className={`nav-link ${onDashboard ? 'active' : ''}`} to="/dashboard">Dashboard</Link>
        </div>
      </nav>
    </header>
  );
}

export default SiteNav;

