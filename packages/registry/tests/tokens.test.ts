import { describe, it, expect } from "vitest";
import {
  getToken,
  getTokensByChain,
  getAllTokens,
} from "../src/tokens.js";

describe("tokens", () => {
  describe("getAllTokens", () => {
    it("returns all tokens", () => {
      const tokens = getAllTokens();
      expect(tokens.length).toBeGreaterThanOrEqual(15);
    });

    it("every token has required fields", () => {
      const tokens = getAllTokens();
      for (const token of tokens) {
        expect(token.symbol).toBeTruthy();
        expect(token.name).toBeTruthy();
        expect(typeof token.decimals).toBe("number");
        expect(token.chains.length).toBeGreaterThan(0);
        expect(token.learn).toBeTruthy();
      }
    });
  });

  describe("getToken", () => {
    it("returns USDC by symbol", () => {
      const usdc = getToken("USDC");
      expect(usdc).toBeDefined();
      expect(usdc!.name).toBe("USD Coin");
      expect(usdc!.chains.length).toBeGreaterThan(1);
    });

    it("is case-insensitive", () => {
      const usdc = getToken("usdc");
      expect(usdc).toBeDefined();
      expect(usdc!.symbol).toBe("USDC");
    });

    it("returns undefined for unknown token", () => {
      expect(getToken("NOTAREALTOKEN")).toBeUndefined();
    });
  });

  describe("getTokensByChain", () => {
    it("returns tokens available on Ethereum (chainId 1)", () => {
      const tokens = getTokensByChain(1);
      expect(tokens.length).toBeGreaterThanOrEqual(5);
      for (const token of tokens) {
        expect(token.chains.some((c) => c.chainId === 1)).toBe(true);
      }
    });

    it("returns tokens available on Solana (chainId 101)", () => {
      const tokens = getTokensByChain(101);
      expect(tokens.length).toBeGreaterThanOrEqual(3);
      for (const token of tokens) {
        expect(token.chains.some((c) => c.chainId === 101)).toBe(true);
      }
    });
  });
});
