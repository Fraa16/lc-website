# Leibinn Consulting — Design & Frontend Audit

Audit and rebuild of the existing landing page. **The brand palette
(`#000022` / `#F4F3EE` / `#B68F40` / `#DCC383`), every line of marketing copy,
and every photograph were treated as fixed.** Everything changed below is
layout, type, colour *roles*, structure, markup and behaviour.

Two exceptions to the copy rule, both UI state labels rather than marketing text:
`weniger anzeigen` (needed so an expanded card can be closed) and the inline form
validation messages (the old form had none).

---

## 1. Blocking defects

These are not taste — they are broken.

### 1.1 The footer contact form never worked

`FooterCTASection` inserted into `contact_submissions`:

```ts
firma: null,              // column is NOT NULL
source: 'cta_footer_b2b', // column does not exist
```

The table defined by `20251115214837_create_contact_submissions_table.sql` has no
`source` column and declares `firma text NOT NULL`. PostgREST rejects both.
**Every submission from the footer form failed**, and the visitor saw a browser
`alert()` reading "Es gab einen Fehler". Only the main form ever produced a lead.

Fixed by migration `20260921120000_fix_contact_submissions_schema.sql` (adds
`source`, drops the two `NOT NULL` constraints that the footer form cannot
satisfy, indexes `created_at`). **This migration has to be applied to the live
Supabase project** — the code change alone is not enough.

### 1.2 The site had no mobile navigation

`NavBar` rendered a single fixed pill containing four links plus a CTA, with no
breakpoint handling and no menu. Below roughly 700px it overflowed the viewport.
There was no hamburger, no sheet, nothing.

Replaced with a real header: transparent over the hero, condensing to a blurred
navy bar on scroll, full-screen sheet on mobile with scroll lock, focus trap,
`Escape` to close and focus restored to the toggle.

### 1.3 Headlines shrank as screens grew

Present in six sections:

```
text-4xl sm:text-5xl lg:text-3xl xl:text-4xl
```

48px on a phone → **30px on a 1440px desktop**. The single biggest reason the
page read as cheap: the B2B decision-maker on a large monitor saw the smallest
type. Replaced with a fluid `clamp()` scale that grows monotonically
(hero H1 now 40px → 72px).

### 1.4 Contrast failures

| Element | Ratio | Required | Where |
|---|---|---|---|
| Gold gradient micro-caps on cream | **2.70 → 1.55:1** | 4.5:1 | every light-section eyebrow |
| Gradient display headings on cream | **2.70 → 1.55:1** | 3:1 | Trust, Testimonials |
| White label on gold gradient button | **3.00 → 1.72:1** | 4.5:1 | BenefitSystem, Implementation CTAs |

`#B68F40` is 6.83:1 on navy but only 2.70:1 on cream. The old design used the
same gold ramp on both grounds. Gold is now **text only on dark grounds**; on
light grounds it carries as rules, chips and icon fills, with navy ink for the
words. Button labels are navy on gold (11.9:1) everywhere.

Verified by walking the rendered DOM, compositing each text node's alpha over
its real background (gradients included): **0 AA failures**.

### 1.5 Accessibility

- 6 `<h1>` elements on one page; `<h2>` rendered *above* `<h1>` in three
  sections. Now one `<h1>`, no skipped levels.
- No `<main>`, no skip link, `lang="en"` on a German site.
- Consequence cards were `<div onClick>` — unreachable by keyboard, no
  `aria-expanded`, and once expanded there was no way to close them.
- FAQ accordions had no `aria-expanded` / `aria-controls`.
- Form errors were a red ring only — nothing announced, no `aria-invalid`, no
  `autocomplete`, and submission failures used `alert()`.
- Footer legal links were 16px tall (WCAG 2.2 SC 2.5.8 requires 24px).
- No `prefers-reduced-motion` handling anywhere; ~73 elements animated
  regardless.

All fixed and covered by an automated check (39 assertions, all passing).

### 1.6 Google Fonts were hotlinked

Embedding `fonts.googleapis.com` transmits every visitor's IP to Google.
**LG München I, 20.01.2022 (3 O 17493/20)** held this to be a GDPR violation for
German sites, with damages awarded. Both families are now self-hosted as
variable WOFF2 (2 files, 91 KB for first paint, covering all six weights).

---

## 2. Why it read as amateur

### No design system
Around 70 hardcoded hex values, **five** competing container widths
(`max-w-6xl`, `max-w-7xl`, `max-w-[1280px]`, `max-w-[1400px]`, `max-w-[650px]`),
three gutter scales and five section paddings (`py-12` … `py-28`) with no
relationship between them. No two sections lined up vertically.

Replaced with a token layer in `src/index.css` + `tailwind.config.js`: colour
roles, a fluid type scale, one spacing rhythm, a radius scale, a navy-tinted
elevation scale and one easing curve.

### One accent, used on everything
The gold gradient appeared on buttons, eyebrows, headlines, icons, borders,
dividers, badges and quote marks. When the accent is everywhere, nothing is
accented. Gold is now reserved for CTAs, rules, and marks on dark grounds.

### Six sections, one card
Problem, Benefit, Implementation, Trust, Testimonials and FAQ were all the same
white `rounded-2xl` box with a border and a `hover:-translate-y-1`. Scrolling
felt like one long list. Each section now has its own logic:

| Section | Before | After |
|---|---|---|
| Problem | 5 cards in a 2-col grid, 5th orphaned and centred | hairline list with gold index numbers, sticky argument column |
| Consequences | image cards that swap in an opaque white overlay with an inner scrollbar | in-place disclosure, `0fr→1fr`, nothing clipped |
| Benefit | 4 cards | 4 cards, navy icon chips, hover-revealed accent rule, inline CTA bar |
| Implementation | 3 detached cards | connected process rail that terminates at step 03 |
| Trust | 6 identical cards | bento: lead tile + full-width closer |
| FAQ | 8 floating cards in 2 misaligned columns | single hairline list, rules aligned |

### The 400px empty div
```tsx
<div className="h-[240px] md:h-[320px] lg:h-[400px]" style={{ background: 'linear-gradient(...)' }} />
```
A full desktop screen of nothing, placed directly after the primary conversion
point. Now a purposeful `clamp(4rem, 9vw, 7rem)` transition.

### Motion that outlasted attention
Stagger delays ran to `delay-1000` plus 120ms per item — the last Trust card
appeared roughly 2.4s after scrolling into view. Now capped at ~60–90ms steps on
a single shared observer (the old code created one `IntersectionObserver` per
section — eleven of them — each with a stale-ref cleanup bug).

### The footer overlap never rendered
The CTA card was supposed to overlap the footer (`mt-[-120px] pt-[150px]`). The
footer painted *over* the card instead, and the section's own background covered
the overlap zone. Rebuilt with a background layer that stops short of the
section's bottom edge, so the effect actually happens.

---

## 3. Content and asset findings

- **The testimonial `role` field was never rendered.** "Lehrerin", "Anwalt",
  "Selbstständiger Tätowierer" were in the data and dropped on the floor — the
  section's strongest credibility signal. Now displayed.
- **The mini-CTA photograph was invisible**, buried under a 90–95% opaque gold
  wash. The scrim now falls off across the panel so the image reads.
- **The footer logo was white on a light blue ground** — effectively invisible.
  A navy variant of the same mark is now used there.
- **The hero portrait was a 3714×5199 (19 megapixel, 461 KB) file** rendered at
  roughly 480px. Resized derivatives with `srcset`: 461 KB → 59 KB.
- **The favicon pointed at `/vite.svg`, which does not exist**, and the Open
  Graph image was bolt.new's default placeholder — shipped on every share.
  Replaced with favicons cut from the real logo mark and an OG card built from
  the brand assets.
- `<title>` was "Leibinn Consulting B2B Hero Section", a dev artifact. There was
  no meta description.

### Inconsistent claim (copy — not changed)
The hero bullet says "**Bis zu 30%** weniger Fehlzeiten"; the trust marker
directly below says "**Ø 28%** weniger Fehlzeiten". Two different numbers for the
same claim, 200px apart. Worth reconciling with the client.

---

## 4. Launch blockers still open

1. **Apply the Supabase migration.** Until then the footer form still fails.
2. **`/impressum` and `/datenschutz` do not exist.** Both are legally required
   (§5 DDG, Art. 13 GDPR). The links now point at the correct paths, so they
   404 rather than silently doing nothing — visible, not hidden.
3. **Set `VITE_SITE_URL`** to the production origin so canonical and Open Graph
   URLs resolve absolutely.
4. **`.env` is committed to the repository.** The Supabase anon key is
   public-by-design so this is not a credential leak, but the file should be
   untracked and `.env.example` used instead.
5. The Pexels images in the mini-CTA and Consequences sections are **hotlinked
   from an external CDN**. Consider self-hosting (and confirming licensing).

---

## 5. Results

| | Before | After |
|---|---|---|
| Image payload | 583 KB | 106 KB |
| Webfonts | 3rd-party (GDPR risk) | self-hosted, 91 KB first paint |
| `<h1>` elements | 6 | 1 |
| `<main>` landmark | none | yes |
| `lang` | `en` | `de` |
| WCAG AA text contrast failures | 6 classes of failure | 0 |
| Mobile navigation | none | full sheet, keyboard accessible |
| Working contact forms | 1 of 2 | 2 of 2 |
| `prefers-reduced-motion` | ignored | honoured |
| Structured data | none | Organization + FAQPage |
| Hardcoded hex values | ~70 | 0 (tokenised) |
| `IntersectionObserver` instances | 11 | 1 |
| CSS (gzipped) | 6.21 KB | 8.28 KB |
| JS (gzipped) | 97.41 KB | 104.04 KB |

The JS/CSS increase (~7 KB each, gzipped) buys the mobile navigation, the
accessible disclosure patterns, form validation and the token layer. Total page
weight is down substantially because of the images.

### Verification
- `npm run lint` — clean
- `npm run typecheck` — clean
- 39 automated interaction / semantics / accessibility assertions — all passing
- Rendered-DOM contrast audit (alpha- and gradient-aware) — 0 failures
- No horizontal overflow at 390 / 768 / 1440px

---

# Addendum — visual direction

After the rebuild above, the client supplied a reference site (a Framer
template for a tax practice) as the target look. This pass adapts that design
language to Leibinn's identity. The brief was explicit: **navy stays the
dominant ground — no cream-dominant flip — and the corporate palette stays
recognisable.**

## What was adopted

| Reference pattern | Applied to |
|---|---|
| Floating pill header | Site header: logo, links, solid CTA in one rounded bar |
| Eyebrow as a dash + uppercase label | Every section opener |
| Oversized headline left, supporting copy top-right | `SectionHead`, used by six sections |
| Numbered row table with hover bands | Herausforderung (5 rows) |
| Columns split by hairlines, each with an index | Das System (4), Ihre Vorteile (6) |
| Accent route card + stepped rows | Umsetzung |
| Card with a floating index pill | Konsequenzen |
| Big single quote with counter, progress bar, prev/next | Kundenstimmen |
| Numbered answer index with circular +/− | FAQ |
| Split panel, dark pitch beside a bright form | Kontaktformular |
| Oversized wordmark cropped by the page edge | Footer |

## Palette

Navy, gold and cream are unchanged. What was added is **depth in the navy**,
not new hues:

```
--navy-0  #000022   page ground (corporate, untouched)
--navy-1  #07061f   alternating section band
--navy-2  #0c0b2e   raised panel
--navy-3  #14123f   nested panel, row hover
--navy-4  #1e1b52   strokes, active row
```

The previous build had only `#000022` and `#05052F` — barely a step apart —
so every "card" read as flat against the page. Four steps let panels actually
lift, which is what makes the reference's layering work. Each step carries
slightly more red than a pure blue-navy, which keeps the dark field from going
cold next to the gold.

Three surface tiers now sit on that ground, mirroring the reference:
**raised** (navy-2, most panels), **gold** (the one loud accent — the Umsetzung
route card), and **paper** (cream — reserved for the contact form, so the
primary conversion point is the single brightest thing on the page).

## Typography

`Inter Tight` → **`Outfit`** for display, self-hosted as a variable font.
The reference's warmth comes largely from a wide geometric face; Inter Tight is
neutral and technical by comparison. Outfit was chosen over Plus Jakarta Sans
(too narrow), Figtree (too close to Inter) and Bricolage Grotesque (too
condensed) by rendering all four against the reference. Inter stays for body
copy and UI, where its larger x-height reads better small.

First-paint webfont cost went from 90.9 KB to 78.7 KB, because Outfit's latin
subset is smaller than Inter Tight's.

## Deliberately not adopted

The reference leans heavily on social proof that Leibinn does not have:
`720+ clients`, `$12M+ saved`, `99% satisfaction`, `20+ years`, an avatar
stack and a four-cell stat band. **None of it was invented.** Those elements
were dropped rather than filled with placeholder numbers. If the client
supplies real figures, the stat band and hero stat card are straightforward
to add.

## New strings introduced

The copy deck is otherwise untouched. These are structural labels, not
marketing copy, and are flagged here for the client to approve or replace:

- `Nr.` / `Herausforderung` / `Im Detail` — column headers on the row table
- `05 Handlungsfelder` — count chip on the Herausforderung section
- `Ihr Weg zum System` — label on the Umsetzung route card
- `Kostenfreie Analyse` / `Antwort in 24 Stunden` — top bar of the mid-page CTA
- `Kostenlose Benefit-Analyse` — eyebrow on the contact panel
- `01 / Navigation` / `02 / Rechtliches` — footer column headers
- `weniger anzeigen` — needed to close an expanded card
- Form validation messages — the old form had none

## Verification after this pass

- `npm run lint`, `npm run typecheck` — clean
- 39 interaction / semantics / accessibility assertions — all passing
- Rendered-DOM contrast audit — 0 AA failures. One node is skipped: the
  oversized footer wordmark, which is `aria-hidden`, duplicates the logo
  directly above it, and is exempt under WCAG 1.4.3 as pure decoration.
- No horizontal overflow at 390 / 768 / 1440px
