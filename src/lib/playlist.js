export function detectPlaylistProvider(url) {
  const value = (url || '').toLowerCase();
  if (value.includes('spotify.com/playlist/')) return 'Spotify';
  if (value.includes('music.apple.com')) return 'Apple Music';
  return null;
}

export function getEmbedUrl(url) {
  const clean = (url || '').trim();
  if (!clean) return null;

  try {
    const parsed = new URL(clean);

    if (parsed.hostname.includes('spotify.com')) {
      const match = parsed.pathname.match(/playlist\/([a-zA-Z0-9]+)/);
      if (!match?.[1]) return null;
      return `https://open.spotify.com/embed/playlist/${match[1]}?utm_source=generator`;
    }

    if (parsed.hostname.includes('music.apple.com')) {
      const embedHost = parsed.hostname.replace('music.apple.com', 'embed.music.apple.com');
      return `https://${embedHost}${parsed.pathname}${parsed.search}`;
    }

    return null;
  } catch {
    return null;
  }
}

