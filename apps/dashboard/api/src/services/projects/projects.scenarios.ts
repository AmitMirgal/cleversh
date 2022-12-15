import type { Prisma, Project } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProjectCreateArgs>({
  project: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<Project, 'project'>
