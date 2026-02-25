import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BentoGrid from '../components/BentoGrid';

function ProfilePage() {
  const { username } = useParams();

  useEffect(() => {
    document.title = `@${username} | Findme`;
  }, [username]);

  const cards = [
    { id: 'ig', size: 'sm', variant: 'platform', href: 'https://instagram.com', accentColor: 'rgba(228,85,62,0.12)', content: <><h4>Instagram</h4><p>@{username}</p></> },
    { id: 'gh', size: 'sm', variant: 'platform', href: 'https://github.com', accentColor: 'rgba(123,140,222,0.12)', content: <><h4>GitHub</h4><p>/{username}</p></> },
    { id: 'feature', size: 'lg', variant: 'featured', href: 'https://example.com', content: <><h3>Featured project</h3><p>A generative map toolkit for creators.</p><small>Read case study</small></> },
    { id: 'quote', size: 'md', variant: 'quote', content: <p>"I build things that make the internet feel human."</p> },
    { id: 'contact', size: 'sm', variant: 'default', href: 'mailto:hello@example.com', content: <><h4>Say hi</h4><p>hello@example.com</p></> },
    { id: 'location', size: 'sm', variant: 'default', content: <><h4>New York</h4><p>GMT-5</p></> },
    { id: 'stat', size: 'sm', variant: 'default', content: <><h3>12</h3><p>Projects shipped</p></> },
    { id: 'embed', size: 'lg', variant: 'default', content: <><h4>Now playing</h4><p>Ambient coding session #41</p></> }
  ];

  return (
    <main className="section">
      <div className="container">
        <header className="profile-head">
          <div className="profile-left">
            <div className="avatar">{username?.slice(0, 1).toUpperCase()}</div>
            <div>
              <h1>{username}</h1>
              <p>@{username}</p>
              <p className="profile-bio">Product-minded builder. Soft visuals. Hard systems.</p>
              <div className="tag-row"><span className="badge">Brooklyn</span><span className="badge peri">Open to collabs</span></div>
            </div>
          </div>
          <button className="btn btn-ghost">Share</button>
        </header>

        <BentoGrid cards={cards} />
        <div className="profile-foot"><span className="badge dark">Made with Findme</span></div>
      </div>
    </main>
  );
}

export default ProfilePage;
