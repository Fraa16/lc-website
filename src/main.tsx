import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ImpressumPage from './pages/ImpressumPage.tsx';
// Self-hosted, so no visitor IP reaches Google.
import '@fontsource-variable/instrument-sans';
import './index.css';

// Two routes only, so no router library: the legal page is picked by path.
// vercel.json rewrites every path to index.html.
const path = window.location.pathname.replace(/\/+$/, '') || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{path === '/impressum' ? <ImpressumPage /> : <App />}</StrictMode>
);
