// 1400px export of cedrik-leibinn-hero.webp (original: 3714px / 472 KB).
import heroImage from '../images/cedrik-leibinn-hero-1400.webp';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { scrollToSection } from '../lib/scroll';
import { ArrowUpRight, Card, Percent, Shield, TrendUp, User, Zap } from './ui/icons';
import { CountUp } from './ui/Reveal';
import { Eyebrow, anchorClass } from './ui/SectionHeader';

const trustItems = [
  { icon: Shield, label: 'Rechtssicher & GKV-konform', short: 'Rechtssicher & GKV-konform' },
  { icon: User, label: 'Fester Ansprechpartner', short: 'Fester Ansprechpartner' },
  { icon: Zap, label: 'Einführung ohne HR-Aufwand', short: 'Ohne HR-Aufwand' },
  { icon: Percent, label: 'Steuerlich optimiert', short: 'Steuerlich optimiert' },
];

const heroStats = [
  { icon: TrendUp, value: '600 €', label: 'steuerfrei pro Kopf & Jahr' },
  { icon: Card, value: '50 €', label: 'Sachbezug pro Monat' },
];

export default function HeroSection() {
  const desktop = useIsDesktop();

  return (
    <section
      id="top"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className={`${anchorClass} mx-auto max-w-[1280px] px-5 pt-11 sm:px-[clamp(24px,4vw,56px)] lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-[clamp(40px,5vw,80px)] lg:pb-[72px] lg:pt-[clamp(56px,7vw,96px)]`}
    >
      <div className="flex flex-col">
        <Eyebrow>Benefit-Systeme für Unternehmen</Eyebrow>
        <h1
          id="hero-title"
          className="mt-[22px] text-balance text-[44px] font-medium leading-none tracking-[-0.05em] sm:text-[clamp(44px,7vw,60px)] lg:mt-7 lg:text-[clamp(48px,5.6vw,84px)] lg:leading-[0.98]"
        >
          Das Benefit-System, das sich für Ihr Unternehmen rechnet.
        </h1>
        <p className="mt-[22px] text-pretty text-[17px] leading-[1.55] text-navy/68 lg:mt-[30px] lg:max-w-[540px] lg:text-[clamp(17px,1.4vw,20px)]">
          Gesundheits- und Vorsorgeleistungen in einem System: steuerlich optimiert, rechtssicher
          und ohne Mehraufwand für HR.
          {desktop && ' Einführung und Verwaltung übernehmen wir.'}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-6 border-y border-navy/12 py-[18px] lg:mt-10 lg:py-[22px]">
          <div className="flex items-center gap-[14px] lg:gap-4">
            <img
              src={heroImage}
              alt=""
              width={56}
              height={56}
              className="block h-12 w-12 rounded-full object-cover object-[50%_12%] shadow-[0_0_0_3px_#F4F3EE,0_0_0_4px_rgba(182,143,64,0.6)] lg:h-14 lg:w-14"
            />
            <div className="flex flex-col gap-1.5">
              <span className="text-[17px] font-medium leading-none tracking-[-0.01em] lg:text-[18px]">
                Persönlich begleitet
              </span>
              <span className="text-[15px] leading-none text-navy/60">von Cedrik Leibinn, Gründer</span>
            </div>
          </div>
          <span className="hidden text-[12px] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-navy/60 lg:inline">
            30 Min. · Video oder Telefon · kostenfrei
          </span>
        </div>

        {/* Desktop CTA row */}
        <div className="mt-9 hidden flex-wrap items-center gap-8 lg:flex">
          <button
            type="button"
            onClick={() => scrollToSection('termin')}
            className="flex h-[62px] items-center gap-[14px] rounded-full bg-navy pl-[30px] pr-[26px] text-[18px] font-medium leading-none text-cream shadow-[0_14px_40px_rgba(0,0,34,0.18)] transition-colors hover:bg-navy-hover"
          >
            Erstgespräch buchen
            <ArrowUpRight size={15} className="text-gold-light" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('ablauf')}
            className="text-[18px] font-medium leading-none text-navy transition-colors hover:text-gold-dark"
          >
            So funktioniert es
          </button>
        </div>

        {/* Mobile CTA */}
        <button
          type="button"
          onClick={() => scrollToSection('termin')}
          className="mt-7 flex h-[60px] w-full items-center justify-between rounded-full bg-navy pl-[26px] pr-6 text-[18px] font-medium leading-none text-cream shadow-[0_14px_34px_rgba(0,0,34,0.18)] transition-colors hover:bg-navy-hover sm:max-w-[420px] lg:hidden"
        >
          Erstgespräch buchen
          <ArrowUpRight size={15} className="text-gold-light" />
        </button>
        <div className="mt-4 flex items-center justify-between sm:max-w-[420px] lg:hidden">
          <span className="text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-navy/60">
            30 Min. · Video oder Telefon
          </span>
          <button
            type="button"
            onClick={() => scrollToSection('ablauf')}
            className="h-11 text-[16px] font-medium leading-none text-navy underline decoration-gold underline-offset-[5px]"
          >
            So funktioniert es
          </button>
        </div>
      </div>

      <div className="relative mt-7 h-[480px] overflow-hidden rounded-[28px] bg-navy sm:h-[560px] lg:mt-0 lg:h-[clamp(560px,50vw,700px)] lg:rounded-[32px]">
        <img
          src={heroImage}
          alt="Cedrik Leibinn, Gründer von Leibinn Consulting"
          // React 18 doesn't know the camelCase prop yet; pass the DOM attribute directly.
          {...{ fetchpriority: 'high' }}
          className="absolute inset-0 block h-full w-full object-cover object-[50%_14%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(155deg,rgba(182,143,64,0.42)_0%,rgba(0,0,34,0)_42%),linear-gradient(0deg,rgba(0,0,34,0.8)_0%,rgba(0,0,34,0)_46%)] lg:bg-[linear-gradient(155deg,rgba(182,143,64,0.42)_0%,rgba(0,0,34,0)_42%),linear-gradient(0deg,rgba(0,0,34,0.82)_0%,rgba(0,0,34,0)_46%)]"
        />

        <ul className="absolute right-5 top-5 hidden flex-col gap-[14px] rounded-[22px] bg-navy/72 px-6 py-5 text-[16px] leading-none text-cream backdrop-blur-[14px] lg:flex">
          {trustItems.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon className="text-gold-light" />
              {label}
            </li>
          ))}
        </ul>

        <div className="absolute inset-x-3 bottom-3 grid grid-cols-2 rounded-[20px] bg-cream-light p-[18px] lg:inset-x-5 lg:bottom-5 lg:rounded-[24px] lg:px-[22px] lg:py-5">
          {heroStats.map(({ icon: Icon, value, label }, i) => (
            <div
              key={value}
              className={
                i === 0
                  ? 'flex min-w-0 items-center gap-[14px] pr-3 lg:pr-4'
                  : 'flex min-w-0 items-center gap-[14px] border-l border-navy/10 pl-4'
              }
            >
              <span className="hidden h-[clamp(34px,3vw,46px)] w-[clamp(34px,3vw,46px)] flex-none items-center justify-center rounded-full bg-gold-gradient-sm text-navy lg:flex">
                <Icon />
              </span>
              <div className="flex min-w-0 flex-col gap-1.5">
                <CountUp
                  value={value}
                  className="whitespace-nowrap text-[32px] font-medium leading-none tracking-[-0.045em] tabular-nums lg:text-[clamp(24px,2.3vw,40px)]"
                />
                <span className="text-[13px] leading-[1.3] text-navy/62 lg:text-[14px] lg:leading-[1.25]">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile trust chips */}
      <ul className="mt-[14px] grid grid-cols-2 gap-2 lg:hidden">
        {trustItems.map(({ icon: Icon, short }) => (
          <li
            key={short}
            className="flex items-center gap-2.5 rounded-2xl border border-navy/10 p-[14px] text-[14px] font-medium leading-[1.25]"
          >
            <Icon className="flex-none text-gold" />
            {short}
          </li>
        ))}
      </ul>
    </section>
  );
}
