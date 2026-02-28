const STORAGE_KEY = 'echopost-postcards-v1';

export const RESERVED_SLUGS = new Set(['', 'create', 'dashboard']);

function nowISO() {
  return new Date().toISOString();
}

function parseJSON(value, fallback) {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
}

export function loadPostcards() {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const data = parseJSON(raw, []);
  return Array.isArray(data) ? data : [];
}

export function savePostcards(postcards) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(postcards));
}

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function createBaseSlug(recipient) {
  const base = slugify(recipient);
  return base ? `for-${base}` : `for-memory-${Date.now().toString().slice(-4)}`;
}

export function ensureUniqueSlug(baseSlug, postcards, ignoreId) {
  const cleanBase = slugify(baseSlug) || 'for-memory';
  const start = RESERVED_SLUGS.has(cleanBase) ? `${cleanBase}-card` : cleanBase;
  let candidate = start;
  let counter = 2;

  while (postcards.some((item) => item.slug === candidate && item.id !== ignoreId)) {
    candidate = `${start}-${counter}`;
    counter += 1;
  }

  return candidate;
}

export function buildPostcard(input, existing) {
  const id = existing?.id || crypto.randomUUID();
  const createdAt = existing?.createdAt || nowISO();
  const updatedAt = nowISO();
  return {
    id,
    createdAt,
    updatedAt,
    recipient: input.recipient || '',
    slug: input.slug || '',
    playlistUrl: input.playlistUrl || '',
    message: input.message || '',
    photoUrl: input.photoUrl || '',
    theme: input.theme || 'romantic',
    font: input.font || 'serif',
    accent: input.accent || '#D8A7B1',
    mode: input.mode || 'light',
    animation: input.animation || 'fade',
    typewriter: Boolean(input.typewriter),
    privacy: input.privacy || 'public',
    password: input.password || '',
    expiresInHours: input.expiresInHours || 0
  };
}

export function getStatus(postcard) {
  if (isExpired(postcard)) return 'Expired';
  if (postcard.privacy === 'password') return 'Private';
  if (postcard.privacy === 'unlisted') return 'Unlisted';
  return 'Active';
}

export function findBySlug(slug) {
  return loadPostcards().find((item) => item.slug === slug) || null;
}

export function findById(id) {
  return loadPostcards().find((item) => item.id === id) || null;
}

export function upsertPostcard(postcard) {
  const cards = loadPostcards();
  const index = cards.findIndex((item) => item.id === postcard.id);

  if (index === -1) cards.unshift(postcard);
  else cards[index] = postcard;

  savePostcards(cards);
  return cards;
}

export function deletePostcard(id) {
  const cards = loadPostcards().filter((item) => item.id !== id);
  savePostcards(cards);
  return cards;
}

export function duplicatePostcard(id) {
  const cards = loadPostcards();
  const source = cards.find((item) => item.id === id);
  if (!source) return cards;

  const clone = {
    ...source,
    id: crypto.randomUUID(),
    slug: ensureUniqueSlug(source.slug, cards),
    createdAt: nowISO(),
    updatedAt: nowISO()
  };

  cards.unshift(clone);
  savePostcards(cards);
  return cards;
}

export function isExpired(postcard) {
  const hours = Number(postcard.expiresInHours || 0);
  if (!hours) return false;
  const created = new Date(postcard.createdAt).getTime();
  const expiresAt = created + hours * 60 * 60 * 1000;
  return Date.now() > expiresAt;
}

export function getRemainingMs(postcard) {
  const hours = Number(postcard.expiresInHours || 0);
  if (!hours) return null;
  const created = new Date(postcard.createdAt).getTime();
  const expiresAt = created + hours * 60 * 60 * 1000;
  return Math.max(0, expiresAt - Date.now());
}

