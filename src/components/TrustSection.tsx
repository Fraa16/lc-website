import { useState, useEffect, useRef } from 'react';
import { Shield, TrendingUp, Award, FileCheck, Users, Headphones } from 'lucide-react';

const TrustSection = () => {
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

  const trustCards = [
    {
      icon: Shield,
      title: 'Ein System, das zu Ihrem Unternehmen passt',
      description: 'Keine Standardlösungen. Wir entwickeln ein Modell, das Ihre Ziele, Ihre Mitarbeitenden und Ihre Strukturen berücksichtigt – praxisnah statt theoretisch.'
    },
    {
      icon: TrendingUp,
      title: 'Weniger Aufwand im Tagesgeschäft',
      description: 'HR muss nicht noch eine Baustelle haben. Deshalb übernehmen wir Administration, Kommunikation und Einführung so, dass Sie spürbar entlastet werden.'
    },
    {
      icon: Award,
      title: 'Spürbare Wirkung im Team',
      description: 'Weniger Ausfälle, mehr Zufriedenheit, bessere Bindung. Ein gutes Benefitsystem zeigt Wirkung – intern wie extern.'
    },
    {
      icon: FileCheck,
      title: 'Steuerliche Vorteile sinnvoll genutzt',
      description: 'Wir kombinieren die passenden Förderungen und steuerlichen Möglichkeiten, damit Ihr Budget dort ankommt, wo es am meisten bringt.'
    },
    {
      icon: Users,
      title: 'Funktioniert für kleine Teams und wachsende Unternehmen',
      description: 'Ob Selbstständige, kleine GmbH oder KMU: Das System bleibt flexibel und macht keinen Unterschied zwischen drei oder dreißig Mitarbeitenden.'
    },
    {
      icon: Headphones,
      title: 'Persönlich begleitet – digital unterstützt',
      description: 'Sie haben immer einen festen Ansprechpartner. Dazu klare Prozesse und digitale Tools, die Ihnen Arbeit abnehmen statt neue zu schaffen.'
    }
  ];

  const handleCTAClick = () => {
    const footer = document.getElementById('contact-form-section');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={sectionRef} className="bg-[#F4F3EE] py-20 md:py-28">
      <div className="max-w-7xl xl:max-w-[1280px] 2xl:max-w-[1400px] mx-auto px-6 md:px-8">
        {/* Label */}
        <div className="text-center mb-6">
          <span
            className={`inline-block text-xs md:text-sm uppercase tracking-wider font-semibold bg-gradient-to-r from-[#B68F40] to-[#DCC383] bg-clip-text text-transparent transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Ihre Vorteile auf einen Blick
          </span>
        </div>

        {/* Headlines */}
        <div className="text-center mb-6 space-y-2">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-normal text-[#000022] leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Struktur, die entlastet.
          </h2>

          <h3
            className={`text-3xl sm:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-[#B68F40] to-[#DCC383] bg-clip-text text-transparent leading-tight transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Expertise, die wirklich weiterhilft.
          </h3>
        </div>

        {/* Supporting paragraph */}
        <p
          className={`text-base md:text-lg text-[#000022]/80 leading-relaxed max-w-2xl mx-auto text-center mb-16 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Wenn ein Benefitsystem funktionieren soll, braucht es Klarheit, einfache Abläufe und jemanden, der Sie sicher durch den Prozess führt. Genau das liefern wir – maßgeschneidert, verständlich und mit Blick auf Ihren Unternehmensalltag.
        </p>

        {/* Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border border-[#B68F40]/20 p-6 md:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:ring-1 hover:ring-[#B68F40]/40 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${400 + index * 120}ms`
                }}
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#B68F40] to-[#DCC383] text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-[#000022] mb-3 leading-tight">
                  {card.title}
                </h4>
                <p className="text-sm md:text-base text-[#000022]/70 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div
          className={`text-center transition-all duration-700 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={handleCTAClick}
            className="group inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-semibold text-[#000022] bg-gradient-to-r from-[#B68F40] to-[#DCC383] rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(182,143,64,0.45)] hover:tracking-wide"
          >
            Jetzt Benefit-Potential prüfen lassen
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
