import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
const xrpl = require("xrpl");

export async function getTokenId(address: string, nftTokenId: string) {
  let nftSellOffers;
  let tokenId = "";
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233/");
  await client.connect();

  try {
    if (isEmpty(nftTokenId)) {
      const nfts = await client.request({
        method: "account_nfts",
        account: address,
      });

      const nftsList = get(nfts, "result.account_nfts", []);
      tokenId = nftsList[nftsList.length - 1]?.NFTokenID || "";
    } else {
      nftSellOffers = await client.request({
        method: "nft_sell_offers",
        nft_id: nftTokenId,
      });
      tokenId = nftSellOffers?.result?.offers[0]?.nft_offer_index || "";
    }
  } catch (err) {
    console.log("something went wrong");
  }

  client.disconnect();

  return tokenId;
}
