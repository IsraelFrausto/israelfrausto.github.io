# CLAUDE.md

Working guide for Claude Code (and any AI agent) editing this repository. Read this before making changes.

## Project Purpose

This repository powers **israelfrausto.com**, Israel Frausto's personal brand and professional portfolio site. It exists to:

- Present Israel as a marketer with a finance background — Founder & CEO of Glouva.
- Communicate his profile, current venture (Glouva), experience, and credentials clearly to recruiters, collaborators, and potential clients.
- Drive one primary action: starting a conversation (email/LinkedIn contact).

This is a **single-page, static marketing/portfolio site** — not an app. Every change should serve clarity, credibility, and conversion, in that order.

## Current Stack

- **Plain static site**: `index.html`, `style.css`, `script.js`. No framework, no build step, no bundler, no package manager.
- **Hosting**: GitHub Pages, custom domain via `CNAME` (`israelfrausto.com`).
- **Fonts**: Google Fonts — Instrument Serif (display/italic accents) + Inter (body/UI), loaded via `<link>` in `<head>`.
- **Assets**: `profile-hero.webp` (primary portrait, preloaded), `profile.jpg` (legacy/reference), `favicon.svg`.
- **JS**: `script.js` is a small vanilla script — sets footer year, scroll progress bar, header "scrolled" state, and `IntersectionObserver`-based reveal-on-scroll animations. No dependencies.
- **SEO/meta**: `index.html` head includes canonical URL, Open Graph, Twitter card, and a JSON-LD `Person` schema — keep these in sync with any content changes (name, role, org, image).
- No test suite, no linter config, no CI workflows. Validation is manual (open in browser, check responsiveness, check console).

## Design Principles

- **Editorial, not corporate**: large serif/sans type pairing, generous whitespace, restrained color (ink black, warm paper, single purple accent). Don't add extra colors or decorative elements.
- **One accent color** (`--purple`) used deliberately for emphasis (italic words, current-role marker, links, contact section). Don't dilute it by overusing it elsewhere.
- **Typography carries the design**: big confident headlines (`clamp()`-based fluid sizing), tight negative letter-spacing on display text, serif italics reserved for emphasis words only.
- **Grid-based sections**, each with a numbered `section-label` (01, 02, 03…) — keep this numbering pattern consistent if sections are added, reordered, or removed.
- **Motion is subtle**: fade/slide-up reveals on scroll, soft hover transforms (translateY, arrow nudge). Never add motion that fights `prefers-reduced-motion` — that media query must keep working.
- **Consistency over novelty**: reuse existing components (`.button`, `.text-link`, `.tag-row`, `.section-label`, arrow icon) instead of inventing new patterns for similar needs.

## Copywriting Principles

- **Voice**: confident, plainspoken, first-person. Short declarative sentences. No buzzword soup, no exclamation marks, no emojis.
- **Show, don't inflate**: describe real roles/results plainly (see the Experience timeline) rather than using superlatives ("world-class", "passionate", "guru").
- **Precision over vagueness**: prefer concrete nouns (finance, e-commerce, brand systems) over abstract claims (synergy, innovative solutions).
- **Consistency of facts**: name, title (Founder & CEO), company (Glouva), location (Toronto, Canada), and dates must match across the hero, JSON-LD, meta tags, and timeline. If one changes, update all instances.
- **Every section earns its place**: don't add copy that repeats what's already said elsewhere on the page.

## Engineering Rules

- Keep it a **static, dependency-free site** unless the user explicitly asks to introduce a framework or build tool. Do not add npm/build tooling speculatively.
- **Vanilla HTML/CSS/JS only.** No inline frameworks, no CDN component libraries, no jQuery.
- Follow existing code conventions exactly:
  - HTML: 2-space indent, double-quoted attributes, semantic elements (`section`, `article`, `figure`, `time`, `nav`).
  - CSS: alphabetized declarations within a rule (this file consistently does so — match it), custom properties in `:root`, BEM-ish flat class names (`.hero-portrait`, `.role-detail`), mobile breakpoints already defined at `1020px`, `760px`, `480px` — extend within those, don't invent new arbitrary breakpoints unless necessary.
  - JS: small, direct DOM APIs, no globals beyond what's already there, guard clauses (`if (el) {...}`) before touching the DOM.
- Reuse existing CSS custom properties (`--ink`, `--purple`, `--paper`, `--muted`, `--line`, etc.) instead of hardcoding new colors.
- Keep `script.js` minimal and dependency-free; don't introduce a bundler just to add a small interaction.
- Image changes: preserve `width`/`height` attributes and `alt` text conventions; keep the hero image preloaded via `<link rel="preload">` if it changes.
- Don't break anchor-link navigation (`#profile`, `#glouva`, `#experience`, `#contact`) — nav, footer, and buttons all depend on these IDs staying stable.

## Responsive Design Rules

- Design **desktop-first visually, but verify all three breakpoints** already in `style.css`: `max-width: 1020px`, `max-width: 760px`, `max-width: 480px`.
- Any new section or component must include corresponding rules in the existing media query blocks — don't leave a new element unstyled on mobile.
- Respect `prefers-reduced-motion: reduce` — any new animation/transition must be neutralized in that block, matching the existing pattern.
- Keep touch targets reasonably sized (buttons/links already use generous padding — match it) and avoid introducing horizontal scroll (`overflow-x: hidden` is set on `body`; don't fight it by adding wide unconstrained elements).
- Test fluid type via `clamp()` rather than fixed breakpoints where the codebase already does so (headlines, section headings).

## Git Workflow

- Work on the designated feature branch for the task; never commit directly to `main` unless explicitly told to.
- Write clear, descriptive commit messages in imperative mood (e.g. "Update hero copy", "Fix mobile nav spacing"), matching the style of existing history (`git log`).
- Keep commits scoped to one logical change; don't bundle unrelated edits.
- Never force-push, rewrite history, or delete branches without explicit user permission.
- Do not open a pull request unless explicitly asked to.
- Always check `git status`/`git diff` before committing to confirm only intended files changed.

## Quality Checklist

Before considering any change complete, verify:

- [ ] Page opens correctly in a browser with no console errors.
- [ ] Layout checked at desktop, `1020px`, `760px`, and `480px` widths.
- [ ] `prefers-reduced-motion` behavior still works (no motion when enabled).
- [ ] All anchor links (`nav`, footer, buttons) still scroll to the correct section.
- [ ] Meta tags, Open Graph tags, and JSON-LD stay consistent with any content/name/role changes.
- [ ] No hardcoded colors/fonts introduced outside existing CSS custom properties.
- [ ] Images have appropriate `alt` text and explicit `width`/`height`.
- [ ] No unused CSS/JS left behind from the change.
- [ ] Copy proofread for tone, grammar, and factual consistency (dates, titles, company names).

## Security Rules

- Never commit secrets, API keys, analytics tokens, or credentials to this repo — it is a public static site with no backend.
- All external links must use `target="_blank" rel="noopener noreferrer"` (existing pattern) to prevent tab-nabbing.
- Do not introduce third-party scripts, trackers, or embeds without explicit user approval — each addition increases attack surface and privacy exposure on a personal-brand site.
- If adding any form or data submission in the future, never point it at an untrusted or unencrypted endpoint; flag this to the user rather than assuming.
- Keep `CNAME` and DNS-related content untouched unless the user explicitly requests a domain change.

## What Not To Do

- Do not redesign the visual identity, color palette, typography system, or layout structure without explicit instruction.
- Do not add a framework, build tool, or package manager speculatively.
- Do not fabricate biographical details, dates, job titles, or achievements — only use information the user provides or that already exists in the site.
- Do not add stock photography, generic icon packs, or placeholder content.
- Do not remove accessibility features (skip link, focus-visible outlines, `aria-label`s, reduced-motion handling).
- Do not restructure file layout (e.g., moving to `src/`, splitting CSS into modules) unless asked — this is intentionally a flat, simple static site.
- Do not auto-commit or push without being asked to, and never force-push or rewrite shared history.

## How to Report Changes After Implementation

After completing a change, summarize concisely:

1. **What changed** — files touched and a one-line description of each change.
2. **Why** — the goal the change serves (tie back to project purpose/design/copy principles when relevant).
3. **Where verified** — which breakpoints/browsers/states were checked (per the Quality Checklist).
4. **Anything deferred or flagged** — e.g., a copy claim that needs the user's confirmation, a design decision that deviates from existing patterns, or a follow-up worth doing later.

Keep the report short and factual — no marketing language about the work itself.
