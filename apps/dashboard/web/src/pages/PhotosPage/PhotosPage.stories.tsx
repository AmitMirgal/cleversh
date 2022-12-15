import type { ComponentMeta } from '@storybook/react'

import PhotosPage from './PhotosPage'

export const generated = () => {
  return <PhotosPage />
}

export default {
  title: 'Pages/PhotosPage',
  component: PhotosPage,
} as ComponentMeta<typeof PhotosPage>
