import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import PostcardPreview from '../components/PostcardPreview';

const previews = [
  {
    recipient: 'Aria',
    playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
    message: 'Happy birthday. Every track here reminds me of your laugh and late-night drives.',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    theme: 'romantic',
    font: 'serif',
    accent: '#D8A7B1',
    mode: 'light',
    animation: 'fade'
  },
  {
    recipient: 'Milo',
    playlistUrl: 'https://music.apple.com/us/playlist/coffeehouse/pl.u-8aAVXj9Fv7A0N',
    message: 'For the days we miss each other. Press play and stay here for a minute.',
    photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    theme: 'friendship',
    font: 'serif',
    accent: '#8FBBD9',
    mode: 'light',
    animation: 'float'
  },
  {
    recipient: 'Kai',
    playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
    message: 'Even when this chapter ended, your songs stayed. Keep this as a soft goodbye.',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    theme: 'cinematic',
    font: 'sans',
    accent: '#C9C3E6',
    mode: 'dark',
    animation: 'grain'
  }
];

function LandingPage() {
  useEffect(() => {
    document.title = 'EchoPost | Turn a playlist into a postcard';
  }, []);

  return (
    <div className="page-root">
      <SiteNav />

      <main>
        <section className="hero-section shell">
          <p className="eyebrow">Say it with music</p>
          <h1>Turn a playlist into a postcard.</h1>
          <p>Music, words, and memory - all in one beautiful link.</p>
          <Link className="btn primary" to="/create">Create Your Postcard</Link>
        </section>

        <section className="steps-section shell">
          <h2>How it works</h2>
          <div className="steps-grid">
            <article className="card step-card">
              <span>01</span>
              <h3>Add your playlist</h3>
              <p>Paste Spotify or Apple Music URL and we render the embed instantly.</p>
            </article>
            <article className="card step-card">
              <span>02</span>
              <h3>Write your message</h3>
              <p>Create a personal note with optional typewriter reveal.</p>
            </article>
            <article className="card step-card">
              <span>03</span>
              <h3>Share your link</h3>
              <p>Publish at a unique slug and send a private or public memory page.</p>
            </article>
          </div>
        </section>

        <section className="showcase-section shell">
          <h2>Preview themes</h2>
          <div className="showcase-grid">
            {previews.map((preview) => (
              <div key={preview.recipient} className="phone-mock">
                <PostcardPreview postcard={preview} compact />
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section shell">
          <h2>Some feelings deserve better than a link.</h2>
          <Link className="btn primary" to="/create">Create Yours</Link>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
