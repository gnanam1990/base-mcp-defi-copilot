# DeFi Copilot

AI portfolio analytics and user-approved DeFi actions on Base.

**Status:** Risk dashboard MVP foundation

Read Base DeFi positions, explain risk, compare yield, and prepare transparent transaction batches for user approval.

## Current MVP
- Base industrial-neon UI theme from the shared suite prompt.
- Responsive dashboard with wallet/action controls, metrics, workflow, MCP tools, and live record surface.
- Product status API at `/api/defi-copilot/status`.
- Smoke checks for required dashboard data.

## Local Development
```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Checks
```bash
npm run typecheck
npm run build
npm run test:smoke
```

## Next Build Slice
Wire the mocked dashboard data into real Base Sepolia reads, x402 payment verification, or contract prepare endpoints depending on this product's launch path.

## License
MIT
