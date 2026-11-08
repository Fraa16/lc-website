import { useState } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { scrollToSection } from '../lib/scroll';
import { ArrowRightSmall, ArrowUpRight, Check, CrossSmall } from './ui/icons';
import { SectionHeader, anchorClass, containerClass, leadClass, sectionSpacing } from './ui/SectionHeader';

type View = 'ohne' | 'mit';

const areas = ['Komplexität', 'Verwaltung', 'Attraktivität', 'Transparenz', 'Steuer'];

const withoutSystem = [
  'Einzelne Verträge, verschiedene Anbieter, eigene Fristen.',
  'HR pflegt Listen, prüft Anträge und überwacht Fristen.',
  'Benefits sind vorhanden, im Recruiting aber unsichtbar.',
  'Mitarbeitende wissen nicht, was ihnen zusteht.',
  'Freibeträge und Förderungen bleiben ungenutzt.',
];

const withSystem = [
  'Ein System, ein Ansprechpartner, eine klare Struktur.',
  'Digitale Abläufe. Ein- und Austritte übernehmen wir.',
  'Moderne Leistungen, die Bewerbende und Team wahrnehmen.',
  'Jede Person kennt ihre Leistungen und weiß, wie sie sie abruft.',
  'Gesundheitsförderung und Sachbezug pro Kopf voll genutzt.',
];

const rowGrid = 'grid grid-cols-[88px_minmax(0,0.7fr)_minmax(0,1.3fr)_56px] items-center';

export default function ComparisonSection() {
  const desktop = useIsDesktop();
  const [view, setView] = useState<View>('ohne');
  const mit = view === 'mit';

  const toggle = (
    <div
      role="group"
      aria-label="Ansicht wählen"
      className="relative grid grid-cols-2 rounded-full border border-navy/14 bg-cream-light p-[5px] lg:p-1.5"
    >
      <span
        aria-hidden="true"
        className="absolute bottom-[5px] left-[5px] top-[5px] w-[calc(50%-5px)] rounded-full bg-navy transition-transform duration-[350ms] ease-soft lg:bottom-1.5 lg:left-1.5 lg:top-1.5 lg:w-[calc(50%-6px)]"
        style={{ transform: `translateX(${mit ? '100%' : '0%'})` }}
      />
      {(['ohne', 'mit'] as const).map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          aria-controls="vergleich-tabelle"
          onClick={() => setView(v)}
          className={cx(
            'relative h-12 rounded-full text-[16px] font-medium leading-none transition-colors duration-[250ms] lg:h-[50px] lg:px-[26px]',
            view === v ? 'text-cream' : 'text-navy'
          )}
        >
          {v === 'ohne' ? 'Ohne System' : 'Mit System'}
        </button>
      ))}
    </div>
  );

  const texts = mit ? withSystem : withoutSystem;

  return (
    <section
      id="vergleich"
      tabIndex={-1}
      aria-labelledby="vergleich-title"
      className={cx(anchorClass, containerClass, sectionSpacing)}
    >
      <SectionHeader
        eyebrow="Der Unterschied im Alltag"
        titleId="vergleich-title"
        title="Dieselben fünf Felder. Mit und ohne System."
      >
        {desktop && (
          <div className="flex flex-col items-start gap-6">
            <p className={cx(leadClass, 'text-navy/68')}>
              Wechseln Sie die Ansicht und sehen Sie, was sich in Ihrem Unternehmen konkret ändert.
            </p>
            {toggle}
          </div>
        )}
      </SectionHeader>

      {!desktop && <div className="mt-7">{toggle}</div>}

      <div
        id="vergleich-tabelle"
        className={cx(
          'mt-[14px] overflow-hidden rounded-[24px] lg:mt-14 lg:rounded-[32px]',
          mit ? 'surface-dark bg-navy text-cream' : 'border border-navy/12 bg-cream-light text-navy'
        )}
      >
        {desktop ? (
          <table className="block w-full text-left">
            <caption className="sr-only">
              {mit ? 'Mit Leibinn Benefit-System' : 'Ohne System'}: fünf Bereiche im Vergleich
            </caption>
            <thead className="block">
              <tr
                className={cx(
                  rowGrid,
                  'border-b px-9 py-[22px] text-[12px] font-semibold uppercase leading-none tracking-[0.08em]',
                  mit ? 'border-cream/12 text-cream/55' : 'border-navy/10 text-navy/55'
                )}
              >
                <th scope="col" className={cx('font-semibold', mit ? 'text-gold-light' : 'text-gold-dark')}>
                  Nr.
                </th>
                <th scope="col" className="font-semibold">
                  Bereich
                </th>
                <th scope="col" className="font-semibold">
                  {mit ? 'Mit Leibinn Benefit-System' : 'Ohne System'}
                </th>
                <th scope="col">
                  <span className="sr-only">Bewertung</span>
                </th>
              </tr>
            </thead>
            <tbody className="block">
              {areas.map((area, i) => (
                <tr
                  key={area}
                  className={cx(rowGrid, 'border-b px-9 py-7', mit ? 'border-cream/10' : 'border-navy/10')}
                >
                  <td
                    className={cx(
                      'text-[28px] font-medium leading-none tracking-[-0.04em]',
                      mit ? 'text-gold-light' : 'text-navy/35'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </td>
                  <th scope="row" className="text-[22px] font-medium leading-[1.2] tracking-[-0.025em]">
                    {area}
                  </th>
                  <td className={cx('pr-6 text-[18px] leading-[1.45]', mit ? 'text-cream/80' : 'text-navy/66')}>
                    {texts[i]}
                  </td>
                  <td className="justify-self-end">
                    <Marker positive={mit} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <ul>
            {areas.map((area, i) => (
              <li
                key={area}
                className={cx(
                  'grid grid-cols-[minmax(0,1fr)_36px] items-start gap-3 border-b p-5',
                  mit ? 'border-cream/10' : 'border-navy/10'
                )}
              >
                <div className="flex flex-col gap-1.5">
                  <span
                    className={cx(
                      'text-[12px] font-semibold uppercase leading-none tracking-[0.08em]',
                      mit ? 'text-gold-light' : 'text-navy/50'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')} · {area}
                  </span>
                  <span className={cx('text-[16px] leading-[1.45]', mit ? 'text-cream/84' : 'text-navy/72')}>
                    {texts[i]}
                  </span>
                </div>
                <Marker positive={mit} small />
              </li>
            ))}
          </ul>
        )}

        <div
          className={cx(
            'flex flex-col gap-[14px] p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-9 lg:py-7',
            mit ? 'bg-cream/4' : 'bg-navy/3'
          )}
        >
          <span className="text-[18px] font-medium leading-[1.35] tracking-[-0.015em] lg:text-[20px]">
            {mit
              ? 'Wenige Stunden interner Aufwand. Benefits, die Ihr Team kennt und nutzt.'
              : 'Benefits kosten Budget, werden aber kaum gesehen oder genutzt.'}
          </span>
          {mit ? (
            <button
              type="button"
              onClick={() => scrollToSection('termin')}
              className="flex h-[50px] flex-none items-center justify-center gap-2.5 rounded-full bg-cream text-[16px] font-medium leading-none text-navy transition-colors hover:bg-white lg:h-[52px] lg:pl-6 lg:pr-5"
            >
              Erstgespräch buchen
              <ArrowUpRight className="hidden text-gold-dark lg:block" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setView('mit')}
              className="flex h-[50px] flex-none items-center justify-center gap-2.5 rounded-full border border-navy/20 text-[16px] font-medium leading-none text-navy transition-colors hover:bg-navy/5 lg:h-[52px] lg:px-[22px]"
            >
              {desktop ? (
                <>
                  Mit System ansehen
                  <ArrowRightSmall className="text-gold-dark" />
                </>
              ) : (
                'Mit System ansehen →'
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Marker({ positive, small = false }: { positive: boolean; small?: boolean }) {
  const size = small ? 'h-9 w-9' : 'h-10 w-10';
  return positive ? (
    <span className={cx(size, 'flex items-center justify-center rounded-full bg-gold-gradient-sm text-navy')}>
      <Check />
      <span className="sr-only">gelöst</span>
    </span>
  ) : (
    <span className={cx(size, 'flex items-center justify-center rounded-full border border-navy/18 text-navy/45')}>
      <CrossSmall />
      <span className="sr-only">ungelöst</span>
    </span>
  );
}
