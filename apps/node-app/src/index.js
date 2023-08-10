import { getTokenId } from "nft-vyapar";

async function main() {
  const tokenId = await getTokenId("wallet-address", "null");
}

main();
