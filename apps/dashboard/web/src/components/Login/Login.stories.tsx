// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Login> = (args) => {
//   return <Login {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Login from './Login'

export const generated = () => {
  return <Login />
}

export default {
  title: 'Components/Login',
  component: Login,
} as ComponentMeta<typeof Login>
