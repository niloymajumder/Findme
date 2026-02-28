import { getEmbedUrl } from '../lib/playlist';

function PostcardPreview({ postcard, compact = false, showFooter = true }) {
  const embedUrl = getEmbedUrl(postcard.playlistUrl);
  const cardClasses = [
    'postcard-shell',
    postcard.mode === 'dark' ? 'mode-dark' : 'mode-light',
    `theme-${postcard.theme}`,
    `anim-${postcard.animation}`,
    postcard.font === 'sans' ? 'font-sans' : 'font-serif'
  ].join(' ');

  return (
    <article className={cardClasses} style={{ '--accent': postcard.accent }}>
      <div className="postcard-bg-layer" />

      {postcard.photoUrl ? (
        <div className="postcard-hero-wrap">
          <img src={postcard.photoUrl} alt="Postcard memory" className="postcard-hero" />
        </div>
      ) : (
        <div className="postcard-hero-fallback">Add a memory photo</div>
      )}

      <div className="postcard-content">
        <p className="postcard-label">For {postcard.recipient || 'someone special'}</p>
        <p className={`postcard-message ${postcard.typewriter ? 'typewriter' : ''}`}>
          {postcard.message || 'Write your message and it will appear here in the preview.'}
        </p>

        <div className="playlist-frame-wrap">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Playlist preview"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <div className="playlist-placeholder">
              <strong>Playlist embed preview</strong>
              <span>Paste a Spotify or Apple Music playlist URL</span>
            </div>
          )}
        </div>
      </div>

      {showFooter && <footer className="postcard-foot">Made with EchoPost</footer>}

      {compact && <div className="postcard-compact-overlay" aria-hidden="true" />}
    </article>
  );
}

export default PostcardPreview;

