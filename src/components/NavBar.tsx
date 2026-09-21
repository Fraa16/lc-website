import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import lcLogo from '../images/lc-logo-lang-420.webp';
import { useScrolled } from '../hooks/useScrolled';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { scrollToId } from '../lib/motion';
import { cx } from '../lib/cx';

const navItems = [
  { label: 'Herausforderung', id: 'problem-section' },
  { label: 'Das System', id: 'benefit-system' },
  { label: 'Umsetzung', id: 'implementation' },
  { label: 'FAQ', id: 'faq-section' },
];

const navIds = navItems.map((item) => item.id);

export default function NavBar() {
  const scrolled = useScrolled(80);
  const activeId = useScrollSpy(navIds);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  const go = useCallback((id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  }, []);

  // Lock the page behind the mobile sheet, and keep keyboard focus inside it.
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab' || !sheetRef.current) return;

      const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    // Move focus into the sheet so the next Tab stays in context.
    sheetRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <a
        href="#hauptinhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-gold focus:px-5 focus:py-3 focus:text-body-sm focus:font-semibold focus:text-navy"
      >
        Zum Hauptinhalt springen
      </a>

      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <div
          className={cx(
            'lc-container lc-container-wide flex h-[3.75rem] items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-[background-color,box-shadow,border-color] duration-500 ease-brand sm:gap-6 sm:pl-7',
            scrolled
              ? 'border border-white/10 bg-navy-2/90 lc-shadow-dark-2 backdrop-blur-xl'
              : 'border border-white/8 bg-navy-2/55 backdrop-blur-md'
          )}
        >
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            // -my-2/py-2 grows the hit area to 40px without moving the mark.
            className="-my-2 flex items-center py-2"
            aria-label="Leibinn Consulting — zum Seitenanfang"
          >
            <img
              src={lcLogo}
              alt="Leibinn Consulting"
              width={420}
              height={61}
              className="h-5 w-auto sm:h-6"
            />
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cx(
                    'relative rounded-full px-4 py-2 text-body-sm font-medium transition-colors duration-200',
                    isActive ? 'text-sheet-1' : 'text-sheet-3 hover:text-sheet-1'
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute inset-x-4 bottom-1 h-px origin-left rounded-full bg-gold-gradient transition-transform duration-300 ease-brand',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go('contact-form-section')}
              className="group hidden items-center gap-2 rounded-full bg-gold-gradient bg-[length:200%_100%] bg-left px-5 py-2.5 text-body-sm font-semibold text-navy shadow-[0_2px_10px_rgb(182_143_64_/_0.25)] transition-[background-position,transform,box-shadow] duration-300 ease-brand hover:bg-right hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgb(182_143_64_/_0.35)] sm:inline-flex"
            >
              Erstgespräch anfragen
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-sheet-1 transition-colors duration-200 hover:bg-white/[0.06] lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet — the previous build had no mobile navigation at all;
          the desktop pill simply overflowed the viewport below ~700px.

          Rendered conditionally rather than toggled with the `hidden`
          attribute: a class-based `display: flex` outranks the UA stylesheet's
          `[hidden] { display: none }`, so the sheet would stay on screen. It
          also keeps the links out of the tab order while closed. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          className="fixed inset-0 z-40 flex animate-fade-in flex-col bg-navy/[0.98] pt-header backdrop-blur-xl lg:hidden"
        >
          <nav
            aria-label="Hauptnavigation (mobil)"
            className="lc-container flex flex-1 flex-col justify-center gap-1 pb-12"
          >
            {navItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                style={{ animationDelay: `${index * 45}ms` }}
                className="animate-sheet-in border-b border-white/10 py-5 text-left font-display text-display-sm font-semibold text-sheet-1 transition-colors duration-200 hover:text-gold-light"
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => go('contact-form-section')}
              style={{ animationDelay: `${navItems.length * 45}ms` }}
              className="mt-8 animate-sheet-in rounded-xl bg-gold-gradient px-7 py-4 text-body-lg font-semibold text-navy"
            >
              Erstgespräch anfragen
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
