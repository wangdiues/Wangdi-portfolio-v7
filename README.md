# Wangdi Portfolio V7

Professional portfolio implementation for Wangdi, built on a reworked Gatsby `v4` baseline.

## Scope

- Public-facing professional portfolio
- Experience timeline
- Case studies
- Publications and manuscripts
- Downloadable CV

## Local Development

1. Install dependencies
   ```sh
   yarn
   ```
2. Start the development server
   ```sh
   yarn develop
   ```
3. Build for production
   ```sh
   yarn build
   ```
4. Build for GitHub Pages
   ```sh
   yarn build:pages
   ```

## Deployment

The site is configured for GitHub Pages at:

```txt
https://wangdiues.github.io/Wangdi-portfolio-v7/
```

The Pages workflow builds with `yarn build:pages`, so Gatsby's `pathPrefix` in `gatsby-config.js` must match the repository name: `/Wangdi-portfolio-v7`.

## Notes

- Add final ResearchGate or other social profile links in `src/config.js` when they are available.
- Replace or add custom imagery if Wangdi-specific photos, maps, or field visuals become available.
