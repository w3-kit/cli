# w3-kit

**Build and learn web3. Any chain.**

The comprehensive, chain-agnostic web3 developer toolkit where every piece of code teaches you the web3 behind it.

## What is w3-kit?

w3-kit is an open source toolkit for web3 developers that covers **EVM** (Ethereum, Base, Arbitrum, etc.) and **Solana** — from a single repo.

Unlike other tools that focus on one chain or one layer of the stack, w3-kit gives you:

- **UI Components** — 27+ React components for wallets, tokens, NFTs, DeFi
- **Smart Contracts** — Solidity + Anchor templates for common patterns
- **Code Recipes** — Copy-paste snippets with EVM and Solana side by side
- **Registry** — Chain data, token addresses, and protocol ABIs you can `npm install`
- **Guides** — Concept explainers, security checklists, and a developer glossary
- **CLI** — `npx w3-kit init` to scaffold any project
- **Starter Templates** — Full-stack apps ready to deploy

### The twist: education is embedded in the code

Every component ships with a `.learn.md` file that explains the web3 concepts behind it. You'll never copy-paste code you don't understand.

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| [`ui/`](https://github.com/w3-kit/ui) | React component library (Tailwind, multi-chain) | Active |
| [`packages/registry/`](packages/registry) | Chain, token, and ABI data (`@w3-kit/registry`) | Active |
| `contracts/` | Smart contract templates (EVM + Solana) | Coming soon |
| `recipes/` | Copy-paste code snippets | Coming soon |
| `guides/` | Educational content + glossary | Active |
| `templates/` | Full-stack starter apps | Active |
| `cli/` | CLI tool (`npx w3-kit`) | Coming soon |

## Quick Start

### Use a component

```bash
npx w3-kit add token-swap
```

### Use the registry

```bash
npm install @w3-kit/registry
```

```typescript
import { getChain, getTokensByChain } from "@w3-kit/registry";

const ethereum = getChain(1);
const solana = getChain(101);
const ethTokens = getTokensByChain(1);
```

### Browse the glossary

See [`guides/glossary/glossary.md`](guides/glossary/glossary.md) for 50+ web3 terms explained for developers.

## Repo Structure

```
w3-kit/
├── packages/
│   └── registry/           # @w3-kit/registry — chain, token, ABI data
├── ui/                     # React component library (submodule)
├── contracts/
│   ├── evm/                # Solidity contracts (Foundry)
│   └── solana/             # Anchor programs
├── recipes/
│   ├── evm/                # EVM code snippets
│   ├── solana/             # Solana code snippets
│   └── cross-chain/        # Cross-chain patterns
├── guides/
│   ├── concepts/           # Chain-agnostic fundamentals
│   ├── evm/                # Ethereum-specific guides
│   ├── solana/             # Solana-specific guides
│   ├── security/           # Security patterns + checklists
│   └── glossary/           # Web3 terminology reference
├── templates/
│   └── saas-boilerplate/   # SaaS starter with smart contracts
└── public-website/         # w3-kit.com landing page (submodule)
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Whether it's code, documentation, `.learn.md` files, registry data, or bug reports — all contributions help.

## License

[MIT](LICENSE)
