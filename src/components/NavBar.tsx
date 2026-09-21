import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Herausforderung', id: 'problem-section' },
  { label: 'Das System', id: 'benefit-system' },
  { label: 'Umsetzung', id: 'implementation' },
  { label: 'FAQ', id: 'faq-section' },
];

export default function NavBar() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Seitennavigation"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-1.5 px-2 py-2 rounded-full bg-[#000022]/90 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/40">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'text-[#000022]'
                  : 'text-[#F4F3EE]/70 hover:text-[#F4F3EE]'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B68F40] to-[#DCC383]" />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}

        <div className="w-px h-5 bg-white/15 mx-1" aria-hidden="true" />

        <button
          onClick={() => scrollTo('contact-form-section')}
          className="relative overflow-hidden flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold text-[#000022] bg-gradient-to-r from-[#B68F40] to-[#DCC383] transition-all duration-200 hover:shadow-lg hover:shadow-[#B68F40]/30 hover:scale-[1.04] active:scale-[0.97] whitespace-nowrap"
        >
          <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          Erstgespräch anfragen
        </button>
      </div>
    </nav>
  );
}
