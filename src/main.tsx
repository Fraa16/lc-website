import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import App from './App.tsx';
import ImpressumPage from './pages/ImpressumPage.tsx';
import { initConsent } from './lib/consent';
// Self-hosted, so no visitor IP reaches Google.
import '@fontsource-variable/instrument-sans';
import './index.css';

// Cookie-free visitor statistics (no consent needed), as on the main site.
inject();

// Cookie banner, Meta Pixel and LinkedIn Insight Tag (only after consent).
// IDs come from the Vercel project settings; without them nothing is loaded.
initConsent({
  site: 'lp2',
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID,
  linkedinPartnerId: import.meta.env.VITE_LINKEDIN_PARTNER_ID,
  linkedinConversionLead: import.meta.env.VITE_LINKEDIN_CONVERSION_LEAD,
  linkedinConversionBooking: import.meta.env.VITE_LINKEDIN_CONVERSION_BOOKING,
  leadsApiUrl: import.meta.env.VITE_LEADS_API_URL,
});

// Two routes only, so no router library: the legal page is picked by path.
// vercel.json rewrites every path to index.html.
const path = window.location.pathname.replace(/\/+$/, '') || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{path === '/impressum' ? <ImpressumPage /> : <App />}</StrictMode>
);
