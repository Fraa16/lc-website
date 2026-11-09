import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { scrollToSection, type SectionId } from '../lib/scroll';
import { ArrowUpRight, Close, Menu } from './ui/icons';
import { Logo } from './ui/Logo';

const desktopLinks: Array<[string, SectionId]> = [
  ['Herausforderung', 'herausforderung'],
  ['System', 'system'],
  ['Ablauf', 'ablauf'],
  ['Über uns', 'ueber'],
  ['FAQ', 'faq'],
];

const menuLinks: Array<[string, SectionId]> = [
  ['Herausforderung', 'herausforderung'],
  ['Vergleich', 'vergleich'],
  ['Das System', 'system'],
  ['Rechner', 'rechner'],
  ['Ablauf', 'ablauf'],
  ['Über uns', 'ueber'],
  ['FAQ', 'faq'],
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktop = useIsDesktop();

  // The overlay is mobile-only: close it (and release the scroll lock) when the
  // viewport grows past the breakpoint, e.g. when a tablet is rotated.
  useEffect(() => {
    if (desktop) setMenuOpen(false);
  }, [desktop]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);

  const goFromMenu = useCallback((id: SectionId) => {
    setMenuOpen(false);
    // Let the overlay unmount and the body scroll lock lift before scrolling.
    window.setTimeout(() => scrollToSection(id), 20);
  }, []);

  return (
    <>
      <div className="sticky top-3 z-50 px-3 sm:px-[clamp(16px,3vw,40px)] lg:top-4">
        <nav
          aria-label="Hauptnavigation"
          className="mx-auto mt-3 flex h-16 max-w-[1120px] items-center justify-between gap-6 rounded-full border border-navy/8 bg-cream-light/90 pl-5 pr-2 shadow-[0_10px_30px_rgba(0,0,34,0.08)] backdrop-blur-[16px] lg:mt-4 lg:h-[72px] lg:bg-cream-light/86 lg:pl-7 lg:pr-[10px] lg:shadow-[0_10px_40px_rgba(0,0,34,0.06)]"
        >
          <button
            type="button"
            onClick={() => scrollToSection('top')}
            aria-label="Leibinn Consulting – zum Seitenanfang"
            className="flex-none rounded-sm text-navy"
          >
            <Logo className="h-[18px] w-[124px] lg:h-[22px] lg:w-[150px]" />
          </button>

          <div className="hidden gap-[clamp(18px,2.4vw,34px)] text-[15px] font-medium leading-none lg:flex">
            {desktopLinks.map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="text-navy/78 transition-colors hover:text-navy"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('termin')}
            className="hidden h-[52px] flex-none items-center gap-3 rounded-full bg-navy pl-[26px] pr-[22px] text-[16px] font-medium leading-none text-cream transition-colors hover:bg-navy-hover lg:flex"
          >
            Erstgespräch
            <ArrowUpRight className="text-gold-light" />
          </button>

          <div className="flex gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={() => scrollToSection('termin')}
              className="h-12 rounded-full bg-navy px-[18px] text-[15px] font-medium leading-none text-cream transition-colors hover:bg-navy-hover"
            >
              Termin
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Menü öffnen"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/14 transition-colors hover:bg-navy/5"
            >
              <Menu />
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && !desktop && <MobileMenu onClose={closeMenu} onNavigate={goFromMenu} />}
    </>
  );
}

function MobileMenu({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      // Keep focus inside the overlay.
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menü"
      className="surface-dark fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-navy px-5 pb-7 pt-3 text-cream lg:hidden"
    >
      <div className="mt-3 flex h-16 flex-none items-center justify-between pl-2">
        <span role="img" aria-label="Leibinn Consulting" className="text-cream">
          <Logo className="h-[18px] w-[124px]" />
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Menü schließen"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/22 transition-colors hover:bg-cream/6"
        >
          <Close />
        </button>
      </div>

      <nav aria-label="Menü" className="mb-6 mt-10 flex flex-col border-t border-cream/12">
        {menuLinks.map(([label, id], i) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className="flex h-[68px] flex-none items-center justify-between border-b border-cream/12 text-[28px] font-medium leading-none tracking-[-0.035em]"
          >
            <span>{label}</span>
            <span className="text-[13px] font-semibold tracking-[0.06em] text-gold-light">
              {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => onNavigate('termin')}
        className="mt-auto h-[60px] flex-none rounded-full bg-gold-gradient text-[17px] font-semibold leading-none text-navy"
      >
        Erstgespräch buchen
      </button>
      <span className="mt-[14px] text-center text-[14px] leading-none text-cream/60">
        60 Min. · Video oder Telefon · kostenfrei
      </span>
    </div>
  );
}
