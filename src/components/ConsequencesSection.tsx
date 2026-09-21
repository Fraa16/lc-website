import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Container from './ui/Container';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';

const consequences = [
  {
    image:
      'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
    headline: 'Produktivitätsverlust & steigende Fehlzeiten',
    text: 'Fehlende Gesundheitsleistungen führen zu bis zu 30 % mehr Ausfalltagen – ein direkter Kostenfaktor.',
    detailedText:
      'Ohne gezielte Gesundheitsmaßnahmen steigen krankheitsbedingte Ausfälle deutlich an. Studien zeigen, dass präventive Gesundheitsleistungen die Fehlzeiten um bis zu 30% reduzieren können. Jeder Fehltag kostet Unternehmen nicht nur direkte Lohnkosten, sondern auch Produktivitätsverluste, Vertretungsaufwand und potenzielle Projektverzögerungen. Ein strukturiertes Benefit-System mit Fokus auf Prävention und Früherkennung schützt sowohl die Mitarbeitergesundheit als auch die Unternehmensproduktivität nachhaltig.',
  },
  {
    image:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    headline: 'Nachteil im Wettbewerb um Fachkräfte',
    text: 'Ohne moderne Benefits verlieren Unternehmen im Recruiting – Bewerbende entscheiden sich für Arbeitgeber mit klaren Vorteilen.',
    detailedText:
      'Der Arbeitsmarkt ist hart umkämpft, besonders bei qualifizierten Fachkräften. Benefits sind längst kein Nice-to-have mehr, sondern ein entscheidender Faktor im Recruiting. Unternehmen, die keine attraktiven Zusatzleistungen bieten, verlieren Top-Talente an Wettbewerber. Eine aktuelle Studie zeigt: 67% der Bewerbenden bewerten Gesundheits- und Vorsorgeleistungen als wichtigen Entscheidungsfaktor. Wer hier nicht mithalten kann, zahlt mehr Gehalt oder rekrutiert zweitklassige Kandidaten.',
  },
  {
    image:
      'https://images.pexels.com/photos/4226263/pexels-photo-4226263.jpeg?auto=compress&cs=tinysrgb&w=800',
    headline: 'Geringere Mitarbeiterbindung',
    text: 'Fehlende Wertschätzung erhöht die Wechselbereitschaft – Know-how geht verloren, Kosten steigen.',
    detailedText:
      'Mitarbeiterfluktuation ist einer der größten Kostentreiber für Unternehmen. Die Kosten für Neueinstellung, Einarbeitung und den Verlust von Fachwissen können bis zu 150% eines Jahresgehalts betragen. Benefits signalisieren Wertschätzung und Fürsorge – zentrale Faktoren für langfristige Bindung. Studien belegen: Unternehmen mit umfassenden Benefit-Programmen haben eine um 38% niedrigere Fluktuationsrate. Investition in Benefits ist Investition in Kontinuität und Teamstabilität.',
  },
  {
    image:
      'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    headline: 'Unzureichende steuerliche Nutzung',
    text: 'Förderungen und steuerliche Vorteile bleiben ungenutzt – Geld, das im Unternehmen bleiben könnte.',
    detailedText:
      'Viele Unternehmen verschenken jährlich tausende Euro, weil sie steuerliche Freibeträge und Förderungen nicht nutzen. Bis zu 600€ pro Mitarbeitendem und Jahr können steueroptimiert für Gesundheitsleistungen eingesetzt werden – ohne Sozialabgaben, ohne Lohnsteuer. Hinzu kommen Sachbezüge, betriebliche Altersvorsorge und weitere Instrumente. Ein durchdachtes Benefit-System maximiert diese Vorteile, reduziert die Gesamtlohnkosten und erhöht gleichzeitig die Nettozuwendung für Mitarbeitende. Ungenutzte Potenziale sind verschenktes Geld.',
  },
];

export default function ConsequencesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section id="consequences-section" className="bg-navy py-section">
      <Container>
        <SectionHead
          eyebrow="Wenn Unternehmen nicht handeln …"
          title="Stillstand wird teuer. Vor allem für Unternehmen."
          aside="Fehlende Struktur in Gesundheits- und Vorsorgeleistungen führt zu messbaren Nachteilen – für das Unternehmen und das gesamte Team."
        />

        <ul className="mt-14 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:gap-8">
          {consequences.map((card, index) => {
            const panelId = `${baseId}-consequence-${index}`;
            const isOpen = openIndex === index;

            return (
              <Reveal key={card.headline} as="li" delay={index * 90}>
                <article
                  className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-navy-2 ring-1 ring-inset transition-[box-shadow,transform,--tw-ring-color] duration-300 ease-brand ${
                    isOpen
                      ? 'ring-gold/40 lc-shadow-dark-2'
                      : 'ring-white/10 hover:-translate-y-1 hover:ring-gold/30 hover:lc-shadow-dark-2'
                  }`}
                >
                  <div className="relative m-3 h-44 overflow-hidden rounded-2xl md:h-48">
                    <img
                      src={card.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={534}
                      className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-b from-navy/25 via-navy/45 to-navy/80"
                    />
                    {/* Floating index pill, as in the reference's cards. */}
                    <span className="lc-index absolute left-3 top-3 rounded-full bg-navy/80 px-3 py-1.5 text-meta text-gold-light backdrop-blur-md">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-7 pt-4 md:px-7">
                    <h3 className="text-display-sm text-sheet-1">{card.headline}</h3>

                    <p className="mt-3 text-body-sm text-sheet-3">{card.text}</p>

                    {/* 0fr → 1fr expands to the content's real height. The old
                        card swapped in an absolutely-positioned white panel
                        with its own inner scrollbar, which clipped the text
                        and had no way back out on a keyboard. */}
                    <div id={panelId} className="lc-collapse" data-open={isOpen} role="region">
                      <div>
                        <p className="mt-4 border-t border-white/10 pt-4 text-body-sm text-sheet-2">
                          {card.detailedText}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="mt-5 flex min-h-[2.75rem] w-full items-center justify-between gap-4 border-t border-white/10 pt-5 text-meta uppercase text-sheet-2 transition-colors duration-200 hover:text-gold-light"
                    >
                      {isOpen ? 'weniger anzeigen' : 'mehr dazu'}
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-gold-light transition-colors duration-300 ease-brand group-hover:border-gold group-hover:bg-gold group-hover:text-navy"
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" strokeWidth={2} />
                        ) : (
                          <Plus className="h-4 w-4" strokeWidth={2} />
                        )}
                      </span>
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
