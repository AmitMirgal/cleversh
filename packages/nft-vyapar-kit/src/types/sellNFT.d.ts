export type SellNFTProps = {
  callbackUrl: string;
  callbackFn: (payload: any) => void;
  address: string;
  destinationAddress: string;
  tokenId: string;
  description: string;
  amount: string;
};
