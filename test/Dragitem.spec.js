import React from 'react'
import { DraggableItem } from './../src/DragItem'

const defaultProps = {}

describe('DraggableItem', () => {
  const wrapper = shallow(<DraggableItem {...defaultProps} />)

  it('should be render', () => {
    expect(wrapper.hasClass('REBDraggableItem')).to.equal(true)
  })
})
