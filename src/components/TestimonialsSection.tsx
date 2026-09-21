import { useState, useEffect, useRef } from 'react';
import smImg from '../images/sm.jpg';
import sm2Img from '../images/sm-2.jpg';
import sm1Img from '../images/sm-1.jpg';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Winsome Okafor',
    role: 'Lehrerin',
    quote:
      'Cedrik überzeugt durch eine herausragende Beratung, hohe Kundenorientierung und tiefes Fachwissen. Seine Vertrauenswürdigkeit und Zuverlässigkeit machen ihn zu einem idealen Ansprechpartner für alle, die eine professionelle und individuelle Beratung suchen. Kleine Extras wie eine regelmäßige Überprüfung der bestehenden Verträge zeigen, dass er auch langfristig an einer optimalen Absicherung seiner Kunden interessiert ist.',
    image: smImg,
  },
  {
    name: 'Tom Müller',
    role: 'Selbstständiger Tätowierer',
    quote:
      'Dank der Beratung von Herrn Leibinn konnte ich mich voll und ganz auf mein Kerngeschäft konzentrieren, ohne mir Sorgen um meinen Vermögensaufbau machen zu müssen. Als Selbstständiger ist Zeit für mich das wertvollste Gut, und durch die klaren, effizienten Strategien, die er für mich entwickelt hat, wurde mein finanzieller Fortschritt gesichert.',
    image: sm2Img,
  },
  {
    name: 'Luka Šilić',
    role: 'Anwalt',
    quote:
      'Als Anwalt bin ich es gewohnt, komplexe Sachverhalte zu durchdringen und sichere Entscheidungen zu treffen. Bei meinen Investments und Versicherungen verlasse ich mich deshalb voll und ganz auf die Expertise von Herrn Leibinn. Dank der umfassenden Beratung und maßgeschneiderten Lösungen fühle ich mich bestens abgesichert und weiß, dass meine finanziellen Ziele in guten Händen sind.',
    image: sm1Img,
  },
];

const TestimonialsSection = () => {
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
            Kundenstimmen
          </span>
        </div>

        {/* Headlines */}
        <div className="text-center mb-4 space-y-2">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-normal text-[#000022] leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Was unsere Kunden sagen.
          </h2>
          <h3
            className={`text-3xl sm:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-[#B68F40] to-[#DCC383] bg-clip-text text-transparent leading-tight transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Echte Ergebnisse. Echte Menschen.
          </h3>
        </div>

        {/* Subtext */}
        <p
          className={`text-base md:text-lg text-[#000022]/80 leading-relaxed max-w-2xl mx-auto text-center mb-16 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Von der Lehrerin bis zum Anwalt – unsere Kunden kommen aus unterschiedlichen Lebenssituationen und haben eines gemeinsam: Sie vertrauen auf klare, individuelle Beratung.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border border-[#B68F40]/20 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:ring-1 hover:ring-[#B68F40]/40 transition-all duration-300 flex flex-col ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Quote mark */}
              <div className="px-8 pt-8 pb-0">
                <span
                  className="block text-6xl font-serif leading-none bg-gradient-to-r from-[#B68F40] to-[#DCC383] bg-clip-text text-transparent select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
              </div>

              {/* Quote body */}
              <div className="px-8 pt-2 pb-6 flex-1">
                <p className="text-sm md:text-base text-[#000022]/75 leading-relaxed">
                  {t.quote}
                </p>
              </div>

              {/* Divider */}
              <div className="mx-8 h-px bg-gradient-to-r from-[#B68F40]/30 to-[#DCC383]/10" />

              {/* Author */}
              <div className="px-8 py-6 flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#B68F40]/30 flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-[#000022]">{t.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
