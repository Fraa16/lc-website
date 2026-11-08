/** 48000 → "48.000 €" */
export const formatEuro = (n: number) => `${n.toLocaleString('de-DE')} €`;

export const pad2 = (n: number) => String(n).padStart(2, '0');
