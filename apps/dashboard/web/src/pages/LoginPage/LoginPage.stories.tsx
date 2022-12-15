import type { ComponentMeta } from '@storybook/react'

import LoginPage from './LoginPage'

export const generated = () => {
  return <LoginPage />
}

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
} as ComponentMeta<typeof LoginPage>
