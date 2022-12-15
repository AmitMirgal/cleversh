import type { Prisma, Nftoupon } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NftouponCreateArgs>({
  nftoupon: {
    one: { data: { Project: { create: {} } } },
    two: { data: { Project: { create: {} } } },
  },
})

export type StandardScenario = ScenarioData<Nftoupon, 'nftoupon'>
