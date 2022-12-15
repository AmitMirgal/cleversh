import type { ComponentMeta, ComponentStory } from '@storybook/react'

import SidebarLayout from './SidebarLayout'

export const generated: ComponentStory<typeof SidebarLayout> = (args) => {
  return <SidebarLayout {...args} />
}

export default {
  title: 'Layouts/SidebarLayout',
  component: SidebarLayout,
} as ComponentMeta<typeof SidebarLayout>
