import { XummSdk } from "xumm-sdk";
import { convertStringToHex } from "xrpl";
import fetch from "node-fetch";

export async function mint({ file, address, description, secrets }: any) {
  try {
    const { NFT_STORAGE_TOKEN, XUMM_APIKEY, XUMM_APISECRET } = secrets;

    const bufferedData = Buffer.from(file, "base64");

    const response = await fetch("https://api.nft.storage/upload", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "*/*",
        Authorization: `Bearer ${NFT_STORAGE_TOKEN}`,
      },
      body: bufferedData,
    });
    const data: any = await response.json();

    const cid = data.value.cid;
    const imageUrl = "https://ipfs.io/ipfs/" + cid;

    const Sdk = new XummSdk(XUMM_APIKEY, XUMM_APISECRET);

    const metaData = convertStringToHex(description);

    const request: any = {
      TransactionType: "NFTokenMint",
      Account: address,
      Fee: "1000000",
      Flags: 8,
      NFTokenTaxon: 0,
      TransferFee: 1,
      URI: convertStringToHex(imageUrl),
      Memos: [
        {
          Memo: {
            MemoData: metaData,
          },
        },
      ],
    };

    const payload: any = await Sdk.payload.create(request, true);

    const parsedPayload = {
      uuid: payload.uuid,
      refs: {
        qr_png: payload.refs.qr_png,
        websocket_status: payload.refs.websocket_status,
      },
      imageUrl,
    };

    return parsedPayload;
  } catch (error) {
    console.log("inside the error is ", error);
  }
}
