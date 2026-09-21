import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openLeftIndex, setOpenLeftIndex] = useState<number | null>(null);
  const [openRightIndex, setOpenRightIndex] = useState<number | null>(null);
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

  const leftColumnFAQs: FAQItem[] = [
    {
      question: 'Wie viel interner Aufwand entsteht wirklich für unser Unternehmen?',
      answer: 'In den meisten Projekten liegt der interne Aufwand bei wenigen Stunden. Wir übernehmen Einrichtung, Kommunikation, Onboarding und regelmäßige Updates. Ihre HR-Abteilung muss weder Anträge prüfen noch Fristen überwachen – das läuft vollständig über uns.'
    },
    {
      question: 'Können alle Mitarbeitenden teilnehmen – auch Minijobber, Teilzeitkräfte oder Teams im Außendienst?',
      answer: 'Ja. Das System ist so aufgebaut, dass alle Mitarbeitenden eingebunden werden können – unabhängig von Arbeitszeit, Standort oder Vertragsmodell. Je nach Struktur entwickeln wir unterschiedliche Benefit-Pakete, damit es für alle fair und sinnvoll bleibt.'
    },
    {
      question: 'Wie läuft die Implementierung praktisch ab?',
      answer: 'Wir starten mit einer kurzen Analyse, definieren anschließend das passende Leistungspaket und kümmern uns danach um die gesamte technische und organisatorische Umsetzung. Sie müssen keine neue Software einführen – alles funktioniert parallel zu Ihren bestehenden Prozessen.'
    },
    {
      question: 'Welche steuerlichen Vorteile können wir konkret nutzen?',
      answer: 'Viele Benefits lassen sich steuer- und sozialversicherungsbegünstigt gestalten. In der Praxis führt das häufig zu spürbaren Einsparungen, sowohl für das Unternehmen als auch für Mitarbeitende. Im Erstgespräch zeigen wir Ihnen Ihr konkretes Potenzial.'
    }
  ];

  const rightColumnFAQs: FAQItem[] = [
    {
      question: 'Müssen wir bestehende Verträge ablösen oder können diese integriert werden?',
      answer: 'Bestehende Regelungen können in vielen Fällen eingebunden oder sauber migriert werden. Wir prüfen, welche Lösungen sinnvoll sind, vermeiden Doppelstrukturen und sorgen für eine konsistente und transparente Struktur.'
    },
    {
      question: 'Wie stellen wir sicher, dass die Benefits wirklich genutzt werden?',
      answer: 'Ein gutes Benefitsystem lebt von klarer Kommunikation. Deshalb übernehmen wir die komplette Mitarbeiterinformation – digital, verständlich und regelmäßig aktualisiert. Das sorgt für Transparenz und echte Nutzung.'
    },
    {
      question: 'Wie wird die Administration reduziert – und was übernehmen Sie konkret?',
      answer: 'Wir übernehmen die gesamte Verwaltung: Vertragsupdates, Fristen, Anpassungen, Mitarbeiterein- und -austritte sowie Dokumentation. Ihr Team wird deutlich entlastet und gewinnt Zeit für strategische Themen.'
    },
    {
      question: 'Was passiert bei Fluktuation oder Veränderungen – z. B. neue Mitarbeitende, Elternzeit oder Austritt?',
      answer: 'Das System passt sich automatisch an. Neue Mitarbeitende werden unkompliziert eingegliedert, bei Austritten werden Leistungen beendet oder übertragen – wir stellen sicher, dass rechtlich und finanziell alles sauber geregelt ist.'
    }
  ];

  const toggleLeftItem = (index: number) => {
    setOpenLeftIndex(openLeftIndex === index ? null : index);
  };

  const toggleRightItem = (index: number) => {
    setOpenRightIndex(openRightIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq-section" className="bg-[#F4F3EE] py-20 md:py-28">
      <div className="max-w-7xl xl:max-w-[1280px] 2xl:max-w-[1400px] mx-auto px-6 md:px-8">
        {/* Label */}
        <div className="text-center mb-6">
          <span
            className={`inline-block text-xs md:text-sm uppercase tracking-wider font-semibold bg-gradient-to-r from-[#B68F40] to-[#DCC383] bg-clip-text text-transparent transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Häufige Fragen
          </span>
        </div>

        {/* Title */}
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000022] leading-tight text-center mb-4 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Klarheit für Ihre Entscheidung
        </h2>

        {/* Subtitle */}
        <p
          className={`text-base md:text-lg text-[#000022]/80 leading-relaxed text-center max-w-3xl mx-auto mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Antworten auf die Fragen, die Entscheider wirklich beschäftigen.
        </p>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumnFAQs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border border-[#B68F40]/20 shadow-sm hover:shadow-md transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${300 + index * 100}ms`
                }}
              >
                <button
                  onClick={() => toggleLeftItem(index)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                >
                  <span className="text-base md:text-lg font-semibold text-[#000022] leading-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B68F40] flex-shrink-0 mt-1 transition-transform duration-300 ${
                      openLeftIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openLeftIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-sm md:text-base text-[#000022]/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumnFAQs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border border-[#B68F40]/20 shadow-sm hover:shadow-md transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${300 + index * 100}ms`
                }}
              >
                <button
                  onClick={() => toggleRightItem(index)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                >
                  <span className="text-base md:text-lg font-semibold text-[#000022] leading-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B68F40] flex-shrink-0 mt-1 transition-transform duration-300 ${
                      openRightIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openRightIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-sm md:text-base text-[#000022]/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
