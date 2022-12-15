import type { QueryResolvers } from 'types/graphql'
import { XummSdk } from 'xumm-sdk'

const XUMM_APIKEY = process.env.XUMM_APIKEY
const XUMM_APISECRET = process.env.XUMM_APISECRET

export const connect: QueryResolvers['connect'] = async () => {
  const Sdk = new XummSdk(XUMM_APIKEY, XUMM_APISECRET)
  const request: any = {
    TransactionType: 'SignIn',
  }

  const payload = await Sdk.payload.create(request, true)

  const parsedPayload = {
    uuid: payload.uuid,
    refs: {
      qr_png: payload.refs.qr_png,
      websocket_status: payload.refs.websocket_status,
    },
  }

  return parsedPayload
}
