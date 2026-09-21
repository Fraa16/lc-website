import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ConsequenceCard {
  image: string;
  headline: string;
  text: string;
  detailedText: string;
}

export default function ConsequencesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const consequences: ConsequenceCard[] = [
    {
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
      headline: 'Produktivitätsverlust & steigende Fehlzeiten',
      text: 'Fehlende Gesundheitsleistungen führen zu bis zu 30 % mehr Ausfalltagen – ein direkter Kostenfaktor.',
      detailedText: 'Ohne gezielte Gesundheitsmaßnahmen steigen krankheitsbedingte Ausfälle deutlich an. Studien zeigen, dass präventive Gesundheitsleistungen die Fehlzeiten um bis zu 30% reduzieren können. Jeder Fehltag kostet Unternehmen nicht nur direkte Lohnkosten, sondern auch Produktivitätsverluste, Vertretungsaufwand und potenzielle Projektverzögerungen. Ein strukturiertes Benefit-System mit Fokus auf Prävention und Früherkennung schützt sowohl die Mitarbeitergesundheit als auch die Unternehmensproduktivität nachhaltig.'
    },
    {
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      headline: 'Nachteil im Wettbewerb um Fachkräfte',
      text: 'Ohne moderne Benefits verlieren Unternehmen im Recruiting – Bewerbende entscheiden sich für Arbeitgeber mit klaren Vorteilen.',
      detailedText: 'Der Arbeitsmarkt ist hart umkämpft, besonders bei qualifizierten Fachkräften. Benefits sind längst kein Nice-to-have mehr, sondern ein entscheidender Faktor im Recruiting. Unternehmen, die keine attraktiven Zusatzleistungen bieten, verlieren Top-Talente an Wettbewerber. Eine aktuelle Studie zeigt: 67% der Bewerbenden bewerten Gesundheits- und Vorsorgeleistungen als wichtigen Entscheidungsfaktor. Wer hier nicht mithalten kann, zahlt mehr Gehalt oder rekrutiert zweitklassige Kandidaten.'
    },
    {
      image: 'https://images.pexels.com/photos/4226263/pexels-photo-4226263.jpeg?auto=compress&cs=tinysrgb&w=800',
      headline: 'Geringere Mitarbeiterbindung',
      text: 'Fehlende Wertschätzung erhöht die Wechselbereitschaft – Know-how geht verloren, Kosten steigen.',
      detailedText: 'Mitarbeiterfluktuation ist einer der größten Kostentreiber für Unternehmen. Die Kosten für Neueinstellung, Einarbeitung und den Verlust von Fachwissen können bis zu 150% eines Jahresgehalts betragen. Benefits signalisieren Wertschätzung und Fürsorge – zentrale Faktoren für langfristige Bindung. Studien belegen: Unternehmen mit umfassenden Benefit-Programmen haben eine um 38% niedrigere Fluktuationsrate. Investition in Benefits ist Investition in Kontinuität und Teamstabilität.'
    },
    {
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      headline: 'Unzureichende steuerliche Nutzung',
      text: 'Förderungen und steuerliche Vorteile bleiben ungenutzt – Geld, das im Unternehmen bleiben könnte.',
      detailedText: 'Viele Unternehmen verschenken jährlich tausende Euro, weil sie steuerliche Freibeträge und Förderungen nicht nutzen. Bis zu 600€ pro Mitarbeitendem und Jahr können steueroptimiert für Gesundheitsleistungen eingesetzt werden – ohne Sozialabgaben, ohne Lohnsteuer. Hinzu kommen Sachbezüge, betriebliche Altersvorsorge und weitere Instrumente. Ein durchdachtes Benefit-System maximiert diese Vorteile, reduziert die Gesamtlohnkosten und erhöht gleichzeitig die Nettozuwendung für Mitarbeitende. Ungenutzte Potenziale sind verschenktes Geld.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="consequences-section"
      className="bg-[#000022] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        {/* Glassmorphism Elevated Card */}
        <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-16">
        {/* Header Content */}
        <div className="mb-12 md:mb-16">
          {/* Label */}
          <div
            className={`mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block text-[#DCC383] text-xs md:text-sm font-medium uppercase tracking-wider">
              Wenn Unternehmen nicht handeln …
            </span>
          </div>

          {/* Title and Body in Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Title */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-3xl xl:text-4xl font-bold text-[#F4F3EE] leading-[1.1] transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Stillstand wird teuer. Vor allem für Unternehmen.
            </h1>

            {/* Right Column - Body Text */}
            <p
              className={`text-base sm:text-lg text-[#F4F3EE]/80 leading-relaxed transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Fehlende Struktur in Gesundheits- und Vorsorgeleistungen führt zu messbaren Nachteilen – für das Unternehmen und das gesamte Team.
            </p>
          </div>
        </div>

        {/* 2x2 Grid of Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {consequences.map((card, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div
                className={`group relative bg-[#05052F] border border-white/6 rounded-2xl overflow-hidden h-full transition-all duration-300 ease-out cursor-pointer ${
                  expandedCard === index ? '' : 'hover:-translate-y-1 hover:border-[#B68F40]/40 hover:shadow-xl hover:shadow-[#B68F40]/15'
                }`}
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              >
                {/* Image with Overlay */}
                <div className="relative h-44 md:h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.headline}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Reduced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#000022]/30 via-[#000022]/50 to-[#05052F]" />
                </div>

                {/* Expanded White Overlay */}
                <div
                  className={`absolute inset-0 bg-white transition-opacity duration-500 ease-out ${
                    expandedCard === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="h-full overflow-y-auto p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-[#000022] leading-tight mb-4">
                      {card.headline}
                    </h3>
                    <p className="text-sm md:text-base text-[#000022]/80 leading-relaxed">
                      {card.detailedText}
                    </p>
                  </div>
                </div>

                {/* Text Content */}
                <div className={`p-5 md:p-6 space-y-3 transition-opacity duration-300 ${
                  expandedCard === index ? 'opacity-0' : 'opacity-100'
                }`}>
                  <h3 className="text-lg md:text-xl font-bold text-[#F4F3EE] leading-tight">
                    {card.headline}
                  </h3>
                  <p className="text-sm text-[#F4F3EE]/70 leading-relaxed">
                    {card.text}
                  </p>
                  <button
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#DCC383] hover:text-[#B68F40] transition-colors duration-200 group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCard(index);
                    }}
                  >
                    <span>mehr dazu</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
