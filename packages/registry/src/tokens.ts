import type { Token } from "./types.js";
import tokensData from "../data/tokens.json" with { type: "json" };

const tokens: Token[] = tokensData as Token[];

const tokensBySymbolMap = new Map<string, Token>(
  tokens.map((token) => [token.symbol.toUpperCase(), token])
);

export function getAllTokens(): Token[] {
  return tokens;
}

export function getToken(symbol: string): Token | undefined {
  return tokensBySymbolMap.get(symbol.toUpperCase());
}

export function getTokensByChain(chainId: number): Token[] {
  return tokens.filter((token) =>
    token.chains.some((c) => c.chainId === chainId)
  );
}
