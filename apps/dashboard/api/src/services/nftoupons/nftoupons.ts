import type {
  QueryResolvers,
  MutationResolvers,
  NftouponRelationResolvers,
} from 'types/graphql'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
const xrpl = require('xrpl')

import { db } from 'src/lib/db'

export const nftoupons: QueryResolvers['nftoupons'] = () => {
  return db.nftoupon.findMany()
}

export const nftoupon: QueryResolvers['nftoupon'] = ({ id }) => {
  return db.nftoupon.findUnique({
    where: { id },
  })
}

export const createNftoupon: MutationResolvers['createNftoupon'] = async ({
  input,
}) => {
  const { creator_wallet_address } = input

  if (isEmpty(creator_wallet_address)) {
    throw 'Wallet address is required'
  }

  const client = new xrpl.Client('wss://xls20-sandbox.rippletest.net:51233')
  await client.connect()

  const nfts = await client.request({
    method: 'account_nfts',
    account: creator_wallet_address,
  })

  client.disconnect()

  const nftsList = get(nfts, 'result.account_nfts', [])
  const tokenId = nftsList[nftsList.length - 1]?.NFTokenID || ''

  return db.nftoupon.create({
    data: { ...input, tokenId },
  })
}

export const updateNftoupon: MutationResolvers['updateNftoupon'] = ({
  id,
  input,
}) => {
  return db.nftoupon.update({
    data: input,
    where: { id },
  })
}

export const deleteNftoupon: MutationResolvers['deleteNftoupon'] = ({ id }) => {
  return db.nftoupon.delete({
    where: { id },
  })
}

export const Nftoupon: NftouponRelationResolvers = {
  Project: (_obj, { root }) => {
    return db.nftoupon.findUnique({ where: { id: root?.id } }).Project()
  },
}
