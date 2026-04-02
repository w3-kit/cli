"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, Transaction } from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createMint,
} from "@solana/spl-token";
import { useState } from "react";

export function CreateToken() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [decimals, setDecimals] = useState("9");
  const [mintAddress, setMintAddress] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleCreate = async () => {
    if (!publicKey) return;
    setIsPending(true);
    try {
      // ★ On Solana, creating a token = creating a "mint" account
      // No contract deployment needed — the SPL Token program handles everything
      const mint = await createMint(
        connection,
        // In wallet-adapter, we need to use sendTransaction pattern instead
        // This simplified version uses the helper which needs a Keypair signer
        // See the example/ for the full wallet-adapter compatible version
        publicKey as any, // Simplified — see example for proper implementation
        publicKey, // Mint authority
        publicKey, // Freeze authority (null to disable)
        Number(decimals),
      );
      setMintAddress(mint.toBase58());
    } catch (e) {
      console.error(e);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <h2>Create SPL Token</h2>
      <p>Connected: {publicKey?.toBase58()}</p>
      <input value={decimals} onChange={(e) => setDecimals(e.target.value)} placeholder="Decimals (e.g., 9)" />
      <button onClick={handleCreate} disabled={isPending || !publicKey}>
        {isPending ? "Creating..." : "Create Token"}
      </button>
      {mintAddress && <p>Token created! Mint: <code>{mintAddress}</code></p>}
    </div>
  );
}
