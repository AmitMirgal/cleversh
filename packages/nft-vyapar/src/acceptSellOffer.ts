const xrpl = require("xrpl");

export async function acceptSellOffer(seed: string, tokenId: string) {
  const standby_wallet = xrpl.Wallet.fromSeed(seed);

  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233/");
  await client.connect();

  // Prepare transaction -------------------------------------------------------
  const transactionBlob: any = {
    TransactionType: "NFTokenAcceptOffer",
    Account: standby_wallet.classicAddress,
    NFTokenSellOffer: tokenId,
  };

  // Submit transaction --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob, {
    wallet: standby_wallet,
  });

  // Check transaction results -------------------------------------------------
  const result = JSON.stringify(tx.result.meta.TransactionResult, null, 2);

  client.disconnect();

  return result;
}
