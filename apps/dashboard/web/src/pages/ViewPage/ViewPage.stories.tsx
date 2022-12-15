import type { ComponentMeta } from '@storybook/react'

import ViewPage from './ViewPage'

export const generated = () => {
  return <ViewPage />
}

export default {
  title: 'Pages/ViewPage',
  component: ViewPage,
} as ComponentMeta<typeof ViewPage>
