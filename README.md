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
variables in `src/index.css`. The only font is Instrument Sans (Google Fonts).

**Breakpoints:** below 900px the mobile design applies (gutters widen from 640px),
from 900px the desktop design (content max-width 1280px).

## Forms & data

Booking and callback requests are stored in the existing Supabase table
`contact_submissions` (`quelle` = `erstgespraech` or `rueckruf`).
Apply the migration in `supabase/migrations/20261108120000_booking_fields_on_contact_submissions.sql`
before deploying, otherwise inserts fail.

The appointment slots are **mock data**: `useAvailability()` in `src/lib/booking.ts`
returns next week's Mon–Fri with a fixed pattern of booked slots. Replace it with a
real calendar (Cal.com, Calendly or own backend) – the UI only depends on its return shape.

## Open before launch

- Real calendar availability + confirmation e-mail (the success screen says
  "Die Bestätigung geht an …")
- Second photo for "Über uns" (`AboutSection.tsx`, marked `TODO(foto)`)
- Impressum / Datenschutz pages (`Footer.tsx`, marked `TODO(rechtliches)`)
- Tax figures and sources to be confirmed by a tax advisor
  (600 € § 3 Nr. 34 EStG, 50 € § 8 Abs. 2 S. 11 EStG, BAuA/DAK figures)
- Favicon / social share image
