import { render } from '@redwoodjs/testing/web'

import Login from './Login'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Login', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Login />)
    }).not.toThrow()
  })
})
