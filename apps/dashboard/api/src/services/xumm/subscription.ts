import type { QueryResolvers } from 'types/graphql'
import { XummSdk } from 'xumm-sdk'
import { TxData } from 'xrpl-txdata'

const XUMM_APIKEY = process.env.XUMM_APIKEY
const XUMM_APISECRET = process.env.XUMM_APISECRET

const Verify = new TxData()

export const subscription: QueryResolvers['subscription'] = async ({ id }) => {
  const Sdk = new XummSdk(XUMM_APIKEY, XUMM_APISECRET)

  const subscription = await Sdk.payload.subscribe(id, (event) => {
    // If the transaction is signed:
    if (typeof event.data.signed !== 'undefined') {
      event.resolve('is signed')
    }
  })

  // Await further execution until the payload is resolved by returning
  // data in the callback:
  const resolved: any = await subscription.resolved

  const payload = await Sdk.payload.get(id)
  //const verifiedResult = await Verify.getOne(resultTest.response.txid)

  return {
    status: resolved,
    address: payload.response.account,
  }
}
