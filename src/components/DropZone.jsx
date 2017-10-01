import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class DropZone extends Component {
  static propTypes = {
    handleMove: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.onDragOver = this.onDragOver.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onDragOver (e) {
    e.preventDefault()
  }

  onDrop (e) {
    e.preventDefault()
    e.stopPropagation()

    let data
    let dataTransfer = e.dataTransfer.getData('RVEBuilder-dragData')

    try {
      data = JSON.parse(dataTransfer)
    } catch (e) {
      console.error('DropZone.onDrop', e)
      return
    }

    const fromElement = (data && data.elementId) ? data.elementId : undefined
    const toElement = this.props.overElementId
    const dragParams = (data && data.params) ? data.params : {}

    if (fromElement && toElement) {
      this.props.handleMove(fromElement, toElement, dragParams)
    }
  }

  render () {
    let wrapperProps = {
      className: 'RVEBuilder-DraggableZone',
      onDragOver: this.onDragOver,
      onDrop: this.onDrop
    }

    return (<div {...wrapperProps}>
      {this.props.children}
    </div>)
  }
}
