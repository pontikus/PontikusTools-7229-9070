# Pontikus Boatyard — stage-one guide

## What is ready
The hub lists all 14 tools. Postcard Maker is live at `/tools/postcard`. The other 13 routes show a clear planned-state page. No other maker has been implemented yet.

## The files to edit
- `packages/web/src/web/lib/catalogue.ts`: tool names, promises, statuses, audiences, 18 region names and destination URLs.
- Replace `[VERIFY URL]` and `[SUGGESTION FORM URL]` in that file with your real links. Until then, buttons explain that their destination has not been connected.
- `packages/web/src/web/styles.css`: colours, fonts, spacing and responsive rules. Brand colours are at the top.
- `packages/web/public/images/pontikus-logo.png`: your supplied, unchanged logo.
- `packages/web/src/web/components/tool-shell.tsx`: shared four-step layout and frame control.
- `packages/web/src/web/pages/postcard.tsx`: postcard inputs and downloads.
- `packages/web/src/web/lib/postcard-canvas.ts`: the four postcard designs. Both preview and download use this same renderer.

## Frame removal
The lock icon and verified-profile wording are shown. For this review the toggle works without verification, as requested. `gateFrameRemoval: true` disables it. A real verified-profile entitlement is not connected.

## Downloads and privacy
- PNG download creates a ZIP with separate front and back PNGs, 1748 × 1240 px.
- PDF download creates two A6 landscape pages (148 × 105 mm). Print at actual size; these are not a duplex-imposition or bleed service.
- JPG, PNG and WebP photos up to 20 MB are read locally. Sample photo can be replaced by the user.
- Maker details live in module memory, persist across internal navigation, and clear on refresh. No localStorage, cookies, maker API or database is used by the tools.
- Google Fonts and the sample/static images are fetched for display. The managed platform includes its required analytics infrastructure; the privacy claim refers to maker details and uploaded photos, not to absence of all network activity.

## Hosting
This is a managed Bun/Vite/React project, not a WordPress plugin or standalone HTML bundle. Its maker functionality is client-side. Publishing is supported through the Runable preview UI. GitHub Pages deployment has not been configured or tested; do not assume direct tool URLs will resolve there without static-host route handling.

## Next review
Check the hub, four styles, photo upload, front/back preview, frame control and both download types. The remaining 13 makers are intentionally held until approval.