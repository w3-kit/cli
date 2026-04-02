/**
 * stake-tokens/solana.tsx
 * Native SOL staking: create stake account → delegate to validator.
 * This is protocol-agnostic native staking; liquid staking (e.g. Marinade) differs.
 */

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair, LAMPORTS_PER_SOL, PublicKey,
  StakeProgram, Transaction,
} from "@solana/web3.js";
import { useState } from "react";

const VALIDATOR_VOTE_ACCOUNT = new PublicKey("VOTE_ACCOUNT_PUBKEY");

export function useStakeSol() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [solAmount, setSolAmount] = useState("1");
  const [status, setStatus] = useState("");

  async function handleStake() {
    if (!publicKey) return;
    setStatus("Creating stake account…");

    const stakeKeypair = Keypair.generate();
    const lamports = parseFloat(solAmount) * LAMPORTS_PER_SOL;
    const rentExempt = await connection.getMinimumBalanceForRentExemption(
      StakeProgram.space
    );

    const tx = new Transaction().add(
      // 1. Create the stake account
      StakeProgram.createAccount({
        fromPubkey: publicKey,
        stakePubkey: stakeKeypair.publicKey,
        authorized: { staker: publicKey, withdrawer: publicKey },
        lamports: lamports + rentExempt,
      }),
      // 2. Delegate to validator
      StakeProgram.delegate({
        stakePubkey: stakeKeypair.publicKey,
        authorizedPubkey: publicKey,
        votePubkey: VALIDATOR_VOTE_ACCOUNT,
      })
    );

    const sig = await sendTransaction(tx, connection, {
      signers: [stakeKeypair],
    });
    await connection.confirmTransaction(sig, "confirmed");
    setStatus(`Staked! Sig: ${sig}`);
  }

  return { solAmount, setSolAmount, handleStake, status };
}
