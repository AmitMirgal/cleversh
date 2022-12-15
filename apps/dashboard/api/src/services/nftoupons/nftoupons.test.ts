import type { Nftoupon } from '@prisma/client'

import {
  nftoupons,
  nftoupon,
  createNftoupon,
  updateNftoupon,
  deleteNftoupon,
} from './nftoupons'
import type { StandardScenario } from './nftoupons.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('nftoupons', () => {
  scenario('returns all nftoupons', async (scenario: StandardScenario) => {
    const result = await nftoupons()

    expect(result.length).toEqual(Object.keys(scenario.nftoupon).length)
  })

  scenario('returns a single nftoupon', async (scenario: StandardScenario) => {
    const result = await nftoupon({ id: scenario.nftoupon.one.id })

    expect(result).toEqual(scenario.nftoupon.one)
  })

  scenario('creates a nftoupon', async (scenario: StandardScenario) => {
    const result = await createNftoupon({
      input: { project_id: scenario.nftoupon.two.project_id },
    })

    expect(result.project_id).toEqual(scenario.nftoupon.two.project_id)
  })

  scenario('updates a nftoupon', async (scenario: StandardScenario) => {
    const original = (await nftoupon({
      id: scenario.nftoupon.one.id,
    })) as Nftoupon
    const result = await updateNftoupon({
      id: original.id,
      input: { project_id: scenario.nftoupon.two.project_id },
    })

    expect(result.project_id).toEqual(scenario.nftoupon.two.project_id)
  })

  scenario('deletes a nftoupon', async (scenario: StandardScenario) => {
    const original = (await deleteNftoupon({
      id: scenario.nftoupon.one.id,
    })) as Nftoupon
    const result = await nftoupon({ id: original.id })

    expect(result).toEqual(null)
  })
})
