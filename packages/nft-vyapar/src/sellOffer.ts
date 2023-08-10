import { XummSdk } from "xumm-sdk";
import { convertStringToHex, xrpToDrops } from "xrpl";

export async function sellOffer({
  address,
  destinationAddress,
  tokenId,
  description,
  amount,
  secrets,
}: any) {
  try {
    const { XUMM_APIKEY, XUMM_APISECRET } = secrets;

    const Sdk = new XummSdk(XUMM_APIKEY, XUMM_APISECRET);

    const metaData = convertStringToHex(description);

    const request: any = {
      TransactionType: "NFTokenCreateOffer",
      Account: address,
      Destination: destinationAddress,
      Fee: "1000000",
      Flags: 1,
      NFTokenID: tokenId,
      Amount: xrpToDrops(amount),
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
    };

    return parsedPayload;
  } catch (error) {
    console.log("inside the error is ", error);
  }
}
