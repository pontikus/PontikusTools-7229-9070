# Pontikus Boatyard — admin guide

## What is ready
The hub lists all 14 tools; live and planned counts come from the catalogue. Tools 1–4 are live:
- `/tools/postcard`: front/back A6 postcard, four styles and an editable sign-off (default “With love,”).
- `/tools/passport`: up to 12 stamp-style places with date and note, on one A4 page.
- `/tools/journal`: up to seven days, guided prompts and three photographs per day; one A4 page per day.
- `/tools/photo-frame`: caption, location and photographer credit; square or vertical formats.
Tools 5–14 remain planned. They have not been built.

## The files to edit
- `packages/web/src/web/lib/catalogue.ts`: tool names, promises, statuses, audiences, 18 region names and destination URLs.
- Replace `[VERIFY URL]` and `[SUGGESTION FORM URL]` in that file with your real links. Until then, buttons explain that their destination has not been connected.
- `packages/web/src/web/styles.css`: colours, fonts, spacing and responsive rules. Brand colours are at the top.
- `packages/web/public/images/pontikus-logo.png`: your supplied, unchanged logo.
- `packages/web/src/web/components/tool-shell.tsx`: shared four-step layout and frame control.
- `packages/web/src/web/pages/postcard.tsx`: postcard inputs and downloads.
- `packages/web/src/web/lib/postcard-canvas.ts`: the four postcard designs. Both preview and download use this same renderer.
- New makers have their own matching page and canvas files (`passport`, `journal`, `photo-frame`).
- `components/canvas-maker.tsx`: reusable style controls, photo upload, preview and downloads for the new tools.
- `lib/canvas-utils.ts`: explicit loading of all three fonts, effective frame setting, canvas text wrapping, photo handling and PNG/PDF export.
- `packages/web/index.html`: British-English metadata and absolute Open Graph image URL. The image is a public copy of the supplied logo; replace its absolute URL if you host another social-sharing image.

## Frame removal
The lock icon and verified-profile wording are shown. For this review the toggle works without verification. Set `frameRemovalLocked` to `true` in `catalogue.ts` to enable gating on load. A future profile integration can set `settings.gateFrameRemoval = true` at runtime: the setting notifies already-open tools, restores their frame and disables/unchecks the toggle. Every renderer computes `removeFrame && !settings.gateFrameRemoval`; previously saved in-memory choices cannot bypass a locked frame. A real verified-profile entitlement is not connected.

## Downloads and privacy
- PNG download creates a ZIP with separate front and back PNGs, 1748 × 1240 px.
- PDF download creates two A6 landscape pages (148 × 105 mm). Print at actual size; these are not a duplex-imposition or bleed service.
- Passport: 1748 × 2480 PNG, or one A4 PDF page. It is a personal keepsake, not an official travel document.
- Journal: one 1748 × 2480 PNG per day (ZIP for multiple days), or a multi-page A4 PDF.
- Photo Frame: 1080 × 1080 or 1080 × 1920 PNG; PDF paper is 180 × 180 mm or 180 × 320 mm to preserve the ratio. Choose each format and download it separately.
- New tools offer Classic, Midnight and Studio styles. Every PNG/PDF uses the same rendered page canvases as its live preview. All three export fonts are explicitly loaded before drawing; failures are reported rather than silently exporting fallback fonts.
- JPG, PNG and WebP photos up to 20 MB are read locally. Sample photo can be replaced by the user.
- Maker details live in module memory, persist across internal navigation, and clear on refresh. No localStorage, cookies, maker API or database is used by the tools.
- Google Fonts and the sample/static images are fetched for display. The managed platform includes its required analytics infrastructure; the privacy claim refers to maker details and uploaded photos, not to absence of all network activity.

## Hosting
This is a managed Bun/Vite/React project, not a WordPress plugin or standalone HTML bundle. Its maker functionality is client-side. Publishing is supported through the Runable preview UI. GitHub Pages deployment has not been configured or tested; do not assume direct tool URLs will resolve there without static-host route handling.

## Embed in Pontikus / WordPress
Add `?embed=1` to any live tool URL. It hides the site header, footer and “All tools” link while retaining the maker and privacy note. For a WordPress Custom HTML block, replace `[PUBLISHED BOATYARD URL]` below with your actual HTTPS origin (no trailing slash):

```html
<iframe
  src="[PUBLISHED BOATYARD URL]/tools/postcard?embed=1"
  title="Pontikus Postcard Maker"
  width="100%"
  height="1800"
  style="border:0; display:block;"
  loading="lazy"
  allow="downloads"
></iframe>
```

Swap `postcard` for `passport`, `journal` or `photo-frame` and update the title. The iframe has a fixed initial height; long forms can scroll inside it. Avoid a sandbox attribute unless you configure it to permit scripts, same-origin access and downloads.

**Published framing permission: not confirmed.** No published Boatyard URL was available to check. Local embed mode was tested, but that does not establish whether the published site permits embedding on `https://pontikus.com`. The published response must have no blocking `X-Frame-Options` policy, and its CSP `frame-ancestors` must permit `https://pontikus.com` (and `https://www.pontikus.com` if used). Hosting/proxy policy cannot be overridden from React or an HTML meta tag. Check the actual published response headers and test inside Pontikus before launch.

## Stage-two verification
Build and lint pass. All four live tools tested at 390px without horizontal overflow. Embed navigation hiding, runtime gate restoration and PNG/PDF downloads tested. Passport tested at 12 entries; Journal tested at seven days and three photographs, with seven-page A4 PDF and seven PNGs. Tools 5–14 intentionally remain unbuilt.