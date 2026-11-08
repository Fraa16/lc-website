import { useState } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { formatEuro } from '../lib/format';
import { scrollToSection } from '../lib/scroll';
import { ArrowUpRight, Check } from './ui/icons';
import { Reveal } from './ui/Reveal';
import { SectionHeader, anchorClass, containerClass, leadClass, sectionSpacing } from './ui/SectionHeader';

// Tax-free allowances – figures still to be confirmed by a tax advisor before launch.
const HEALTH_PER_YEAR = 600; // § 3 Nr. 34 EStG
const SACHBEZUG_PER_MONTH = 50; // § 8 Abs. 2 S. 11 EStG

const MIN_EMPLOYEES = 3;
const MAX_EMPLOYEES = 250;
const PRESETS = [10, 25, 50, 100];

export default function SavingsCalculator() {
  const desktop = useIsDesktop();
  const [employees, setEmployees] = useState(40);
  const [health, setHealth] = useState(true);
  const [sachbezug, setSachbezug] = useState(true);

  const perHead = (health ? HEALTH_PER_YEAR : 0) + (sachbezug ? SACHBEZUG_PER_MONTH * 12 : 0);
  const total = perHead * employees;
  const fill = `${((employees - MIN_EMPLOYEES) / (MAX_EMPLOYEES - MIN_EMPLOYEES)) * 100}%`;

  const breakdown: Array<[string, number, boolean]> = [
    ['Gesundheitsförderung', health ? HEALTH_PER_YEAR * employees : 0, false],
    ['Sachbezug', sachbezug ? SACHBEZUG_PER_MONTH * 12 * employees : 0, false],
    [desktop ? 'Pro Mitarbeitendem und Jahr' : 'Pro Kopf und Jahr', perHead, true],
  ];

  return (
    <section
      id="rechner"
      tabIndex={-1}
      aria-labelledby="rechner-title"
      className={cx(anchorClass, containerClass, sectionSpacing)}
    >
      <SectionHeader
        eyebrow="Potenzial-Rechner"
        titleId="rechner-title"
        title="Was Ihr Team steuerfrei erhalten kann."
      >
        <p className={cx(leadClass, 'text-navy/68')}>
          Zwei gesetzliche Freibeträge, gerechnet auf Ihre Teamgröße.
          {desktop && ' Frei von Lohnsteuer und Sozialabgaben.'}
        </p>
      </SectionHeader>

      <Reveal className="mt-7 flex flex-col gap-2.5 rounded-[28px] border border-navy/12 bg-cream-light p-2.5 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-[14px] lg:rounded-[32px] lg:p-[14px]">
        {/* Inputs */}
        <div className="flex flex-col gap-5 px-[14px] pb-[14px] pt-[18px] lg:gap-11 lg:p-[clamp(24px,3vw,40px)]">
          <div className="flex flex-col gap-5 lg:gap-[22px]">
            <div className="flex items-end justify-between gap-4">
              <label
                htmlFor="calc-employees"
                className="text-[12px] font-semibold uppercase leading-none tracking-[0.08em] text-navy/60 lg:text-[13px]"
              >
                Mitarbeitende
              </label>
              <span
                aria-hidden="true"
                className="text-[52px] font-medium leading-[0.9] tracking-[-0.05em] tabular-nums lg:text-[clamp(48px,5vw,72px)]"
              >
                {employees}
              </span>
            </div>

            <div className="relative h-11 lg:h-7">
              <input
                id="calc-employees"
                type="range"
                min={MIN_EMPLOYEES}
                max={MAX_EMPLOYEES}
                step={1}
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                aria-valuetext={`${employees} Mitarbeitende`}
                className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="absolute inset-x-0 top-5 h-1 rounded bg-navy/10 lg:top-3" />
              <div
                className="absolute left-0 top-5 h-1 rounded bg-[linear-gradient(90deg,#000022,#B68F40)] lg:top-3"
                style={{ width: fill }}
              />
              <div
                className="absolute top-2 -ml-[14px] h-7 w-7 rounded-full bg-navy shadow-[0_0_0_5px_rgba(220,195,131,0.35)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[7px] peer-focus-visible:outline-gold-dark lg:top-0.5 lg:-ml-3 lg:h-6 lg:w-6"
                style={{ left: fill }}
              />
            </div>

            <div className="grid grid-cols-4 gap-1.5 lg:gap-2 xl:flex xl:flex-wrap">
              {PRESETS.map((n) => {
                const active = employees === n;
                return (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={active}
                    aria-label={`${n} Mitarbeitende`}
                    onClick={() => setEmployees(n)}
                    className={cx(
                      'h-11 rounded-full border text-[15px] font-medium leading-none transition-colors duration-200 lg:h-10 xl:px-[18px]',
                      active ? 'border-navy bg-navy text-cream' : 'border-navy/16 text-navy hover:bg-navy/5'
                    )}
                  >
                    {desktop ? `${n} MA` : n}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-1 flex flex-col gap-2 lg:mt-0 lg:gap-3">
            {desktop && (
              <span className="mb-1 text-[13px] font-semibold uppercase leading-none tracking-[0.08em] text-navy/60">
                Bausteine
              </span>
            )}
            <ModuleToggle
              checked={health}
              onToggle={() => setHealth((v) => !v)}
              title="Gesundheitsförderung"
              law="§ 3 Nr. 34 EStG"
              amount="600 € / Jahr"
              amountMobile="600 € pro Jahr"
            />
            <ModuleToggle
              checked={sachbezug}
              onToggle={() => setSachbezug((v) => !v)}
              title="Sachbezug"
              law="§ 8 Abs. 2 S. 11 EStG"
              amount="50 € / Monat"
              amountMobile="50 € pro Monat"
            />
          </div>
        </div>

        {/* Result */}
        <div className="surface-dark flex min-w-0 flex-col rounded-[20px] bg-navy px-5 py-6 text-cream lg:rounded-[24px] lg:p-[clamp(28px,3vw,44px)]">
          {desktop ? (
            <div className="flex items-center justify-between gap-4 text-[13px] font-semibold uppercase leading-none tracking-[0.08em]">
              <span className="text-gold-light">Ihr Potenzial pro Jahr</span>
              <span className="flex items-center gap-2 text-cream/70">
                <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-gold-light" />
                Steuer- &amp; abgabenfrei
              </span>
            </div>
          ) : (
            <span className="text-[12px] font-semibold uppercase leading-none tracking-[0.08em] text-gold-light">
              Ihr Potenzial pro Jahr · steuerfrei
            </span>
          )}

          <span
            aria-live="polite"
            aria-atomic="true"
            className="text-gold-gradient mt-5 whitespace-nowrap text-[54px] font-medium leading-[0.95] tracking-[-0.06em] tabular-nums lg:mt-10 lg:text-[clamp(56px,7vw,108px)] lg:leading-[0.92]"
          >
            {formatEuro(total)}
          </span>
          <span className="mt-3 text-[16px] leading-[1.45] text-cream/72 lg:mt-[18px] lg:text-[18px]">
            für {employees} Mitarbeitende, zusätzlich zum Gehalt
          </span>

          <dl className="mt-[22px] border-t border-cream/14 lg:mt-9">
            {breakdown.map(([label, value, accent]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-[14px] lg:py-[18px]"
              >
                <dt className="text-[15px] leading-[1.3] text-cream/72 lg:text-[16px]">{label}</dt>
                <dd
                  className={cx(
                    'whitespace-nowrap text-[17px] font-medium leading-none tabular-nums lg:text-[20px] lg:tracking-[-0.02em]',
                    accent ? 'text-gold-light' : 'text-cream'
                  )}
                >
                  {formatEuro(value)}
                </dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={() => scrollToSection('termin')}
            className="mt-[22px] flex h-14 items-center justify-center gap-4 rounded-full bg-cream px-[22px] text-[16px] font-medium leading-none text-navy transition-colors hover:bg-white lg:mt-8 lg:h-[58px] lg:justify-between lg:pl-7 lg:pr-6 lg:text-[17px]"
          >
            Potenzial im Erstgespräch prüfen
            <ArrowUpRight className="hidden text-gold-dark lg:block" />
          </button>
          <span className="mt-4 text-[12px] leading-[1.5] text-cream/55 lg:mt-auto lg:pt-6 lg:text-[13px]">
            {desktop
              ? 'Höchstbeträge bei voller Nutzung. Voraussetzungen, etwa zertifizierte Maßnahmen nach § 3 Nr. 34 EStG, prüfen wir im Gespräch. Keine Steuerberatung.'
              : 'Höchstbeträge bei voller Nutzung. Voraussetzungen prüfen wir im Gespräch. Keine Steuerberatung.'}
          </span>
        </div>
      </Reveal>
    </section>
  );
}

function ModuleToggle({
  checked,
  onToggle,
  title,
  law,
  amount,
  amountMobile,
}: {
  checked: boolean;
  onToggle: () => void;
  title: string;
  law: string;
  amount: string;
  amountMobile: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={cx(
        'grid grid-cols-[26px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border p-4 text-left text-navy transition-colors duration-200 lg:grid-cols-[28px_minmax(0,1fr)] lg:gap-4 lg:rounded-[20px] lg:px-[22px] lg:py-5 xl:grid-cols-[28px_minmax(0,1fr)_auto]',
        checked ? 'border-navy bg-white' : 'border-navy/12 hover:bg-navy/3'
      )}
    >
      <span
        className={cx(
          'flex h-[26px] w-[26px] items-center justify-center rounded-lg border-[1.5px] lg:h-7 lg:w-7',
          checked ? 'border-navy bg-navy text-gold-light' : 'border-navy/30 text-transparent'
        )}
      >
        <Check size={13} strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-col gap-1 lg:gap-1.5">
        <span className="text-[17px] font-medium leading-[1.2] lg:text-[19px] lg:tracking-[-0.015em]">{title}</span>
        {/* Below 1280px the amount moves into the sub-line so the long title never collides. */}
        <span className="text-[13px] leading-[1.3] text-navy/60 lg:text-[14px] xl:hidden">
          {amountMobile} · {law}
        </span>
        <span className="hidden text-[14px] leading-[1.3] text-navy/60 xl:inline">{law}</span>
      </span>
      <span className="hidden whitespace-nowrap text-[17px] font-medium leading-none xl:inline">{amount}</span>
    </button>
  );
}
