export interface Chain {
  chainId: number;
  name: string;
  shortName: string;
  ecosystem: "evm" | "solana" | "bitcoin";
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers: string[];
  faucets: string[];
  testnet: boolean;
  learn: string;
}

export interface Token {
  symbol: string;
  name: string;
  decimals: number;
  chains: {
    chainId: number;
    address: string;
  }[];
  logoUrl: string;
  learn: string;
}
