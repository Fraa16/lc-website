import LegalLayout from '../components/LegalLayout';
import PrivacyContent from '../components/PrivacyContent';

/*
 * The text is shared by all Leibinn sites: src/lib/privacy.ts (same file everywhere).
 * This page only says which features the site has. Google Analytics 4 and Google Ads
 * appear once their IDs are set, exactly like in the cookie banner.
 */
const has = (v?: string) => Boolean(v?.trim());

export default function DatenschutzPage() {
  return (
    <LegalLayout
      title={'Datenschutz\u00ADerklärung' /* soft hyphen: breaks as Datenschutz-erklärung on small phones */}
      intro="Welche Daten wir verarbeiten, welche Dienste wir einsetzen und welche Rechte Sie haben."
    >
      <PrivacyContent
        form="callback"
        calendly={true}
        ga4={has(import.meta.env.VITE_GA4_ID)}
        googleAds={has(import.meta.env.VITE_GOOGLE_ADS_ID)}
      />
    </LegalLayout>
  );
}
