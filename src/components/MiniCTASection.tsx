import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function MiniCTASection() {
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

  return (
    <section
      ref={sectionRef}
      className="bg-[#000022] py-12 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div
          className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Business team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#DCC383]/95 via-[#B68F40]/90 to-[#DCC383]/95" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-12 lg:px-16 py-12 md:py-16 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Headline */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000022] leading-tight">
                Bereit für ein Benefit-System, das wirklich funktioniert?
              </h3>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-[#000022]/80 leading-relaxed max-w-2xl mx-auto">
                In einer kostenfreien Analyse beleuchten wir Ihre bestehende Struktur und identifizieren klar, wo ungenutzte Chancen und steuerliche Vorteile liegen.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href="#contact-form-section"
                  onClick={(e) => handleScroll(e, 'contact-form-section')}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#000022] text-[#DCC383] font-semibold text-base rounded-lg shadow-xl transition-all duration-300 ease-out hover:shadow-2xl hover:scale-105 hover:bg-[#05052F] focus:outline-none focus:ring-4 focus:ring-[#000022]/50 active:scale-95"
                  aria-label="Jetzt kostenlose Analyse sichern"
                >
                  <span>Jetzt kostenlose Analyse sichern</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
