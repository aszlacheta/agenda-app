import React from 'react'
import renderer from 'react-test-renderer'
import Contact from '../Contact'

describe('Contact', () => {
  it('check if renders properly', () => {
    const tree = renderer
      .create(<Contact />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
