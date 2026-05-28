# DeFi Copilot

AI portfolio analytics and user-approved DeFi actions on Base.

**Status:** Risk dashboard MVP foundation

Read Base DeFi positions, explain risk, compare yield, and prepare transparent transaction batches for user approval.

## Current MVP
- Base industrial-neon UI theme from the shared suite prompt.
- Responsive dashboard with wallet/action controls, live portfolio metrics, workflow, MCP tools, and record surface.
- File-backed portfolio registry with creation, x402 quote lookup, paid analysis execution, and receipt recording.
- Demo x402 flow that returns `402 Payment Required` until a payment header or demo payment approval is provided.
- Product status API at `/api/defi-copilot/status`.
- MCP-compatible JSON endpoint at `/api/mcp/defi-copilot`.
- Smoke checks for creation, listing, quote, unpaid lock, paid unlock, receipt, and MCP quote.

## API Surface
- `GET /api/defi-copilot/wallets` lists active wallets.
- `POST /api/defi-copilot/wallets` creates a portfolio.
- `GET /api/defi-copilot/wallets/:slug/quote` returns the x402 payment requirement.
- `POST /api/defi-copilot/wallets/:slug/run` executes the paid analysis after payment verification and records a receipt.
- `GET /api/defi-copilot/status` returns dashboard data and stats.
- `GET /api/mcp/defi-copilot` lists MCP tools.
- `POST /api/mcp/defi-copilot` runs MVP tools for discovery, quote preparation, and stats.

## Local Development
```bash
npm install
npm run dev -- -p 3007
```

Open `http://127.0.0.1:3007`.

Local data is written to `.data/defi-copilot-db.json`. Override it with `DEFI_COPILOT_DATA_FILE` for isolated runs.

## Environment
Copy `.env.example` to `.env.local` when you need custom payment behavior.

- `DEFI_COPILOT_PAYMENT_MODE=demo` accepts the `x-demo-payment: accepted` header for local demos.
- `DEFI_COPILOT_PAYMENT_MODE=strict` requires a real `x-payment` header and facilitator configuration.
- `X402_FACILITATOR_URL` points to a facilitator that can verify and settle x402 payments.
- `X402_RECEIVING_ADDRESS` sets the payout address for paid runs.

## Checks
```bash
npm run typecheck
npm run build
npm run test:smoke
```

## Next Build Slice
Connect live Base portfolio reads, risk scoring, and prepared rebalance transactions.

## License
MIT
