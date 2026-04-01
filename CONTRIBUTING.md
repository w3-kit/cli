# Contributing to w3-kit

Thanks for wanting to contribute! w3-kit is an open source web3 toolkit and we welcome contributions of all kinds.

## How to Contribute

### Pick an Issue

Check the [Issues](https://github.com/w3-kit/w3-kit/issues) tab for tasks labeled:
- `good first issue` — great for first-time contributors
- `help wanted` — we'd love community help on these
- `phase-2`, `phase-3`, etc. — larger features broken into phases

### Getting Started

1. Fork the repo
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/w3-kit.git
   cd w3-kit
   ```
3. Create a branch:
   ```bash
   git checkout -b your-feature-name
   ```
4. Make your changes
5. Push and open a PR

### What Can You Contribute?

- **Code** — UI components, CLI features, contract templates, recipes
- **Education** — `.learn.md` files, guides, glossary terms, cheat sheets
- **Data** — Chain data, token addresses, protocol ABIs for the registry
- **Docs** — Fix typos, improve explanations, translate content
- **Bug reports** — Open an issue with steps to reproduce

### Project Structure

```
w3-kit/
├── packages/
│   └── registry/       # Chain, token, ABI data (@w3-kit/registry)
├── ui/                 # React component library (submodule → w3-kit/ui)
├── contracts/          # Smart contract templates (EVM + Solana)
├── recipes/            # Copy-paste code snippets
├── guides/             # Educational content, glossary, cheat sheets
├── templates/          # Full starter apps
└── public-website/     # Landing page (submodule → w3-kit/w3-kit-public-website)
```

### Writing .learn.md Files

Every component, contract, and recipe should have a companion `.learn.md` file. These explain:
- **What** the technology is (e.g., what is a token swap?)
- **How** it works under the hood (AMMs, liquidity pools, etc.)
- **EVM vs Solana** — side-by-side comparison
- **Security** — what to watch out for
- **How the component works** — what it does and how to connect it

Write for developers, not investors. Be concrete, not abstract.

### Adding to the Registry

The `@w3-kit/registry` package holds chain and token data. To add a chain or token:
1. Add the entry to `packages/registry/data/chains.json` or `tokens.json`
2. Include a `learn` field with a 1-2 sentence explanation
3. Add/update tests in `packages/registry/tests/`
4. Run `npm test` in `packages/registry/`

### Code Style

- TypeScript for all code
- Tailwind CSS for styling
- Follow existing patterns in the codebase
- Keep files focused — one responsibility per file
- No unnecessary abstractions

### Commit Messages

Use conventional commits:
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation
- `chore:` — maintenance

### Pull Requests

- Keep PRs focused on one thing
- Include a clear description of what and why
- Link to the related issue if there is one
- Make sure tests pass

## Code of Conduct

Be kind, be constructive, be patient. We're all here to build something useful.

## Questions?

Open an issue or start a discussion. No question is too basic.
