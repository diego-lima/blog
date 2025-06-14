# Technical Memory: Diego Lima's Blog

## Tech Stack & Architecture
This is a monorepo managed with Bun Workspaces. The primary application is a personal blog built with Astro.

- **Monorepo Manager**: Bun
- **Framework**: Astro (Static Site Generator)
- **UI Component Framework**: React (`@astrojs/react`)
- **UI Library**: shadcn/ui on top of Radix UI.
- **Styling**: Tailwind CSS
- **Linting & Formatting**: Biome
- **Language**: TypeScript

## Project Structure
- `src/content/blog/`: Contains the Markdown files for blog posts (Astro Content Collections).
- `src/components/`: Contains UI components, including `shadcn/ui` components.
- `src/layouts/`: Astro layout components.
- `src/pages/`: Astro page components.
- `astro.config.mjs`: Astro configuration file.
- `package.json`: Manages website-specific dependencies.
- `0build.sh`: A script to build the static site.
- `0deploy.sh`: A script to deploy the static site to the hosting provider.

## Deployment & Hosting (Static)

The project has been configured for static deployment to `pico.sh`. The deployment process is managed by the `./0build.sh` and `./0deploy.sh` scripts.

- **Hosting Platform**: `pico.sh` (using the `pgs.sh` service).
  - The URL is constructed based on the pico.sh username and the `rsync` destination path. For a user `diegolm` and a destination of `pgs.sh:/blog/`, the resulting URL is `https://diegolm-blog.pgs.sh`.
- **Build Configuration**: The `astro.config.mjs` file is set to `output: 'static'`.
- **Build Script**: `./0build.sh`
- **Deployment Script**: `./0deploy.sh`

  The `./0deploy.sh` script uses the following command:
  ```bash
  rsync -rv --delete dist/ pgs.sh:/blog/
  ```
  *Note: The trailing slash on the destination path is crucial. It ensures the contents of the `dist` directory are copied into `/blog`, rather than creating a `dist` directory within `/blog`.*

### Custom Domain (diegolm.dev)

The custom domain is managed through Cloudflare with the following DNS records:

1.  **CNAME Record**:
    - **Type**: `CNAME`
    - **Name**: `@` (for the root domain `diegolm.dev`)
    - **Target**: `pgs.sh`
    - **Proxy status**: Proxied

2.  **TXT Record**:
    - **Type**: `TXT`
    - **Name**: `_pgs`
    - **Content**: `"diegolm-blog"` 