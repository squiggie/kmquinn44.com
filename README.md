# K.M. Quinn — The Torn Robes Series

Official website for K.M. Quinn, author of the award-winning *Torn Robes* literary fiction series. Features book information, character blog, author journey, event listings, and reader reviews.

**Live Site**: [kmquinn44.com](https://kmquinn44.com)

---

## About This Site

A beautifully designed, modern author website showcasing K.M. Quinn's literary works with:
- **Finox-inspired aesthetic** — bold typography, image-forward design, warm literary atmosphere
- **Full book catalog** — Per-book landing pages with editions, descriptions, and reader reviews
- **Blog** — Character spotlights, story notes, and writing reflections with featured images
- **Author story** — Complete about page with K.M. Quinn's journey, family, values, and inspirations
- **Events** — Creative image-forward layouts showcasing author appearances and literary gatherings
- **Contact** — Two-column form + social links (LinkedIn, Instagram, Facebook, Truth Social)
- **Review system** — Integrated reader testimonials with 5-star ratings

---

## Tech Stack

- **Astro 4** — Static site generation with hybrid SSR for forms
- **@astrojs/node** — Server adapter for SFTP deployment
- **Tailwind CSS** — Responsive utility-first styling
- **Nodemailer** — Server-side contact form email delivery
- **GitHub Actions** — Automated build & deploy to SFTP on every push to main

---

## Project Structure

```
src/
├── pages/                    # Site pages
│   ├── index.astro          # Homepage (hero + books + author bio)
│   ├── about-me/            # Author story (hero + timeline + family)
│   ├── blog/                # Blog grid with featured images
│   ├── books/               # Books showcase + reviews
│   │   ├── torn-robes-choices/
│   │   ├── torn-robes-reckoning/
│   │   └── torn-robes-kings-highway/
│   ├── contact-me/          # Contact form + social links
│   ├── events/              # Events with image galleries
│   └── [slug]/              # Generic CMS pages
├── components/              # Reusable components
│   ├── SiteHeader.astro     # Navigation
│   ├── SiteFooter.astro     # Footer
│   ├── ReviewCard.astro     # Review display component
│   └── ...
├── content/                 # Content collections (Astro)
│   ├── pages/               # CMS pages (markdown)
│   ├── reviews/             # Reader testimonials
│   └── config.ts            # Collection schemas
├── styles/                  # Global CSS
└── lib/                     # Helper functions

public/
├── images/                  # Static images (book covers, author photo, etc)
└── ...
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

Deploys to SFTP automatically on every push to `main` branch via GitHub Actions.

### Required GitHub Secrets
Add these in your GitHub repository settings → Secrets and variables → Actions:

```
SFTP_HOST        — SFTP server hostname
SFTP_USER        — SFTP username
SFTP_PASSWORD    — SFTP password
SFTP_PORT        — SFTP port (usually 22)
SFTP_REMOTE_PATH — Remote directory (e.g., /public_html/)
```

The workflow:
1. Checks out code
2. Installs dependencies
3. Builds the site to `dist/`
4. Deploys `dist/` folder to SFTP server

See `.github/workflows/deploy.yml` for details.

---

## Content

### Pages
Content is managed in `src/content/pages/` as markdown files. Add or edit `.md` files and they'll automatically become pages.

### Reviews
Reader testimonials live in `src/content/reviews/`. Schema:
- `book` — Which book (string, e.g., "Torn Robes: Choices")
- `author` — Reviewer name
- `rating` — 1-5 stars
- `text` — Review text
- `source` — Where it came from (enum: amazon, goodreads, custom)
- `sourceUrl` — Link to original review
- `featured` — Display on books page (boolean)

### Blog
Posts are markdown files in `src/content/posts/`. The blog page automatically:
- Extracts the first image from post content as featured image
- Calculates reading time
- Displays in a card grid with staggered animations

---

## Design System

### Colors
Warm literary palette using CSS custom properties:
- `--color-accent` — Rust/brown accent (book metaphor)
- `--color-muted` — Soft text colors
- `--color-line` — Subtle borders
- `--color-paper` — Light cream backgrounds

### Typography
- **Display**: Fraunces (serif) — headings, titles
- **Body**: Plusjakarta Sans — body text, UI

### Animations
- Fade-up entrance animations on page load
- Staggered delays for visual flow
- Subtle hover effects on interactive elements

---

## Navigation

Main menu (reordered for reader experience):
1. Books
2. Blog
3. Events
4. About
5. Contact

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid, Flexbox, CSS Variables
- Mobile-first responsive design

---

## License

© K.M. Quinn. All rights reserved.

```bash
cp -r _template/ ../your-new-project
cd ../your-new-project
npm install
```

Update these files with your project details:
- `astro.config.mjs` — set `site` to your domain
- `package.json` — set `name`
- `src/layouts/Layout.astro` — update brand name, nav links

---

### 2. GitHub repository secrets

Go to **repo Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|---|---|
| `SSH_HOST` | Your server IP or hostname |
| `SSH_PORT` | SSH port (usually `22`) |
| `SSH_USER` | cPanel username |
| `SSH_PRIVATE_KEY` | Private SSH key (contents of `id_rsa`) |
| `SSH_PASSPHRASE` | SSH key passphrase (leave blank if none) |
| `APP_PATH` | Full path to app on server e.g. `/home/user/nodesite` |

#### Generating an SSH key for deployment
```bash
ssh-keygen -t rsa -b 4096 -C "deploy@yourdomain.com" -f deploy_key
# Add deploy_key.pub contents to server: ~/.ssh/authorized_keys
# Add deploy_key contents to GitHub secret: SSH_PRIVATE_KEY
```

---

### 3. DNS (Squarespace or other registrar)

Add an **A record** pointing to your server's IP:

| Host | Type | Value |
|---|---|---|
| `@` or `www` | A | your server IP |
| `staging` | A | your server IP (for staging subdomain) |

> Find your server's real IP in cPanel dashboard or via `curl ifconfig.me` over SSH.
> Do NOT use the IP from a Netlify-hosted site — it will be a Netlify IP, not your server.

---

### 4. cPanel — create the subdomain

1. **Domains → Subdomains** (or Domains in newer cPanel)
2. Create subdomain: `staging` (or whatever you need)
3. Set document root to your app folder (e.g. `nodesite`)

---

### 5. cPanel — Setup Node.js App

Go to **Software → Setup Node.js App → Create Application**:

| Field | Value |
|---|---|
| Node.js version | 20 (or highest available) |
| Application mode | Production |
| Application root | `/home/YOUR_USER/nodesite` |
| Application URL | `staging.yourdomain.com` |
| Application startup file | `app.js` |

Click **Create**, then click **Run NPM Install**.

> **Why `app.js` and not `dist/server/entry.mjs`?**
> Passenger loads the startup file via `require()`. Astro's `dist/server/entry.mjs`
> uses top-level await which crashes with `ERR_REQUIRE_ASYNC_MODULE`. `app.js` uses
> a dynamic `import()` which works correctly with Passenger's CJS loader.

---

### 6. `.htaccess` on the server

**Never deploy `.htaccess` via CI/CD** — cPanel appends Passenger directives to it
automatically and deploying will wipe them out.

Manage it manually in **cPanel → File Manager**. See `htaccess.example` for reference.

After setting up the Node.js app in cPanel, your `.htaccess` should contain both
your custom headers AND the auto-generated Passenger block at the bottom.

---

### 7. Create `.env` on the server

SSH into the server or use File Manager to create `.env` in your app root.
Copy from `.env.example` and fill in real values:

```bash
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-password
TO_EMAIL=you@yourdomain.com
```

> `.env` is excluded from both `.gitignore` and the rsync deploy — it must be
> created manually on the server and never committed.

---

### 8. Deploy

Push to `main` — GitHub Actions will:
1. Run `npm ci` and `npm run build`
2. rsync the built files (including `dist/`) to the server
3. Touch `tmp/restart.txt` to trigger a Passenger restart

Watch the deploy at: `https://github.com/YOUR_ORG/YOUR_REPO/actions`

---

## How forms work

Forms POST to `/api/contact` (or your custom endpoint in `src/pages/api/`).
The endpoint:
1. Checks the honeypot field (spam protection)
2. Validates required fields
3. Sends a notification email to `TO_EMAIL` via nodemailer
4. Redirects to `/thank-you/`

SMTP credentials come from environment variables — set them in `.env` on the server.

---

## Project structure

```
├── .github/workflows/deploy.yml  # CI/CD pipeline
├── src/
│   ├── layouts/Layout.astro       # Base HTML layout
│   ├── pages/
│   │   ├── index.astro            # Home page
│   │   ├── contact.astro          # Contact form
│   │   ├── thank-you.astro        # Post-submission redirect
│   │   └── api/
│   │       └── contact.ts         # Nodemailer form handler (SSR)
├── public/                        # Static assets
├── app.js                         # Passenger entry point
├── astro.config.mjs               # Astro + node adapter config
├── .env.example                   # Document required env vars
├── htaccess.example               # Server .htaccess reference
└── .gitignore                     # Excludes node_modules, dist, .env
```

---

## Common gotchas

| Problem | Cause | Fix |
|---|---|---|
| Connection timeout | Wrong IP in DNS A record | Get real server IP from cPanel dashboard |
| Directory listing instead of app | Passenger not configured | Set up Node.js App in cPanel, check `.htaccess` has Passenger directives |
| `ERR_REQUIRE_ASYNC_MODULE` | Startup file set to `entry.mjs` | Change startup file to `app.js` |
| `Cannot find package 'kleur'` | `node_modules` missing on server | Click "Run NPM Install" in cPanel Node.js App |
| node_modules conflict with nodevenv | Deploy script ran `npm install` | Build in CI, never run `npm install` on server via deploy script |
| AutoSSL failing | Domain pointing to wrong server | Fix DNS A record to point to actual cPanel server IP |
| `.htaccess` wiping Passenger config | rsync deploying `.htaccess` | Exclude `.htaccess` from rsync (already done in this template) |
