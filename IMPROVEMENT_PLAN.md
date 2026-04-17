# Portfolio Improvement Plan — Wangdi v7

_Last updated: 2026-04-17_

Full audit covered all 6 section components, 17 content markdown files, styles, config, and static assets. Improvements are grouped into four tiers by impact and effort.

---

## TIER 1 — Critical Fixes (breaks accuracy or trust)

### 1.1 Fix data consistency across sections

- Hero impact strip says "11 Publications & manuscripts" — correct, but About section says "2 papers published and 5 manuscripts under review" which is now stale copy. Sync the wording.
- Hero h3 subtitle still references old text on cached deployments — confirm live after hard refresh.

### 1.2 Render external link on case study cards

- `featured.js` queries `external` from frontmatter but never renders it.
- Add a linked "View Report / Full Document →" button on each card that has an `external` field.

### 1.3 Add LinkedIn to contact section

- `config.js` already has the LinkedIn URL in `socialMedia` array.
- Contact section only shows ORCID. Add LinkedIn link using the same data source.

---

## TIER 2 — High Impact UX (makes it demonstrably better)

### 2.1 Publications filter bar

- Add three toggle buttons above the publications grid: **All | Published | Under Review | In Preparation**
- Filter client-side using React state — no new data fetching.
- Highlight active filter in green. Animate cards in/out with a fade.
- This is the single most impactful UX change — reviewers scanning the portfolio will immediately see the under-review pipeline.

### 2.2 Active section indicator in nav

- Nav currently shows no indication of which section the user is in.
- Use an `IntersectionObserver` (already available via ScrollReveal setup) to track active section.
- Highlight the matching nav link (underline or color shift on the label, not the number).

### 2.3 Publication card — full card clickable

- Currently only the small "View Manuscript" button and the external icon link are clickable.
- Wrap the card in a link (or add a `cursor: pointer` + `onClick` handler) that opens the PDF or external URL if available.
- On hover, shift the card border color to full green (currently `lightest-navy`).

### 2.4 Status badge visual differentiation

- All three statuses (Published, Under Review, In Preparation) use identical green border styling.
- **Published** → solid green background, dark text (highest visual weight)
- **Under Review** → current style (green border, transparent fill)
- **In Preparation** → muted slate border, slate text (lowest visual weight)
- Makes scanability immediate for grant reviewers.

### 2.5 Case study cards — show recency and external link

- Add the `date`/year from frontmatter to the case study panel (currently invisible).
- Render the `external` field as a "View Full Report" button in the right panel.
- This makes provenance and deliverable linkage clear.

### 2.6 Hero impact strip — wire to real data

- Replace the four hardcoded `<span>` values with values derived from GraphQL at build time.
- Publications count → count of all `content/publications/*.md` files.
- This removes the risk of metrics going stale after content updates.

---

## TIER 3 — Depth and Completeness (makes it world-class)

### 3.1 Research timeline section (new section)

- A chronological timeline combining: publications, case studies, and experience milestones.
- Rendered as a vertical timeline between About and Experience.
- Each node: year label on left, brief title + category tag on right.
- Categories: `Research` (green), `Field Work` (blue-slate), `Planning` (muted).
- Gives reviewers an instant longitudinal view of output — critical for scholarship applications.

### 3.2 Methods / Tools showcase on About

- Current skills list is a static 10-item grid. Replace with two groups:
  - **Field & Analytical Methods** (camera trapping, occupancy modelling, SDM, forest inventory, vulnerability assessment)
  - **Software & Platforms** (QGIS, ArcGIS, GEE, Python, R, MaxEnt)
- Visual: two distinct pill-tag rows, not a generic bullet grid.

### 3.3 Scroll progress bar

- A thin green line across the very top of the viewport (above nav) that fills as user scrolls.
- Low-effort (single `useEffect` + scroll listener), high visual polish signal.
- Reinforces the depth of the portfolio — user can see they're reading a long, substantive document.

### 3.4 Open Graph image update

- Current `og.png` is likely the default Brittany Chiang template image.
- Create a custom OG card: dark navy background, "Wangdi | Ecologist & Conservation Researcher", accent line in green, institution text.
- Affects every share/preview of the portfolio URL on LinkedIn, email, messaging apps.

### 3.5 Footer with full social links

- Add a minimal footer below the contact section: ORCID | LinkedIn | Email — with icons.
- Currently the site has no footer at all; the page just ends at the Contact section CTA.

### 3.6 PDF naming consistency

- Rename static PDF files to match publication slugs for maintainability:
  - `01_manuscript.pdf` → `fundamental-realized-habitat.pdf`
  - `01_manuscript_jvs.pdf` → `vegetation-community.pdf`
  - `manuscript_ecology_evolution.pdf` → `climate-habitat-elephants.pdf`
  - `Manuscript_revised_MAIN.pdf` → `ecosystem-integrity.pdf`
  - `Wangdi_etal_FEM_2026_main.pdf` → `forest-gradient-bhutan.pdf`
- Update the `pdf` field in each publication markdown file accordingly.

---

## TIER 4 — Polish and Future-Proofing (long-term quality)

### 4.1 Add `slug` frontmatter to publications for individual pages

- Currently all publications are shown only in the grid.
- Add Gatsby `createPages` logic to generate `/publications/[slug]` pages.
- Each page: full abstract, methods, results, tags, PDF embed (via `<iframe>`), citation block.
- Makes individual publications linkable and shareable — important for co-authors and reviewers.

### 4.2 SEO metadata per section

- Add `react-helmet` metadata for section anchors where possible.
- Ensure `description` and `og:description` in siteMetadata is kept updated.
- Add `twitterUsername` if relevant (or remove the empty config key).

### 4.3 Centralize breakpoints

- Breakpoint values (`480px`, `768px`, `1080px`) are scattered across all styled-components.
- Move to `theme.bp` object and use `${({ theme }) => theme.bp.tabletL}` syntax throughout.
- No visual change, but dramatically easier future responsive edits.

### 4.4 Remove unused CSS variables

- `--pink` and `--blue` defined in `variables.js` but never used anywhere.
- Remove to reduce dead code in the stylesheet.

### 4.5 Print stylesheet for CV use

- Add `@media print` rules that:
  - Show only About and Publications sections
  - Remove nav, hero animations, contact section
  - Force black text on white background
  - Expand all collapsed/hidden content
- Lets someone print the page as a readable research summary.

### 4.6 Analytics

- Add privacy-respecting analytics (Plausible or Fathom) to understand which sections and publications get the most attention.
- One `<script>` tag via `gatsby-plugin-plausible` or injected in `gatsby-ssr.js`.
- No GDPR cookie issues with Plausible.

---

## Implementation Order

| #   | Change                               | Files affected                      | Effort |
| --- | ------------------------------------ | ----------------------------------- | ------ |
| 1   | Fix data consistency (About copy)    | `about.js`                          | 10 min |
| 2   | Render external link on case studies | `featured.js`                       | 20 min |
| 3   | Add LinkedIn to contact              | `contact.js`                        | 15 min |
| 4   | Status badge visual differentiation  | `publications.js`                   | 20 min |
| 5   | Publications filter bar              | `publications.js`                   | 45 min |
| 6   | Full card clickable on hover         | `publications.js`                   | 20 min |
| 7   | Active section nav indicator         | `nav.js`                            | 45 min |
| 8   | Case study recency + external link   | `featured.js`                       | 30 min |
| 9   | Hero metrics from GraphQL            | `hero.js`                           | 45 min |
| 10  | Scroll progress bar                  | new hook + layout                   | 30 min |
| 11  | Methods/skills groups in About       | `about.js`                          | 20 min |
| 12  | Research timeline section            | new section component + content     | 3 hrs  |
| 13  | Footer component                     | new component                       | 45 min |
| 14  | OG image update                      | `static/og.png`                     | design |
| 15  | PDF renaming                         | `static/publications/`, 5 md files  | 20 min |
| 16  | Individual publication pages         | `gatsby-node.js`, new page template | 3 hrs  |
| 17  | Centralize breakpoints               | all section components              | 2 hrs  |
| 18  | Print stylesheet                     | `GlobalStyle.js`                    | 30 min |
| 19  | Analytics                            | `gatsby-config.js`                  | 15 min |

---

## What "state of the art" looks like when complete

- A conservation reviewer opens the portfolio and immediately sees the impact strip backed by live data.
- They click "Under Review" on the publications filter and instantly see the 5 manuscripts with PDF buttons.
- They scroll the research timeline and see 5+ years of output density — field work, planning, research — in one linear view.
- Each publication card has a clear visual status (solid green = published, outlined = in review, muted = in prep).
- Sharing the URL on LinkedIn produces a custom branded card with Wangdi's name and role.
- The nav always shows where they are in the page.
- The footer closes the page professionally with all contact handles.

No competing portfolio in Bhutan's conservation sector will have this level of design + research depth integration.
