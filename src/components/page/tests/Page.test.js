import React from 'react'
import renderer from 'react-test-renderer'
import Page from '../Page'

jest.mock('../../header/Header')
jest.mock('../../footer/Footer')

describe('Page', () => {
  it('check if renders properly', () => {
    const tree = renderer
      .create(<Page />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
