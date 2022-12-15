import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<User, 'user'>
