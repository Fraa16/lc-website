import React, { useEffect, useRef, useState } from 'react';
import { Layers, Percent, Heart, Workflow } from 'lucide-react';

export default function BenefitSystemSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  const pillars = [
    {
      icon: Layers,
      title: 'Klare Struktur & Transparenz',
      description: 'Alle Benefits in einem strukturierten, verständlichen System — für HR, Führungskräfte und Mitarbeitende sofort nachvollziehbar.'
    },
    {
      icon: Percent,
      title: 'Steuerlich optimierte Vorteile',
      description: 'Wir nutzen alle relevanten Fördermodelle und Steuervorteile, damit Leistungen maximal wirksam und budgeteffizient eingesetzt werden.'
    },
    {
      icon: Heart,
      title: 'Moderne Gesundheits- & Vorsorgeleistungen',
      description: 'Ein starkes Portfolio aus Gesundheits-, Präventions- und Vorsorgebausteinen — flexibel für jedes Teammitglied nutzbar.'
    },
    {
      icon: Workflow,
      title: 'Digitale & schlanke Prozesse',
      description: 'Von Anmeldung bis Abrechnung: Digitale Abläufe reduzieren den Aufwand für HR und steigern die Nutzung durch Mitarbeitende.'
    }
  ];

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact-form-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="benefit-system"
      className="bg-[#F4F3EE] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-8">
        {/* Header Area */}
        <div className="mb-16 md:mb-20">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block text-[#B68F40] text-xs md:text-sm font-medium uppercase tracking-wider mb-4">
              Das moderne Benefit-System
            </span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl lg:text-3xl xl:text-4xl font-bold text-[#000022] leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Ein System, das für jedes Unternehmen funktioniert.
          </h1>

          <p
            className={`text-base sm:text-lg lg:text-xl text-[#000022]/80 leading-relaxed max-w-4xl transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Wir verbinden die wirkungsvollsten Gesundheits- und Vorsorgeleistungen in einem System — klar strukturiert, steuerlich optimiert und nachhaltig wirksam.
          </p>
        </div>

        {/* System Pillars - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 md:mb-20">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white border border-[#000022]/10 rounded-2xl lg:rounded-3xl p-8 lg:p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#B68F40]/50 hover:shadow-2xl hover:shadow-[#B68F40]/10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 120}ms` }}
              >
                {/* Premium Badge Line */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#DCC383]/40 to-transparent"></div>

                {/* Icon Container */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-[#B68F40]/20 to-[#DCC383]/20 border border-[#DCC383]/30 transition-all duration-300 group-hover:border-[#DCC383]/50 group-hover:shadow-lg group-hover:shadow-[#DCC383]/20">
                    <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-[#B68F40]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-[#000022] mb-4 leading-tight">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm lg:text-base text-[#000022]/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Area */}
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000022] mb-4">
            Bereit für ein funktionierendes Benefit-System?
          </h3>

          <p className="text-base sm:text-lg text-[#000022]/70 mb-8 leading-relaxed">
            Wir analysieren Ihre aktuelle Situation kostenlos und zeigen konkrete Potenziale auf.
          </p>

          <button
            onClick={handleCTAClick}
            className="inline-flex items-center justify-center px-8 py-4 text-base lg:text-lg font-semibold text-white bg-gradient-to-r from-[#B68F40] to-[#DCC383] rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#DCC383]/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DCC383]/50 focus:ring-offset-2 focus:ring-offset-[#F4F3EE]"
          >
            Jetzt kostenlose Analyse sichern
          </button>
        </div>
      </div>
    </section>
  );
}
