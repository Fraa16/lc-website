import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Container from './ui/Container';
import Eyebrow from './ui/Eyebrow';
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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Wenn Unternehmen nicht handeln …</Eyebrow>
            </Reveal>
            <Reveal delay={80} as="h2" className="mt-6 max-w-[18ch] text-display-md text-sheet-1">
              Stillstand wird teuer. Vor allem für Unternehmen.
            </Reveal>
          </div>

          <Reveal delay={140} as="p" className="max-w-measure text-body-lg text-sheet-2 lg:pb-2">
            Fehlende Struktur in Gesundheits- und Vorsorgeleistungen führt zu
            messbaren Nachteilen – für das Unternehmen und das gesamte Team.
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:gap-8">
          {consequences.map((card, index) => {
            const panelId = `${baseId}-consequence-${index}`;
            const isOpen = openIndex === index;

            return (
              <Reveal key={card.headline} as="li" delay={index * 90}>
                <article
                  className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-navy-raised transition-[border-color,box-shadow,transform] duration-300 ease-brand ${
                    isOpen
                      ? 'border-gold/40 lc-shadow-dark-2'
                      : 'border-white/10 hover:-translate-y-1 hover:border-gold/30 hover:lc-shadow-dark-2'
                  }`}
                >
                  <div className="relative h-44 overflow-hidden md:h-48">
                    <img
                      src={card.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={534}
                      className="h-full w-full object-cover transition-transform duration-700 ease-brand"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/55 to-navy-raised"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="text-title-lg font-bold text-sheet-1">{card.headline}</h3>

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
                      className="group/btn -my-2 mt-3 inline-flex min-h-[2.75rem] items-center gap-2 self-start rounded-lg py-2 text-body-sm font-medium text-gold-light transition-colors duration-200 hover:text-gold"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-gold/30 transition-colors duration-200 group-hover/btn:border-gold/60 group-hover/btn:bg-gold/10"
                      >
                        {isOpen ? (
                          <Minus className="h-3 w-3" strokeWidth={2} />
                        ) : (
                          <Plus className="h-3 w-3" strokeWidth={2} />
                        )}
                      </span>
                      {isOpen ? 'weniger anzeigen' : 'mehr dazu'}
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
