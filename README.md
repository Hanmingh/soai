# Society of Algorithmic Intelligence — Official Website

This repository contains the source code for the **official website** of the [Society of Algorithmic Intelligence (SoAI)](https://soc-ai.org), published at **[https://soc-ai.org](https://soc-ai.org)**.

The site presents SoAI’s mission, programmes, events (including IntelligenceX), membership, news, and contact information. Content here is intended for public visitors, members, and partners.

---

## Technology

| Area | Choice |
|------|--------|
| UI | [React](https://react.dev/) 19 |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite](https://vite.dev/) 7 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 |
| Components | [Radix UI](https://www.radix-ui.com/) primitives, custom layout |
| Routing | [React Router](https://reactrouter.com/) 7 |

The app is a client-side single-page application. API calls to backend services (for example membership or events) are configured in application code as needed for each environment.

---

## Requirements

- **Node.js** 20.x (aligned with CI; other LTS versions may work)
- **npm** (lockfile: `package-lock.json`)

---

## Local development

```bash
npm ci
npm run dev
```

Vite serves the app with hot module replacement. Open the URL shown in the terminal (typically `http://localhost:5173`).

Other useful commands:

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build (`tsc -b` then `vite build` → `dist/`) |
| `npm run preview` | Serve the `dist/` output locally |
| `npm run lint` | Run ESLint |

---

## Deployment

### Hosting and automation

Production traffic is served by **GitHub Pages**. Deployments are fully automated with **GitHub Actions**.

- **Workflow:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- **Trigger:** push to the `main` branch, or manual **Run workflow** (`workflow_dispatch`)
- **Steps (summary):** checkout → Node 20 → `npm ci` → `npm run build` → write **`dist/CNAME`** with `soc-ai.org` → upload `dist/` as a Pages artifact → deploy with `actions/deploy-pages`

The workflow uses the `github-pages` environment so deployment history and optional protection rules are visible in the repository’s **Environments** settings.

### Custom domain and DNS

The canonical hostname **`soc-ai.org`** is configured for GitHub Pages. The build step writes a [`CNAME`](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) file into `dist/` so GitHub Pages continues to associate the site with that domain after each deploy.

**Domain registration and DNS** are managed at **Namecheap** (registrar). Records there (for example apex `A`/`ALIAS` and `www` as required) must point to GitHub Pages as described in GitHub’s documentation:

- [Configuring a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

After DNS changes, allow for propagation and verify the custom domain under **Repository → Settings → Pages**.

---

## Repository layout (overview)

| Path | Role |
|------|------|
| `src/App.tsx`, `src/main.tsx` | Application shell and entry |
| `src/pages/` | Route-level pages (home, about, events, membership, IntelligenceX, etc.) |
| `src/components/` | Shared UI and layout (header, footer, sections) |
| `src/data/` | Static data modules (events, news, membership tiers, etc.) |
| `src/lib/` | Utilities and API helpers |
| `public/` | Static assets served as-is |

---

## Contributing and releases

1. Work on a branch, open a pull request against `main`, and ensure `npm run build` and `npm run lint` succeed.
2. Merging to **`main`** triggers a new GitHub Pages deployment automatically.

For infrastructure changes (Actions secrets, environment protection, or Namecheap DNS), coordinate with repository administrators.

---

## Support

For questions about the Society or this website, use the contact options listed on **[soc-ai.org](https://soc-ai.org)**.
