import React from 'react'
import { DraggableZone } from './../src/DragZone'

const defaultProps = {}

describe('DraggableZone', () => {
  const wrapper = shallow(<DraggableZone {...defaultProps} />)

  it('should be render', () => {
    expect(wrapper.hasClass('REBDraggableZone')).to.equal(true)
  })
})
