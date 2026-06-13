# DeFi Copilot

> A Next.js MCP-style server and dashboard for Base DeFi portfolio analytics, with an x402 pay-per-call flow.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)

## Overview
DeFi Copilot is the MVP foundation for a portfolio-intelligence tool on Base: read DeFi positions, explain risk, compare yield, and prepare transparent transaction batches for explicit user approval. It ships as a Next.js (App Router) app that exposes both a browser dashboard and a set of JSON HTTP endpoints, including an MCP-compatible tool endpoint and an x402 "payment required" flow for paid analysis runs. The current build is a scaffold backed by local seed data; the live portfolio reads and on-chain actions are not yet implemented.

## Features
- Server-rendered dashboard with wallet/action controls, portfolio metrics, workflow, MCP tool list, and a records surface.
- File-backed portfolio registry: list, create, quote, and run paid analysis, with receipts recorded per paid run.
- x402 payment flow that returns `402 Payment Required` until a payment is provided.
  - `demo` mode accepts an `x-demo-payment` header so the paid loop can be exercised locally without funds.
  - `strict` mode requires a real `x-payment` header and calls a configured facilitator's `/verify` and `/settle` endpoints before releasing results.
- MCP-compatible JSON endpoint that lists tools and serves discovery, quote, prepared-run, and stats calls.
- Product status endpoint that returns dashboard data and aggregate stats.
- Smoke-test script covering create, list, quote, unpaid lock, paid unlock, receipt, and an MCP quote.

> Note: portfolio data is seeded from local JSON and persisted to a JSON file. The "analyze" tools filter that seed data — there are no live on-chain reads, risk scoring, or transaction preparation yet, and the dashboard's wallet button is static UI.

## Tech stack
- **Next.js 16** (App Router) and **React 19**
- **TypeScript**
- **lucide-react** for icons
- Node.js `fs`/`crypto` for file-backed storage and payment hashing (no external database client)

## Architecture
- `app/` — App Router UI (`page.tsx`, `layout.tsx`, `globals.css`) and API routes under `app/api/`.
- `lib/mvp-store.ts` — owns records, aggregate stats, JSON-file persistence, and receipts.
- `lib/mvp-payment.ts` — builds x402 payment requirements and verifies demo or facilitator-backed payments.
- `lib/project-data.json` — seed dashboard content (name, metrics, workflow, tools, records).
- `lib/types.ts` — shared dashboard types.
- `scripts/smoke-test.mjs` — end-to-end HTTP smoke test against a running server.
- `docs/` — architecture, UI system, roadmap, and demo notes.

## Getting started

### Prerequisites
- Node.js 20+ (the project targets modern Next.js and pins `@types/node` 24).
- npm (a `package-lock.json` is committed).

### Installation
```bash
npm install
```

### Configuration
Copy `.env.example` to `.env.local` and set the values you need. The committed example lists:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_CHAIN_ID` | Base chain id (default `8453`). |
| `BASE_RPC_URL` | Base RPC endpoint. |
| `BASE_ACCOUNT_CLIENT_ID` | Base Account client id. |
| `BASE_MCP_URL` | Base MCP server URL. |
| `X402_FACILITATOR_URL` | x402 facilitator base URL used in `strict` mode for `/verify` and `/settle`. |
| `X402_RECEIVING_ADDRESS` | Payout address used in payment requirements. |
| `X402_DEFAULT_NETWORK` | Default x402 network label. |
| `DEFI_COPILOT_PAYMENT_MODE` | `demo` (default) or `strict`. |
| `DEFI_COPILOT_X402_NETWORK` | x402 network for payment requirements (default `eip155:8453`). |
| `DEFI_COPILOT_DATA_FILE` | Override the local data-file path for isolated runs. |
| `DATABASE_URL` | Reserved; not currently read by the app. |
| `REDIS_URL` | Reserved; not currently read by the app. |
| `NEXT_PUBLIC_APP_URL` | Public app URL. |

Never commit real secret values.

Local data is written to `.data/defi-copilot-db.json` by default (or `/tmp` on Vercel). Set `DEFI_COPILOT_DATA_FILE` to point elsewhere.

### Running
```bash
npm run dev -- -p 3007
```
Then open `http://127.0.0.1:3007`.

Production build and start:
```bash
npm run build
npm run start
```

## Usage

### HTTP API
- `GET /api/defi-copilot/status` — dashboard data and aggregate stats.
- `GET /api/defi-copilot/wallets` — list portfolios.
- `POST /api/defi-copilot/wallets` — create a portfolio (returns `201`).
- `GET /api/defi-copilot/wallets/:slug/quote` — return the x402 payment requirement for a portfolio.
- `POST /api/defi-copilot/wallets/:slug/run` — run paid analysis; returns `402 Payment Required` until payment is provided, then records a receipt and emits a `payment-response` header.

### MCP endpoint
- `GET /api/mcp/defi-copilot` — list available tools.
- `POST /api/mcp/defi-copilot` — invoke a tool. Supported tools include discovery/search (`analyze_portfolio`, `rank_yield_options`, `score_position_risk`, `prepare_rebalance`, `list_wallets`), plus `get_portfolio_quote`, `prepare_portfolio_run`, and `get_defi_copilot_stats`.

Example — invoke a stats tool:
```bash
curl -s http://127.0.0.1:3007/api/mcp/defi-copilot \
  -H 'content-type: application/json' \
  -d '{"tool":"get_defi_copilot_stats"}'
```

Example — exercise the paid run in demo mode:
```bash
curl -s -X POST http://127.0.0.1:3007/api/defi-copilot/wallets/idle-usdc/run \
  -H 'x-demo-payment: accepted'
```

## Testing
The smoke test exercises the full create → quote → unpaid-lock → paid-unlock → receipt flow against a running server:
```bash
npm run test:smoke
```
It targets `http://127.0.0.1:3007` by default (override with `DEFI_COPILOT_BASE_URL`). Start the dev server first.

Type-check the project:
```bash
npm run typecheck
```

## Project structure
```
app/
  api/
    defi-copilot/        # status, wallets (list/create/quote/run)
    mcp/defi-copilot/    # MCP tool endpoint
  layout.tsx page.tsx globals.css
lib/
  mvp-store.ts mvp-payment.ts types.ts project-data.json
scripts/
  smoke-test.mjs
docs/
```

## Status
MVP foundation / scaffold. The dashboard, file-backed portfolio registry, x402 payment flow (demo and strict facilitator modes), MCP endpoint, and smoke test are implemented and working against local seed data. Not yet implemented: live Base portfolio reads, real risk scoring, prepared rebalance transactions, and wallet connection. `DATABASE_URL` and `REDIS_URL` appear in the example env but are not read by the current code. Payment requirements default to Base mainnet network labels; use small, auditable values for demos and do not commit secrets.

## License
MIT. See [LICENSE](LICENSE).
