# DeFi Copilot Architecture

## Product Role
DeFi Copilot analyzes positions across Base DeFi, scores risk, recommends rebalancing, and prepares user-approved actions through Base MCP.

## System Shape
- Frontend app: Next.js, TypeScript, Tailwind, shadcn-style components, responsive dashboards.
- API layer: Node/TypeScript endpoints for product reads, prepare flows, analytics, and x402-gated access.
- Base layer: Base Account for user approval and Base MCP for assistant-driven actions.
- Payment layer: x402 for paid API/content/service access using USDC on Base or Base Sepolia.
- Data layer: PostgreSQL for durable product state and Redis for cache/session/rate-limit workloads.
- Contracts: Solidity/Foundry only where the module needs onchain state or settlement logic.

## Main Modules
- Portfolio dashboard for balances, protocol positions, yield, and risk.
- Risk model for liquidation, concentration, smart-contract, and APY volatility signals.
- Recommendation engine that explains suggested changes before any transaction.
- Prepare endpoints that batch protocol actions through Base MCP send_calls.
- Read integrations with native Base MCP plugins where available.

## Data Model
- Wallet positions, protocol exposures, prices, yields, and health factors.
- Risk snapshots, recommendations, dismissed suggestions, and accepted actions.
- Prepared transaction batches and approval status.
- Analytics for saved yield, avoided risk, and usage.

## MCP And x402 Pattern
Every write action should be exposed as a prepare endpoint that returns unsigned calldata or a payment request. MCP/plugin documentation must explain onboarding, read endpoints, prepare endpoints, and the mapping into Base MCP actions.

For paid resources, endpoints should return an x402 payment requirement before serving premium data. The app must enforce a user-defined max payment cap and record receipts for analytics and support.

## Safety Defaults
- Base Sepolia first, then Base mainnet.
- No private keys in app config.
- No hidden approvals or auto-execution.
- Clear user review before paid access or onchain writes.
- Placeholder env vars only in committed files.
