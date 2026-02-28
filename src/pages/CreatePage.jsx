import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import PostcardPreview from '../components/PostcardPreview';
import {
  buildPostcard,
  createBaseSlug,
  ensureUniqueSlug,
  findById,
  loadPostcards,
  upsertPostcard
} from '../lib/postcards';
import { detectPlaylistProvider } from '../lib/playlist';

const accentPalette = ['#D8A7B1', '#C9C3E6', '#8FBBD9', '#B7C9B0', '#F2C6B4'];
const themeOptions = [
  { value: 'romantic', label: 'Romantic' },
  { value: 'friendship', label: 'Friendship' },
  { value: 'cinematic', label: 'Dark cinematic' }
];

const initialForm = {
  recipient: '',
  slug: '',
  playlistUrl: '',
  message: '',
  photoUrl: '',
  theme: 'romantic',
  font: 'serif',
  accent: '#D8A7B1',
  mode: 'light',
  animation: 'fade',
  typewriter: false,
  privacy: 'public',
  password: '',
  expiresInHours: 0
};

function CreatePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editId = searchParams.get('edit');
  const editing = Boolean(editId);
  const [form, setForm] = useState(initialForm);
  const [sourceId, setSourceId] = useState(null);
  const [photoFileName, setPhotoFileName] = useState('');
  const [savedSlug, setSavedSlug] = useState('');

  useEffect(() => {
    document.title = editing ? 'EchoPost | Edit postcard' : 'EchoPost | Create postcard';
    if (!editing) return;

    const postcard = findById(editId);
    if (!postcard) return;

    setSourceId(postcard.id);
    setForm({
      recipient: postcard.recipient || '',
      slug: postcard.slug || '',
      playlistUrl: postcard.playlistUrl || '',
      message: postcard.message || '',
      photoUrl: postcard.photoUrl || '',
      theme: postcard.theme || 'romantic',
      font: postcard.font || 'serif',
      accent: postcard.accent || '#D8A7B1',
      mode: postcard.mode || 'light',
      animation: postcard.animation || 'fade',
      typewriter: Boolean(postcard.typewriter),
      privacy: postcard.privacy || 'public',
      password: postcard.password || '',
      expiresInHours: Number(postcard.expiresInHours || 0)
    });
  }, [editId, editing]);

  const provider = useMemo(() => detectPlaylistProvider(form.playlistUrl), [form.playlistUrl]);

  const previewPostcard = {
    ...form,
    recipient: form.recipient || 'Someone special',
    message: form.message || 'Your message appears here.',
    slug: form.slug || 'for-someone'
  };

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function onPhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateField('photoUrl', String(reader.result || ''));
      setPhotoFileName(file.name);
    };
    reader.readAsDataURL(file);
  }

  function makeSlug() {
    const cards = loadPostcards();
    const generated = createBaseSlug(form.recipient);
    const unique = ensureUniqueSlug(generated, cards, sourceId);
    updateField('slug', unique);
  }

  function onSubmit(event) {
    event.preventDefault();

    const cards = loadPostcards();
    const baseSlug = form.slug || createBaseSlug(form.recipient);
    const slug = ensureUniqueSlug(baseSlug, cards, sourceId);

    const postcard = buildPostcard(
      {
        ...form,
        slug,
        password: form.privacy === 'password' ? form.password : '',
        expiresInHours: Number(form.expiresInHours || 0)
      },
      sourceId ? findById(sourceId) : null
    );

    upsertPostcard(postcard);
    setSavedSlug(postcard.slug);
    navigate(`/dashboard?saved=${postcard.slug}`);
  }

  return (
    <div className="page-root">
      <SiteNav />

      <main className="shell create-layout">
        <section className="preview-panel card">
          <div className="panel-head">
            <h2>Live preview</h2>
            <p>Updates as you edit.</p>
          </div>
          <PostcardPreview postcard={previewPostcard} />
        </section>

        <section className="controls-panel card">
          <div className="panel-head">
            <h2>{editing ? 'Edit postcard' : 'Create postcard'}</h2>
            <p>Build your emotional link in a few steps.</p>
          </div>

          <form className="form-grid" onSubmit={onSubmit}>
            <label className="field">
              <span>Recipient name</span>
              <input
                value={form.recipient}
                onChange={(e) => updateField('recipient', e.target.value)}
                placeholder="Aria"
                required
              />
            </label>

            <div className="field field-inline">
              <label>
                <span>Custom slug</span>
                <input
                  value={form.slug}
                  onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  placeholder="for-aria"
                />
              </label>
              <button className="btn secondary slim" type="button" onClick={makeSlug}>Auto</button>
            </div>

            <label className="field">
              <span>Playlist URL</span>
              <input
                value={form.playlistUrl}
                onChange={(e) => updateField('playlistUrl', e.target.value)}
                placeholder="https://open.spotify.com/playlist/..."
                required
              />
              <small>{provider ? `${provider} detected` : 'Paste Spotify or Apple Music URL'}</small>
            </label>

            <label className="field">
              <span>Personal message</span>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                placeholder="Write your memory, confession, or note."
                required
              />
            </label>

            <label className="field checkbox">
              <input
                type="checkbox"
                checked={form.typewriter}
                onChange={(e) => updateField('typewriter', e.target.checked)}
              />
              <span>Enable typewriter message animation</span>
            </label>

            <label className="field">
              <span>Featured photo</span>
              <input type="file" accept="image/*" onChange={onPhotoUpload} />
              <small>{photoFileName || 'Single hero image upload'}</small>
            </label>

            <div className="field">
              <span>Theme preset</span>
              <div className="chip-row">
                {themeOptions.map((theme) => (
                  <button
                    type="button"
                    key={theme.value}
                    className={`chip ${form.theme === theme.value ? 'active' : ''}`}
                    onClick={() => updateField('theme', theme.value)}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <span>Accent color</span>
              <div className="accent-row">
                {accentPalette.map((accent) => (
                  <button
                    type="button"
                    key={accent}
                    className={`accent-swatch ${form.accent === accent ? 'active' : ''}`}
                    style={{ backgroundColor: accent }}
                    onClick={() => updateField('accent', accent)}
                  />
                ))}
                <input
                  type="color"
                  value={form.accent}
                  onChange={(e) => updateField('accent', e.target.value)}
                  aria-label="Custom accent color"
                />
              </div>
            </div>

            <div className="field split-2">
              <label>
                <span>Font style</span>
                <select value={form.font} onChange={(e) => updateField('font', e.target.value)}>
                  <option value="serif">Serif</option>
                  <option value="sans">Sans</option>
                </select>
              </label>
              <label>
                <span>Mood</span>
                <select value={form.mode} onChange={(e) => updateField('mode', e.target.value)}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </label>
            </div>

            <div className="field split-2">
              <label>
                <span>Animation</span>
                <select value={form.animation} onChange={(e) => updateField('animation', e.target.value)}>
                  <option value="fade">Fade in</option>
                  <option value="zoom">Slow zoom</option>
                  <option value="float">Floating particles</option>
                  <option value="grain">Grain overlay</option>
                </select>
              </label>
              <label>
                <span>Expiry mode</span>
                <select
                  value={String(form.expiresInHours)}
                  onChange={(e) => updateField('expiresInHours', Number(e.target.value))}
                >
                  <option value="0">Never expires</option>
                  <option value="24">24-hour mode</option>
                </select>
              </label>
            </div>

            <div className="field split-2">
              <label>
                <span>Privacy</span>
                <select value={form.privacy} onChange={(e) => updateField('privacy', e.target.value)}>
                  <option value="public">Public</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="password">Password protected</option>
                </select>
              </label>

              {form.privacy === 'password' && (
                <label>
                  <span>Password</span>
                  <input
                    value={form.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Set a password"
                    required
                  />
                </label>
              )}
            </div>

            <div className="form-actions">
              <Link className="btn secondary" to="/dashboard">Cancel</Link>
              <button className="btn primary" type="submit">{editing ? 'Save postcard' : 'Generate link'}</button>
            </div>

            {savedSlug && <small className="save-note">Saved at /{savedSlug}</small>}
          </form>
        </section>
      </main>
    </div>
  );
}

export default CreatePage;

