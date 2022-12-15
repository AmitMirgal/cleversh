import { render } from '@redwoodjs/testing/web'

import PhotosPage from './PhotosPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PhotosPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PhotosPage />)
    }).not.toThrow()
  })
})
