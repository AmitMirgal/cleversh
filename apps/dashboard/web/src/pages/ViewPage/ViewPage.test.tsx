import { render } from '@redwoodjs/testing/web'

import ViewPage from './ViewPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ViewPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewPage />)
    }).not.toThrow()
  })
})
