import { faqs } from '../data/faqs';

const siteUrl = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '');

/**
 * Organization + FAQPage JSON-LD.
 *
 * The FAQ answers are read from the same module the section renders, so the
 * markup can never describe questions the page doesn't actually show.
 */
export default function StructuredData() {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      name: 'Leibinn Consulting',
      description: 'Strukturierte Benefit- & Vorsorgekonzepte für Unternehmen',
      ...(siteUrl && { url: siteUrl, logo: `${siteUrl}/icon-512.png` }),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
