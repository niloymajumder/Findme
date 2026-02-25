import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import BentoGrid from '../components/BentoGrid';

const demoCards = [
  { id: 'ig', size: 'sm', variant: 'platform', accentColor: 'rgba(228,85,62,0.12)', content: <><h4>Instagram</h4><p>@mint.studio</p></> },
  { id: 'gh', size: 'sm', variant: 'platform', accentColor: 'rgba(123,140,222,0.12)', content: <><h4>GitHub</h4><p>/mint-labs</p></> },
  { id: 'port', size: 'lg', variant: 'featured', content: <><h3>Portfolio 2026</h3><p>Editorial design systems and frontend craft.</p></> },
  { id: 'sp', size: 'sm', variant: 'platform', accentColor: 'rgba(240,168,70,0.12)', content: <><h4>Spotify</h4><p>Now spinning</p></> },
  { id: 'sub', size: 'md', variant: 'default', content: <><h4>Newsletter</h4><p>Small ideas every Friday.</p></> },
  { id: 'say', size: 'sm', variant: 'default', content: <><h4>Say hi</h4><p>hello@findme.link</p></> }
];

const showcaseCards = [
  { id: 'i', size: 'sm', variant: 'platform', content: <><h4>Instagram</h4><p>@someone</p></> },
  { id: 'g', size: 'sm', variant: 'platform', content: <><h4>GitHub</h4><p>/someone</p></> },
  { id: 'p', size: 'lg', variant: 'featured', content: <><h3>Latest Project</h3><p>Designing connective identity online.</p></> },
  { id: 'n', size: 'md', variant: 'default', content: <><h4>Newsletter</h4><p>14k readers</p></> },
  { id: 's', size: 'sm', variant: 'platform', content: <><h4>Spotify</h4><p>Ambient Lab</p></> },
  { id: 'l', size: 'sm', variant: 'default', content: <><h4>Berlin</h4><p>GMT +1</p></> }
];

function LandingPage() {
  useEffect(() => {
    document.title = 'Findme | Your whole internet, one beautiful card';
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
    <div>
      <Navigation />
      <main>
        <section className="hero dot-bg">
          <div className="container center">
            <p className="eyebrow">No need to share your social handles anymore.</p>
            <h1 className="hero-title" data-reveal>
              Your whole internet, <span>one beautiful card.</span>
            </h1>
            <p className="hero-copy" data-reveal>
              Findme turns all your links into one editorial-grade, shareable bento profile that looks like you.
            </p>
            <div className="hero-actions" data-reveal>
              <Link to="/join" className="btn btn-primary">Get your Findme</Link>
              <a href="#examples" className="btn btn-ghost">See live example -></a>
            </div>
            <svg className="squiggle" viewBox="0 0 300 40" fill="none"><path d="M4 20c25-18 50 18 75 0s50-18 75 0 50 18 75 0 50-18 67 0" stroke="#7B8CDE" strokeWidth="3" strokeLinecap="round"/></svg>
            <BentoGrid cards={demoCards} className="mini-grid" />
          </div>
        </section>

        <section id="how" className="section">
          <div className="container">
            <p className="eyebrow">WHY FINDME</p>
            <div className="feature-grid">
              {[
                ['One link rules all', 'Stop explaining five handles and share one clean URL.'],
                ['Bento Grid, your way', 'Mix links, stats, embeds, quotes, and projects.'],
                ['Vibes that match you', 'Warm typography and layout presets with personality.']
              ].map(([title, text]) => (
                <article key={title} className="feature-card" data-reveal>
                  <div className="icon-loop" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="examples" className="section dark">
          <div className="container center">
            <h2>This is someone&apos;s Findme.</h2>
            <p className="sub-peri">Theirs could be you.</p>
            <div className="tilt-wrap">
              <BentoGrid cards={showcaseCards} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container center">
            <h2>People are already vibing.</h2>
            <div className="testimonial-row">
              {[
                ['"I replaced 7 bios with one link."', 'Ari, Product Designer'],
                ['"The grid feels like my portfolio, not a profile form."', 'Noa, Visual Artist'],
                ['"Took me under a minute to launch."', 'Ken, Indie Hacker'],
                ['"Looks premium even before I customize anything."', 'Lea, Music Producer']
              ].map(([q, a]) => (
                <article key={a} className="quote-card" data-reveal>
                  <p>{q}</p>
                  <span>{a}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band center">
          <h2>Just say Findme.</h2>
          <p>Get your personal link page in 60 seconds.</p>
          <Link to="/join" className="btn btn-light">Get started free</Link>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <p className="wordmark light">Findme</p>
          <div className="footer-links"><a href="#how">How it works</a><a href="#examples">Examples</a><Link to="/join">Join</Link></div>
          <span className="badge">@findme.link</span>
        </div>
        <div className="container footer-note">Made with love and a Bento Grid</div>
      </footer>
    </div>
  );
}

export default LandingPage;
