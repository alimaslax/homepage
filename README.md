# React Resume

A statically generated resume and portfolio site built with Next.js 13, TypeScript, and Zustand. Pages render from JSON data, while NextAuth (Okta), Sendinblue, and Google reCAPTCHA power the authenticated and contact experiences.

## Highlights

- Next.js 13 app with pre-rendered resume, social, and contact pages.
- Global state managed by `zustand` for UI state across components.
- Authentication via NextAuth with the Okta provider.
- Contact form routes email through Sendinblue with reCAPTCHA verification.
- Jest test suite covering components, pages, and Zustand store logic.

## Getting Started

### Prerequisites

- Node.js 18+ (14+ technically supported, 18 LTS recommended)
- npm 8+ or Yarn 1.x

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
2. Copy `.env.example` to `.env.local` (create the example file from the table below if it does not exist) and fill in credentials.
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Visit `http://localhost:3000`.

### Environment Variables

Create `.env.local` with the following keys:

| Variable | Description |
| --- | --- |
| `NEXTAUTH_URL` | Local or deployed site URL, e.g. `http://localhost:3000`. |
| `NEXTAUTH_SECRET` | Secret used by NextAuth (generate with `openssl rand -base64 32`). |
| `OKTA_CLIENTID` | Okta application client ID. |
| `OKTA_CLIENTSECRET` | Okta application client secret. |
| `OKTA_ISSUER` | Okta issuer URL, e.g. `https://dev-123456.okta.com/oauth2/default`. |
| `SENDINBLUE_APIKEY` | API key for Sendinblue transactional email. |
| `GOOGLE_RECAPTCHASITEKEY` | Secret for verifying reCAPTCHA tokens. |

#### Okta Configuration

Use these values inside the Okta dashboard for your application:

- Allowed callback URLs: `http://localhost:3000/api/auth/callback/okta`, `https://{your-domain}/api/auth/callback/okta`
- Allowed logout URLs: `http://localhost:3000`, `https://{your-domain}`
- Allowed web origins: `http://localhost:3000`, `https://{your-domain}`

## Project Structure

```text
.
├── components/          # Presentational and layout components
├── data/                # Resume JSON consumed during build
├── pages/               # Next.js routes and API endpoints
│   ├── api/             # Contact, static data, auth, verification
│   ├── index.tsx        # Landing page (About)
│   ├── resume.tsx       # Resume view
│   └── ...              # Contact, social, notebook pages
├── public/              # Static assets and PDFs
├── server/              # Server-side helpers for data loading
├── store/               # Zustand store definitions
├── styles/              # Global CSS stylesheets
└── __tests__/           # Jest test suites
```

Key JSON files:

- `data/resumeData.json`: resume and portfolio content.
- `public/resumeData.json`: client-facing snapshot served from `/resumeData.json`.
- `data/data.json`: supplemental data for components and API routes.

## Available Scripts

- `npm run dev` – start Next.js in development mode with hot reload.
- `npm run build` – create an optimized production build.
- `npm start` – serve the production build locally.
- `npm test` / `npm run test:watch` / `npm run test:coverage` – execute the Jest suite.
- `npm run test:run` – use the custom test runner defined in `scripts/test-runner.js`.

## Testing

Tests live under `__tests__/` and use `jest` with the `jsdom` environment. To run once:

```bash
npm test
```

For continuous feedback while developing:

```bash
npm run test:watch
```

Coverage reporting is available through `npm run test:coverage`.

## Customising Content

- Update resume content in `data/resumeData.json`; rebuild or rerun the dev server to see changes.
- Adjust social links, biography, or feature highlights by editing components in `components/`.
- Replace assets under `public/` (images, PDFs) as needed.

## Deployment

1. Build the project with `npm run build`.
2. Deploy the generated `.next` output to Vercel, Netlify, or any Node-compatible hosting.
3. Ensure all environment variables are configured in the target platform.

## License

Distributed under the MIT License. See `LICENSE` for details.
