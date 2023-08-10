# nftvyapar

Utilize the power of AI with our widget to effortlessly create NFTs 🖼️

![nftvyapar-textarea](https://user-images.githubusercontent.com/19601060/226515817-1a4613d0-5173-440e-acfb-c769d45a8a31.png)

**Disclaimer** - Our widget does not have built-in AI capabilities, but it does offer an AI button that allows users to incorporate their own AI use cases.

We have two packages, which are as follows:

- `nft-vyapar` offers following modules
    - getTokenId
    - mint
    - sellOffer
    - acceptSellOffer

- `nft-vyapar-kit` offers following components
    - Textarea
    - SellNFT

# Features

#### `nft-vyapar`
- The function `getTokenId` assists in retrieving the token ID of either a created NFT or a NFT that is offered for sale at a specific address.
- `mint` function to mint an NFT is to create it.
- The `sellOffer` function is utilized to generate an offer for a particular NFT at a designated address.
- The `acceptSellOffer` function is employed to accept an NFT that has been offered to the user's wallet address.

#### `nft-vyapar-kit`
- The `Textarea` component allows the user to generate an NFT with or without the capability of utilizing AI. Textarea does not have built-in AI capabilities, but it does offer an AI button that allows users to incorporate their own AI use cases.
- The `SellNFT` component permits the user to sell the NFT at a preferred price to a destination address.

# Installation

```bash
npm i nft-vyapar-kit nft-vyapar
```

# Usage

To start using the `nft-vyapar-kit` package component, please following these steps:

```jsx
import { Textarea } from "nft-vyapar-kit";
import styles from "nft-vyapar-kit/dist/index.css";

<Textarea
    callbackUrl="callback-url"
    callbackFn={() => {}}
/>
```

```jsx
import { SellNFT } from "nft-vyapar-kit";
import styles from "nft-vyapar-kit/dist/index.css";

<SellNFT
    address="wallet-address"
    amount="10"
    destinationAddress="destination-wallet-address"
    description={"something..."}
    tokenId={"created-nft-tokenId"}
    callbackUrl="callback-url"
    callbackFn={() => {}}
/>
```

To start using the `nft-vyapar` package module, please following these steps:

```js
import { getTokenId } from "nft-vyapar";

// use case 1, to get created nft token id
const tokenId = await getTokenId("wallet-address", "null");

// use case 2, to get sell offer tokenIndexOffer id
const tokenId = await getTokenId("wallet-address", "token-id");
```

```js
import { acceptSellOffer } from "nft-vyapar";

const result = await acceptSellOffer(
    "wallet-address-seed",
    "token-offer-index"
  );
```

```js
import { mint } from "nft-vyapar";

const payload = await mint({
    file,
    address: "wallet-address",
    description: "something",
    secrets: {
        NFT_STORAGE_TOKEN: process.env.NFT_STORAGE_TOKEN,
        XUMM_APIKEY: process.env.XUMM_APIKEY,
        XUMM_APISECRET: process.env.XUMM_APISECRET,
    },
});
```

```js
import { sellOffer } from "nft-vyapar";

const payload = await sellOffer({
    address,
    destinationAddress,
    tokenId,
    description,
    amount,
    secrets: {
        NFT_STORAGE_TOKEN: process.env.NFT_STORAGE_TOKEN,
        XUMM_APIKEY: process.env.XUMM_APIKEY,
        XUMM_APISECRET: process.env.XUMM_APISECRET,
    },
});
```