import React from 'react'
import { getLibState } from './../src/selectors'

const appState = {
  _rveBuilder: {
    template: {
      structure: {}
    }
  }
}

describe('selectors test', () => {
  it('getLibState', () => {
    expect(getLibState(appState)).to.equal(appState._rveBuilder)
  })
})
