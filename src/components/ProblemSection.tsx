import React, { useEffect, useRef, useState } from 'react';
import { Layers, FileText, Users, EyeOff, Percent } from 'lucide-react';

interface ProblemCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function ProblemSection() {
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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const problems: ProblemCard[] = [
    {
      icon: Layers,
      title: 'Zu viel Komplexität',
      description: 'Tarife, Anbieter, Fristen – ohne klares System kostet jedes Benefit-Projekt mehr Zeit, Nerven und Budget als geplant.'
    },
    {
      icon: FileText,
      title: 'Hoher Administrationsaufwand',
      description: 'HR und Geschäftsführung hängen in Excel-Listen fest, statt sich auf Strategie und Führung zu konzentrieren.'
    },
    {
      icon: Users,
      title: 'Fehlende Attraktivität im Wettbewerb',
      description: 'Benefits sind vorhanden, aber wenig sichtbar oder nicht auf die Bedürfnisse der Mitarbeitenden abgestimmt.'
    },
    {
      icon: EyeOff,
      title: 'Keine Transparenz für Mitarbeitende',
      description: 'Mitarbeitende wissen nicht, was ihnen zusteht, wo sie Leistungen abrufen oder welche Vorteile tatsächlich bestehen.'
    },
    {
      icon: Percent,
      title: 'Keine steuerliche Optimierung',
      description: 'Potenziale aus Förderungen und steuerlichen Vorteilen bleiben ungenutzt – Geld, das im Unternehmen liegen bleibt.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="problem-section"
      className="bg-[#000022] py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Label */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="inline-block text-[#DCC383] text-xs md:text-sm font-medium uppercase tracking-wider">
                Was Unternehmen heute herausfordert
              </span>
            </div>

            {/* Headline */}
            <div
              className={`space-y-2 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-normal bg-gradient-to-r from-[#B68F40] to-[#DCC383] bg-clip-text text-transparent leading-relaxed">
                Benefits sind relevanter denn je.
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-4xl font-bold text-[#F4F3EE] leading-[1.1]">
                Doch kaum ein Unternehmen hat ein funktionierendes System.
              </h1>
            </div>

            {/* Supporting Paragraph */}
            <p
              className={`text-base sm:text-lg text-[#F4F3EE]/80 leading-relaxed max-w-xl transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Viele Unternehmen wissen, dass attraktive Benefits die Mitarbeiterbindung, Gesundheit und Produktivität steigern. In der Praxis scheitert es jedoch oft an Zeit, Know-how und der richtigen Struktur – aus guten Ideen wird kein verlässliches System.
            </p>

            {/* CTA Button */}
            <div
              className={`flex pt-2 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#contact-form-section"
                onClick={(e) => handleScroll(e, 'contact-form-section')}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#B68F40] to-[#DCC383] text-[#000022] font-semibold text-base rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-[#B68F40]/40 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-[#B68F40]/50 active:scale-[0.98]"
                aria-label="Kostenlose Analyse anfordern"
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 ease-out pointer-events-none" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                <span className="relative z-10 transition-all duration-300 ease-out group-hover:tracking-wide pointer-events-none">
                  Kostenlose Analyse anfordern
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Problem Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 content-start">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${index === 4 ? 'sm:col-span-2 sm:max-w-md sm:mx-auto' : ''}`}
                  style={{ transitionDelay: `${500 + index * 80}ms` }}
                >
                  <div className="group relative bg-[#05052F] border border-white/6 rounded-2xl p-5 md:p-6 h-full transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#B68F40]/40 hover:shadow-lg hover:shadow-[#B68F40]/10">
                    {/* Icon */}
                    <div className="mb-4">
                      <Icon className="w-6 h-6 text-[#DCC383]" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-semibold text-[#F4F3EE] mb-2.5 leading-snug">
                      {problem.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-[#F4F3EE]/70 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
