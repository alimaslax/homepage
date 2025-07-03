# React Resume
Uses the following frameworks, and libraries
NextJs
ZuStand


## Structure
```Bash
my-app/
│
├── public/                   # Static assets (images, favicons, robots.txt, etc.)
│
├── src/                      # Main source folder
│   ├── pages/                # Next.js routes (each file = route)
│   │   ├── api/              # API routes (serverless functions)
│   │   │   └── resume.ts     # Example API handler
│   │   ├── _app.tsx          # Custom App component
│   │   ├── _document.tsx     # Custom Document (optional)
│   │   ├── index.tsx         # Landing page
│   │   └── contact.tsx       # Example page
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx
│   │   └── ContactForm.tsx
│   │
│   ├── features/             # Redux features (RTK slice modules)
│   │   └── profile/
│   │       ├── siteSlice.ts  # Redux slice
│   │       └── types.ts      # Types for slice
│   │
│   ├── store/                # Redux store setup
│   │   ├── store.ts
│   │   └── hooks.ts          # Typed useDispatch/useSelector
│   │
│   ├── lib/                  # Utilities, API clients, helpers
│   │   └── apiClient.ts
│   │
│   ├── styles/               # CSS, SCSS, Tailwind, or CSS modules
│   │   ├── globals.css
│   │   └── layout.css
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── useScroll.ts
│   │
│   ├── types/                # Global TypeScript types/interfaces
│   │   └── index.ts
│   │
│   └── constants/            # Static configs/constants
│       └── routes.ts
│
├── .env.local                # Local environment variables
├── next.config.js            # Next.js config
├── tsconfig.json             # TypeScript config
├── package.json
└── README.md
```

## Env Variables
.env file contains
``` bash
NEXTAUTH_URL=http://localhost:3000
OKTA_CLIENTID=
OKTA_CLIENTSECRET=
OKTA_ISSUER=https://{domain}
NEXTAUTH_SECRET=

```

## OKTA through NextAuth

Okta settings
Allowed Callbacks
```bash
http://localhost:3000/api/auth/callback/okta,
https://url.com/api/auth/callback/okta
```
Allowed Logout Urls
```bash
http://localhost:3000,
https://url.com
```
Allowed Web Origin
```bash
http://localhost:3000,
https://url.com
```


=======
