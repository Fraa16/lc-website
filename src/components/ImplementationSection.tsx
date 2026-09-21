import React, { useEffect, useRef, useState } from 'react';
import { Search, Cog, Users } from 'lucide-react';

export default function ImplementationSection() {
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

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Analyse & Potenzialcheck',
      description: 'Wir prüfen bestehende Strukturen, steuerliche Möglichkeiten und zeigen klar auf, welche Benefits wirklich Wirkung erzielen.'
    },
    {
      number: '02',
      icon: Cog,
      title: 'System einrichten',
      description: 'Einbindung der passenden Gesundheits- und Vorsorgebausteine, zentrale Verwaltung, digitale Prozesse – alles aus einer Hand.'
    },
    {
      number: '03',
      icon: Users,
      title: 'Mitarbeitende onboarden',
      description: 'Wir übernehmen Kommunikation & Aufklärung, erklären Leistungen verständlich und sorgen für maximale Nutzung im Team.'
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
      id="implementation"
      className="bg-[#F4F3EE] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 md:px-8">
        {/* Header Area */}
        <div className="mb-16 md:mb-20 text-center lg:text-left">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block text-[#B68F40] text-xs md:text-sm font-medium uppercase tracking-wider mb-4">
              Unser Ablauf
            </span>
          </div>

          <h2
            className={`text-lg sm:text-xl lg:text-xl xl:text-2xl font-normal text-[#B68F40] leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Schnell eingeführt.
          </h2>

          <h1
            className={`text-4xl sm:text-5xl lg:text-3xl xl:text-4xl font-bold text-[#000022] leading-tight transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Und von Anfang an wirksam.
          </h1>

          <p
            className={`text-base sm:text-lg lg:text-xl text-[#000022]/80 leading-relaxed max-w-4xl mx-auto lg:mx-0 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Wir übernehmen die komplette Implementierung – von der Analyse bis zur laufenden Betreuung. Für Sie bleibt der Aufwand minimal.
          </p>
        </div>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white border border-[#000022]/10 rounded-3xl p-8 md:p-10 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#B68F40]/50 hover:shadow-2xl hover:shadow-[#B68F40]/20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 120}ms` }}
              >
                {/* Step Number Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#B68F40]/20 to-[#DCC383]/20 border border-[#DCC383]/40 text-[#DCC383] text-sm font-bold">
                    {step.number}
                  </span>
                </div>

                {/* Icon Container */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-[#B68F40]/20 to-[#DCC383]/20 border border-[#DCC383]/30 transition-all duration-300 group-hover:border-[#DCC383]/60 group-hover:shadow-lg group-hover:shadow-[#DCC383]/20">
                    <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-[#B68F40]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-[#000022] mb-4 leading-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm lg:text-base text-[#000022]/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Block */}
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000022] mb-4">
            Wie könnte Ihr Benefit-System aussehen?
          </h3>

          <p className="text-base sm:text-lg text-[#000022]/70 mb-8 leading-relaxed">
            Wir zeigen Ihnen konkrete Szenarien für Ihre Unternehmensgröße.
          </p>

          <button
            onClick={handleCTAClick}
            className="inline-flex items-center justify-center px-8 py-4 text-base lg:text-lg font-semibold text-white bg-gradient-to-r from-[#B68F40] to-[#DCC383] rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#DCC383]/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DCC383]/50 focus:ring-offset-2 focus:ring-offset-[#F4F3EE]"
          >
            Kostenlose Analyse anfordern
          </button>
        </div>
      </div>
    </section>
  );
}
