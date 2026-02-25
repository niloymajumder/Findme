import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
import brandFavicon from '../images/favicon.ico';

function setBrandFavicon() {
  const faviconLink = document.querySelector('link[rel="icon"]') || document.createElement('link');
  faviconLink.setAttribute('rel', 'icon');
  faviconLink.setAttribute('type', 'image/x-icon');
  faviconLink.setAttribute('href', brandFavicon);

  if (!faviconLink.parentNode) {
    document.head.appendChild(faviconLink);
  }
}

setBrandFavicon();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
