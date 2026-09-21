export interface FAQItem {
  question: string;
  answer: string;
}

/** Shared by the FAQ section and the FAQPage JSON-LD, so the two can't drift. */
export const faqs: FAQItem[] = [
  {
    question: 'Wie viel interner Aufwand entsteht wirklich für unser Unternehmen?',
    answer:
      'In den meisten Projekten liegt der interne Aufwand bei wenigen Stunden. Wir übernehmen Einrichtung, Kommunikation, Onboarding und regelmäßige Updates. Ihre HR-Abteilung muss weder Anträge prüfen noch Fristen überwachen – das läuft vollständig über uns.',
  },
  {
    question:
      'Können alle Mitarbeitenden teilnehmen – auch Minijobber, Teilzeitkräfte oder Teams im Außendienst?',
    answer:
      'Ja. Das System ist so aufgebaut, dass alle Mitarbeitenden eingebunden werden können – unabhängig von Arbeitszeit, Standort oder Vertragsmodell. Je nach Struktur entwickeln wir unterschiedliche Benefit-Pakete, damit es für alle fair und sinnvoll bleibt.',
  },
  {
    question: 'Wie läuft die Implementierung praktisch ab?',
    answer:
      'Wir starten mit einer kurzen Analyse, definieren anschließend das passende Leistungspaket und kümmern uns danach um die gesamte technische und organisatorische Umsetzung. Sie müssen keine neue Software einführen – alles funktioniert parallel zu Ihren bestehenden Prozessen.',
  },
  {
    question: 'Welche steuerlichen Vorteile können wir konkret nutzen?',
    answer:
      'Viele Benefits lassen sich steuer- und sozialversicherungsbegünstigt gestalten. In der Praxis führt das häufig zu spürbaren Einsparungen, sowohl für das Unternehmen als auch für Mitarbeitende. Im Erstgespräch zeigen wir Ihnen Ihr konkretes Potenzial.',
  },
  {
    question: 'Müssen wir bestehende Verträge ablösen oder können diese integriert werden?',
    answer:
      'Bestehende Regelungen können in vielen Fällen eingebunden oder sauber migriert werden. Wir prüfen, welche Lösungen sinnvoll sind, vermeiden Doppelstrukturen und sorgen für eine konsistente und transparente Struktur.',
  },
  {
    question: 'Wie stellen wir sicher, dass die Benefits wirklich genutzt werden?',
    answer:
      'Ein gutes Benefitsystem lebt von klarer Kommunikation. Deshalb übernehmen wir die komplette Mitarbeiterinformation – digital, verständlich und regelmäßig aktualisiert. Das sorgt für Transparenz und echte Nutzung.',
  },
  {
    question: 'Wie wird die Administration reduziert – und was übernehmen Sie konkret?',
    answer:
      'Wir übernehmen die gesamte Verwaltung: Vertragsupdates, Fristen, Anpassungen, Mitarbeiterein- und -austritte sowie Dokumentation. Ihr Team wird deutlich entlastet und gewinnt Zeit für strategische Themen.',
  },
  {
    question:
      'Was passiert bei Fluktuation oder Veränderungen – z. B. neue Mitarbeitende, Elternzeit oder Austritt?',
    answer:
      'Das System passt sich automatisch an. Neue Mitarbeitende werden unkompliziert eingegliedert, bei Austritten werden Leistungen beendet oder übertragen – wir stellen sicher, dass rechtlich und finanziell alles sauber geregelt ist.',
  },
];
