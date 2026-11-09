# Leibinn Consulting – Landing Page

Single-page marketing site for Leibinn Consulting (benefit systems for companies).
Vite + React 18 + TypeScript + Tailwind CSS.

```bash
npm install
npm run dev        # local dev server
npm run build      # production build to dist/
npm run lint
npm run typecheck
```

## Structure

```
src/
  App.tsx                     page composition (section order)
  components/
    NavBar.tsx                floating pill nav + fullscreen mobile menu
    HeroSection.tsx           #top
    FiguresStrip.tsx          key figures (count-up)
    ProblemSection.tsx        #herausforderung (+ "Stillstand wird teuer" card)
    ComparisonSection.tsx     #vergleich – Ohne/Mit System toggle
    BenefitSystemSection.tsx  #system – accordion
    SavingsCalculator.tsx     #rechner – tax-free potential calculator
    ImplementationSection.tsx #ablauf
    AboutSection.tsx          #ueber
    TestimonialsSection.tsx   #stimmen
    FAQSection.tsx            #faq
    BookingSection.tsx        #termin – booking form
    Footer.tsx                incl. callback ("Rückruf") form
    ui/                       Eyebrow, SectionHeader, Reveal/CountUp, Logo, icons
  hooks/                      useReveal, useCountUp, useMediaQuery
  lib/                        booking (availability + submit), scroll, supabase
```

Design tokens (colours, gradients, font) live in `tailwind.config.js` and as CSS
variables in `src/index.css`. The only font is Instrument Sans (self-hosted).

**Breakpoints:** below 900px the mobile design applies (gutters widen from 640px),
from 900px the desktop design (content max-width 1280px).

## Booking, forms & legal pages

- **Booking:** the shared 60-minute Calendly event
  (`https://calendly.com/beratung-leibinn-consulting/60min`, the same link on every
  Leibinn site) behind a click-to-load consent step: nothing is requested from
  Calendly before the visitor clicks "Kalender laden". `VITE_CALENDLY_URL` can override it.
- **Callback ("Rückruf") in the footer:** stored in the Supabase table
  `contact_submissions` (`quelle` = `rueckruf`). Apply
  `supabase/migrations/20261108120000_callback_requests_on_contact_submissions.sql`
  before deploying, otherwise the insert fails.
- **Impressum** (`/impressum`): copied 1:1 from the main website; all Leibinn sites
  share it. `src/main.tsx` picks the page by path, `vercel.json` rewrites every path
  to `index.html`.
- **Fonts:** Instrument Sans is self-hosted (`@fontsource-variable/instrument-sans`),
  so no visitor IP reaches Google.

## Open before launch

- Datenschutz page (`/datenschutz`): follows once the shared services of all
  Leibinn sites (forms, tracking, consent) are decided
- Conversion tracking for ads, with a consent banner
- Production domain (canonical URL, share image, favicon)
- Second photo for "Über uns" (`AboutSection.tsx`, marked `TODO(foto)`)
- Tax figures and sources to be confirmed by a tax advisor
  (600 € § 3 Nr. 34 EStG, 50 € § 8 Abs. 2 S. 11 EStG, BAuA/DAK figures)
