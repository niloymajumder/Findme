# Findme

Findme is a playlist-powered digital postcard platform.

Users can create a shareable page that combines:
- A Spotify or Apple Music playlist
- A personal message
- A featured memory photo
- Theme, mood, accent, and animation controls
- Privacy settings (public, unlisted, password protected)
- Optional 24-hour expiry mode

## Routes

- `/` landing page
- `/create` postcard builder with live preview
- `/dashboard` manage created postcards
- `/:slug` public postcard view

## Tech

- React + Vite
- React Router
- LocalStorage for postcard persistence

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
