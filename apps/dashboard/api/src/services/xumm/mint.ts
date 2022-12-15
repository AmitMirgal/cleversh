import type { QueryResolvers } from 'types/graphql'
import { XummSdk } from 'xumm-sdk'
const xrpl = require('xrpl')
import { NFTStorage, Blob } from 'nft.storage'
import { convertStringToHex } from 'xrpl'

const XUMM_APIKEY = process.env.XUMM_APIKEY
const XUMM_APISECRET = process.env.XUMM_APISECRET
const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_TOKEN

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

export const mint: QueryResolvers['mint'] = async ({
  address,
  file,
  description,
}) => {
  // https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/#what-are-buffers
  // The Buffer class in Node.js is designed to handle raw binary data
  const bufferedData = Buffer.from(file, 'base64')

  const cid = await client.storeBlob(new Blob([bufferedData]))

  const imageUrl = 'https://ipfs.io/ipfs/' + cid

  const Sdk = new XummSdk(XUMM_APIKEY, XUMM_APISECRET)

  const metaData = convertStringToHex(description)

  const request: any = {
    TransactionType: 'NFTokenMint',
    Account: address,
    Fee: '1000000',
    Flags: 8,
    NFTokenTaxon: 0,
    TransferFee: 1,
    URI: xrpl.convertStringToHex(imageUrl),
    Memos: [
      {
        Memo: {
          MemoData: metaData,
        },
      },
    ],
  }

  const payload = await Sdk.payload.create(request, true)
  console.log(payload)

  const parsedPayload = {
    uuid: payload.uuid,
    refs: {
      qr_png: payload.refs.qr_png,
      websocket_status: payload.refs.websocket_status,
    },
    imageUrl,
  }

  return {
    payload: parsedPayload,
  }
}
