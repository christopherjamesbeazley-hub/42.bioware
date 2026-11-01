# 42 Bioware

Static website for 42 Bioware and Project Janus.

## Build

Run `node build-site.mjs` with Node.js 22 or newer. The build copies the website assets into `dist/`; no dependencies are required.

## Netlify

Connect this repository to the existing Netlify project, using branch `main`. The root `netlify.toml` specifies the build command and `dist` publish directory. Enable form detection before deploying.

The `bioware-inquiry` form collects name, email, optional organisation and phone, interest, message, and contact permission. Netlify handles submissions and spam filtering. Review submissions in the project's Forms area; configure notification recipients there if desired.

The message helper uses browser-local templates; no AI service or API key is needed. Local previews block submission. Verify form detection and submit a clearly labelled test inquiry after deployment before relying on live collection.

## Updates

Edit the source files, run `node --check script.js` and `node build-site.mjs`, then commit and push to `main`. Once Netlify is linked, pushes trigger deployment. Generated `dist/` files are not committed.
