# DeFi Copilot

AI portfolio analytics and user-approved DeFi actions on Base.

**Status:** Planned eighth build after risk and data modules exist.

DeFi Copilot analyzes positions across Base DeFi, scores risk, recommends rebalancing, and prepares user-approved actions through Base MCP.

## Why It Exists
Base MCP gives AI assistants access to Base Account actions such as balances, sends, swaps, contract calls, and x402 payments, with user approval for writes. This project turns that capability into a focused product for Base DeFi users who want clearer portfolio, risk, and yield decisions.

## Core Capabilities
- Portfolio dashboard for balances, protocol positions, yield, and risk.
- Risk model for liquidation, concentration, smart-contract, and APY volatility signals.
- Recommendation engine that explains suggested changes before any transaction.
- Prepare endpoints that batch protocol actions through Base MCP send_calls.
- Read integrations with native Base MCP plugins where available.

## Roadmap Snapshot
1. Build read-only portfolio and risk dashboard.
2. Add recommendation cards without execution.
3. Integrate protocol prepare endpoints for one low-risk rebalance path.
4. Add MCP plugin/orchestration docs.
5. Launch public demo with clear safety disclaimers and mainnet-limited actions.

## Repository Status
This repository is public from day one. It starts with product, architecture, roadmap, and demo documentation. Implementation commits should stay small and use conventional commit prefixes.

## License
MIT
