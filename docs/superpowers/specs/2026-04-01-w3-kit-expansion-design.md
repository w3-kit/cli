# w3-kit Expansion Design — "Build and Learn Web3. Any Chain."

## Vision

Transform w3-kit from a UI component library into a comprehensive, chain-agnostic web3 developer toolkit where every piece of code ships with embedded education. The only place where a developer can grab a production-ready component, a deploy-ready contract, and understand the web3 concepts behind both — across EVM and Solana — from one toolkit.

---

## Positioning

### What w3-kit IS

A hybrid toolkit + learning platform. Code is the education. Every component, contract, recipe, and registry entry includes explanations of the web3 concepts behind it.

### What w3-kit is NOT competing with

- wagmi/viem (low-level Ethereum interaction) — w3-kit uses these under the hood
- Anchor (Solana program framework) — w3-kit contract templates use Anchor
- Scaffold-ETH (EVM prototype scaffold) — w3-kit templates are similar but multi-chain
- Cyfrin Updraft (structured courses) — w3-kit guides are reference docs, not courses

### Three differentiators

1. **Cross-chain by default** — every recipe shows EVM and Solana side by side
2. **Education embedded in code** — `.learn.md` files at the point of use, not in a separate docs site
3. **One CLI, all chains** — `w3-kit add`, `w3-kit init` works across ecosystems

---

## Monorepo Structure

```
w3-kit/
├── apps/
│   ├── web/                → w3-kit.com (landing page)
│   ├── docs/               → docs.w3-kit.com (guides, recipes, components, contracts)
│   └── registry-app/       → registry.w3-kit.com (interactive chain/token/ABI explorer)
├── packages/
│   ├── ui/                 # React component library (Tailwind, multi-chain)
│   ├── registry/           # Chain data, token lists, ABIs — importable as npm package
│   ├── design-tokens/      # Shared colors, fonts, spacing across all apps
│   └── cli/                # `npx w3-kit` CLI tool
├── contracts/
│   ├── evm/                # Solidity contracts (Foundry/Hardhat, OpenZeppelin-based)
│   └── solana/             # Anchor programs
├── recipes/                # Copy-paste code snippets organized by task
│   ├── evm/
│   ├── solana/
│   └── cross-chain/
├── guides/                 # Educational content
│   ├── concepts/           # Chain-agnostic fundamentals
│   ├── evm/
│   ├── solana/
│   ├── security/
│   └── glossary/
└── templates/              # Full starter apps
    ├── evm-dapp/
    ├── solana-dapp/
    ├── cross-chain-dapp/
    └── saas-boilerplate/   # (migrated from sol-saas-boilerplate)
```

---

## The "Code Is Education" Pattern

Every piece of code ships with embedded learning via companion files.

### UI Components

```
packages/ui/components/token-swap/
├── token-swap.tsx           # The component
├── token-swap.learn.md      # What is a token swap, how AMMs work, slippage, EVM vs Solana differences
└── token-swap.recipes.md    # Common customizations & patterns
```

### Contracts

Annotated with inline comments that teach:

```solidity
// ★ WHY: We use a mapping instead of an array because lookups by address
// are O(1). On-chain, every operation costs gas — O(n) loops over arrays
// can make your contract unusable as it grows.
mapping(address => uint256) public balances;
```

### Recipes

Side-by-side chain comparisons:

```
recipes/connect-wallet/
├── evm.tsx                  # wagmi/viem approach
├── solana.tsx               # wallet-adapter approach
└── README.md                # What "connecting a wallet" means, chain differences, security notes
```

### Registry

Every data entry has context:

```json
{
  "chainId": 1,
  "name": "Ethereum Mainnet",
  "learn": "The original smart contract blockchain. Highest security & decentralization, but gas fees average $2-10 per transaction. Use L2s (Arbitrum, Base) for cheaper transactions with Ethereum's security guarantees."
}
```

---

## Package Details

### `packages/ui/` — Component Library

- Current: 27 components (being reworked per COMPONENT-REWORK-PLAN.md)
- Target: ~40 components
- Chain-agnostic versions where possible (e.g., `<ConnectWallet>` detects EVM vs Solana)
- New components: `<ChainSelector>`, `<CrossChainBridge>`, `<TokenCreate>`
- Installable via `npx w3-kit add token-swap`
- Tailwind-first, Vercel design language, Geist font

### `contracts/` — Smart Contract Library

**EVM (Solidity + Foundry):**
- Token templates (ERC-20, ERC-721, ERC-1155)
- Staking, vesting, governance, multisig
- Subscription/billing (from sol-saas-boilerplate patterns)
- Built on OpenZeppelin, tested with Foundry

**Solana (Anchor):**
- SPL token creation, staking, vesting, subscription
- Same patterns as EVM for cross-chain comparison
- Tested with `anchor test`

Every contract has a `.learn.md` with explanations, common pitfalls, and security considerations.

### `recipes/` — ~50 Code Snippets

Organized by task, each with EVM + Solana + cross-chain variants:

- **Wallet:** connect, disconnect, sign message, switch network
- **Tokens:** create, transfer, approve, check balance, fetch metadata
- **NFTs:** mint, list, buy, fetch collection, display metadata
- **DeFi:** swap, provide liquidity, stake, claim rewards
- **Utils:** format addresses, parse transactions, estimate gas, resolve ENS/SNS

### `packages/registry/` — Data Package (`@w3-kit/registry`)

- **Chains:** ID, name, RPC endpoints, block explorers, faucets, native token, learn blurb
- **Tokens:** popular tokens per chain with addresses, decimals, logos
- **ABIs:** common protocol ABIs (Uniswap, Jupiter, Aave, Raydium)
- Exportable as JSON, queryable via TypeScript API
- Initial scope: 10 major chains, top 20 tokens per chain

### `guides/` — Educational Content

- **Concepts (chain-agnostic):** "What is a wallet?", "How transactions work", "Public vs private keys", "What are smart contracts?"
- **EVM:** "Gas explained", "EVM account model", "Solidity basics"
- **Solana:** "Accounts vs state", "Programs vs contracts", "PDAs explained"
- **Security:** "Top 10 smart contract vulnerabilities", "Bridge security", "Wallet security checklist"
- **Glossary:** searchable A-Z of ~50 core web3 terms
- **Cheat sheets:** Solidity vs Rust syntax, RPC methods, token standards comparison

### `packages/cli/` — CLI Tool (`npx w3-kit`)

- `w3-kit init` — scaffold a new project (pick chain, template, features)
- `w3-kit add <component>` — add a UI component
- `w3-kit add <recipe>` — copy a recipe into your project
- `w3-kit add <contract>` — scaffold a contract with tests
- `w3-kit registry` — query chain/token data from terminal

### `templates/` — Starter Apps

- **EVM dApp:** Next.js + wagmi + viem + RainbowKit + Foundry
- **Solana dApp:** Next.js + wallet-adapter + Anchor
- **Cross-chain dApp:** Next.js + multi-chain wallet + bridge
- **SaaS boilerplate:** migrated from sol-saas-boilerplate, expanded to EVM
- **Token launchpad:** (per existing spec)

---

## Hosting & Subdomains

Hosted on Vercel (free Hobby tier). Start with 3 subdomains, expand later:

| Subdomain | Purpose | Source |
|---|---|---|
| **w3-kit.com** | Landing page + marketing | `apps/web/` |
| **docs.w3-kit.com** | All developer content (components, guides, recipes, contracts, cheatsheets) | `apps/docs/` |
| **registry.w3-kit.com** | Interactive chain/token/ABI explorer with search, filter, API | `apps/registry-app/` |

Future splits when content volume justifies it:
- **ui.w3-kit.com** — when component library is large enough for its own site
- **recipes.w3-kit.com** — when there are 30+ recipes

Shared design consistency via `packages/design-tokens/`.

---

## Build Phases

### Phase 1 — Foundation (restructure what exists)

- Reorganize monorepo into the new structure
- Move `sol-saas-boilerplate/` into `templates/`
- Set up `.learn.md` pattern on 3-5 existing UI components as proof of concept
- Create `packages/registry/` with 10 major chains + top 20 tokens per chain
- Ship glossary with ~50 core web3 terms

### Phase 2 — Recipes + Guides

- First 20 recipes (wallet, token, NFT basics) in EVM + Solana
- Core concept guides (wallets, transactions, keys, smart contracts)
- Chain-specific guides (gas, accounts model, PDAs)
- Security guide v1 (top 10 vulnerabilities)

### Phase 3 — CLI

- `w3-kit init` with template selection
- `w3-kit add` for components and recipes
- `w3-kit registry` for chain/token lookup

### Phase 4 — Contracts + Templates

- EVM contract library (token, staking, vesting, governance)
- Solana program library (same patterns in Anchor)
- New templates (EVM dApp, cross-chain dApp)
- Expand registry with ABIs for popular protocols

### Phase 5 — Scale

- Expand to ~40 UI components
- ~50 recipes
- Cheat sheets
- Cross-chain specific content (bridging guides, multi-chain architecture)
- Community contribution framework

---

## Research Context

This design is informed by a comprehensive landscape analysis (April 2026):

**Key gaps identified in the ecosystem:**

1. No lightweight, Tailwind-based, cross-chain UI component library
2. Educational content is chain-siloed (EVM or Solana, never both)
3. No universal chain/token/ABI registry across ecosystems
4. No side-by-side cross-chain code recipes
5. No multi-chain starter templates
6. Cross-chain security patterns are undocumented
7. No single CLI spanning EVM + Solana
8. Cross-chain testing tooling is non-existent

**Existing tools w3-kit builds on (not replaces):**
- EVM: wagmi, viem, RainbowKit, Foundry, OpenZeppelin
- Solana: wallet-adapter, Anchor, SPL
- Cross-chain: Wormhole, LayerZero (for bridge recipes/guides)

**Existing tools w3-kit differentiates from:**
- Ant Design Web3 (heavyweight, tied to Ant Design system)
- thirdweb (vendor-locked, no education layer)
- Scaffold-ETH (EVM-only, no learning content)
- Solana Cookbook (Solana-only, aging content, no UI/contracts)
