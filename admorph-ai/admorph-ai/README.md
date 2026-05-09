# AdMorph AI — Native In-Game Sponsorship Exchange

> One game world. Infinite sponsor worlds.

AI-powered matchmaking platform that replaces intrusive pop-up ads with native, immersive brand placements by dynamically altering game assets to fit sponsor portfolios.

---

## Quick Start (Frontend Dev)

```bash
cd apps/web
npm install
npm run dev
# → http://localhost:3000
```

### Golden Path (Demo)
1. **`/`** — Landing page with pitch hero
2. **`/developer`** — Developer dashboard: KPIs, Upload Zone, Before/After Slider, Placement Table
3. **`/developer/upload`** — Upload page with AI scan simulation
4. **`/developer/placements`** — Full placement review with approve/deny controls
5. **`/sponsor`** — Sponsor dashboard: Impressions KPIs, Bid history, Game marketplace
6. **`/sponsor/marketplace`** — Filterable game grid with Bid modal + Pingram notification

---

## Project Structure

```
admorph-ai/
├── apps/
│   └── web/                     # Next.js 14 + Tailwind frontend
│       ├── components/
│       │   ├── ui/              # Logo, Skeleton
│       │   ├── dashboard/       # Sidebar, Topbar, StatCard
│       │   ├── developer/       # UploadZone, BeforeAfterSlider, PlacementTable, AIInsightCard
│       │   └── sponsor/         # GameCard, BidModal
│       ├── hooks/
│       │   └── useDashboard.ts  # Data hooks (SWR-ready, mock-powered for demo)
│       ├── lib/
│       │   ├── mockData.ts      # Hardcoded demo data for golden path
│       │   └── utils.ts         # Formatters and badge helpers
│       ├── pages/
│       │   ├── index.tsx        # Landing / hero
│       │   ├── developer/       # Dashboard, Upload, Placements, Analytics
│       │   └── sponsor/         # Dashboard, Marketplace, Bids
│       └── styles/
│           └── globals.css      # Design system, fonts, components
├── packages/
│   └── types/
│       └── index.ts             # Shared TS interfaces
└── .env.example                 # API key template
```

---

## Design System

| Token | Value | Use |
|-------|-------|-----|
| `am-black` | `#080A0F` | Page background |
| `am-surface` | `#0D1017` | Sidebar, header |
| `am-panel` | `#111620` | Cards, panels |
| `am-amber` | `#F5A623` | Primary accent, CTAs |
| `am-green` | `#00D4AA` | Success, approved |
| `am-red` | `#FF4757` | Danger, denied |
| `am-blue` | `#4FC3F7` | Info, scanning |

Fonts: **Bebas Neue** (display), **DM Sans** (body), **JetBrains Mono** (mono/data)

---

## Connecting Real APIs

Each hook in `hooks/useDashboard.ts` has a `// TODO: replace with SWR` comment.

```ts
// From mock:
const t = setTimeout(() => { setData(mockStats.developer); }, 600);

// To real API:
const { data } = useSWR('/api/developer/stats', fetcher);
```

API routes go in `apps/web/pages/api/` — proxy to the Express/Fastify backend in `apps/api/`.

---

## Sponsor Integrations

| Service | Role | Hook point |
|---------|------|------------|
| Cloudinary | Store + serve before/after mockups | `BeforeAfterSlider` image src props |
| Pingram | SMS/Email on bid placement | `BidModal` → `handleBid()` |
| Composio | Pull game repos, sync approved assets | `UploadZone` → `/api/upload` |
| Polarity | Validate injected code safety | Backend service |
| Cystack | Encrypt developer IP + transactions | Backend middleware |
