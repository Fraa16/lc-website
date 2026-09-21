import React, { useEffect, useRef, useState } from 'react';
import { Check, Shield, TrendingUp, Users } from 'lucide-react';
import lcLogo from '../images/lc-logo-lang.webp';
import heroImage from '../images/cedrik-leibinn-hero.webp';

export default function HeroSection() {
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

  const benefits = [
    'Bis zu 30% weniger Fehlzeiten durch bessere Gesundheitsleistungen',
    'Messbar höhere Mitarbeiterbindung & stärkere Arbeitgebermarke',
    'Schlanke Implementierung ohne Mehraufwand für HR'
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="bg-[#000022] min-h-screen flex items-center py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`space-y-6 lg:space-y-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Label */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <img
                src={lcLogo}
                alt="Leibinn Consulting"
                className="h-7 md:h-8 w-auto object-contain"
              />
            </div>

            {/* Main Headlines */}
            <div className="space-y-3 lg:space-y-4">
              <h2
                className={`text-lg sm:text-xl lg:text-xl xl:text-2xl font-normal bg-gradient-to-r from-[#B68F40] to-[#DCC383] bg-clip-text text-transparent leading-relaxed transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Mehr Leistung im Team. Weniger Aufwand im Alltag.
              </h2>
              <h1
                className={`text-4xl sm:text-5xl lg:text-3xl xl:text-4xl font-bold text-[#F4F3EE] leading-[1.1] transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Das moderne Benefit-System für Unternehmen
              </h1>
            </div>

            {/* Subheadline */}
            <p
              className={`text-base sm:text-lg lg:text-lg text-[#F4F3EE]/80 leading-relaxed max-w-xl transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Wir bündeln die wirkungsvollsten Gesundheits- und Vorsorgebenefits in einem System — verwaltungsarm, steuerlich optimiert und flexibel für jedes Teammitglied nutzbar.
            </p>

            {/* Bullet Points */}
            <ul className="space-y-3 lg:space-y-3.5">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 text-[#F4F3EE] text-sm sm:text-base lg:text-lg transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${500 + index * 80}ms` }}
                >
                  <Check
                    className="w-5 h-5 lg:w-6 lg:h-6 text-[#B68F40] flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div
              className={`flex pt-2 lg:pt-4 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#contact-form-section"
                onClick={(e) => handleScroll(e, 'contact-form-section')}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#B68F40] to-[#DCC383] text-[#000022] font-semibold text-base rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-[#B68F40]/40 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-[#B68F40]/50 active:scale-[0.98]"
                aria-label="Jetzt Erstgespräch sichern"
              >
                {/* Hover brightness overlay */}
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 ease-out pointer-events-none" />

                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                {/* Button text with subtle letter-spacing on hover */}
                <span className="relative z-10 transition-all duration-300 ease-out group-hover:tracking-wide pointer-events-none">
                  Jetzt Erstgespräch sichern
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className={`relative transition-all duration-700 delay-500 lg:max-w-md lg:ml-auto pb-8 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative rounded-xl lg:rounded-2xl overflow-visible shadow-2xl">
              <img
                src={heroImage}
                alt="Modernes Büro-Team im Gespräch über Mitarbeiterbenefits und Gesundheitsvorsorge"
                className="w-full h-full object-cover aspect-[4/3] lg:aspect-[3/4] rounded-xl lg:rounded-2xl"
              />

              {/* Trust badges — stacked vertically, partially inside bottom-left */}
              <div className="absolute -bottom-4 left-4 flex flex-col gap-2">
                {[
                  { icon: Shield, label: 'Rechtssicher & GKV-konform' },
                  { icon: TrendingUp, label: 'Ø 28% weniger Fehlzeiten' },
                  { icon: Users, label: '100% digitale Verwaltung' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#000022]/90 backdrop-blur-sm border border-[#DCC383]/25 shadow-xl shadow-black/40 text-[#F4F3EE] w-fit"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#DCC383] flex-shrink-0" strokeWidth={1.75} />
                    <span className="text-[11px] font-medium leading-none">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
