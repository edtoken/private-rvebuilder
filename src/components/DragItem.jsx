import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

export class DraggableItem extends Component {
  static propTypes = {
    guided: PropTypes.bool.isRequired, // can over
    className: PropTypes.string,
    elementId: PropTypes.string.isRequired,
    overElementId: PropTypes.string,
    handleSetOverElementId: PropTypes.func,
    dragParams: PropTypes.object
  }

  static defaultProps = {
    className: '',
    guided: true,
    // draggable: false,
    dragParams: {}
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.state.active = props.active || false
    this.state.draggable = typeof props.draggable === 'undefined' ? true : props.draggable
    this.state.dragging = false
    this.state.over = false

    this.timers = {
      checkSetOver: false
    }

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
  }

  componentWillUnmount () {
    for (let k in this.timers) {
      clearTimeout(this.timers[k])
    }
  }

  _findChild (selector) {
    let component = findDOMNode(this)
    return component.querySelector(selector)
  }

  _hasOverChilds () {
    return Boolean(this._findChild('.RVEBuilder-DraggableItem--over'))
  }

  _hasActiveChilds () {
    return Boolean(this._findChild('.RVEBuilder-DraggableItem--active'))
  }

  _hasDraggableChilds () {
    return Boolean(this._findChild('.RVEBuilder-DraggableItem--draggable'))
  }

  _checkSetOver (e, action) {
    const {elementId, overElementId, guided, handleSetOverElement} = this.props
    const {over, active} = this.state

    if (!guided || active) {
      return
    }

    if (!this._hasOverChilds()) {
      this.setState({over: true})
    }

    clearTimeout(this.timers.checkSetOver)

    this.timers.checkSetOver = setTimeout(() => {
      if (this._hasOverChilds()) {
        this.setState({over: false})
      } else {
        if (this.state.over) {
          handleSetOverElement(elementId)
        }
      }
    }, 10)
  }

  onDragStart (e) {
    const {elementId} = this.props

    let activeTransfer = e.dataTransfer.getData('RVEBuilder-dragData')
    let draggingChilds = this._hasDraggableChilds()

    if (draggingChilds) {
      this.setState({draggable: false})
      return
    }

    const componentData = activeTransfer || JSON.stringify({
      elementId,
      params: this.props.dragParams
    })

    e.dataTransfer.setData('RVEBuilder-dragData', componentData)

    this.setState({dragging: true})
  }

  onDragEnter (e) {
    this._checkSetOver(e, 'enter')
  }

  onDragOver (e) {
    this._checkSetOver(e, 'over')
  }

  onDragLeave () {
    const {elementId, overElementId, handleSetOverElement} = this.props
    const {active} = this.state

    if (this.props.guided && !active) {
      this.setState({over: false}, () => {
        if (elementId === overElementId) {
          setTimeout(() => {
            handleSetOverElement('')
          }, 1)
        }
      })
    }
  }

  onDrop (e) {
    e.preventDefault()

    const {elementId, overElementId, handleSetOverElement} = this.props

    this.setState({dragging: false, over: false}, () => {
      if (elementId === overElementId) {
        setTimeout(() => {
          handleSetOverElement('')
        }, 1)
      }
    })
  }

  onDragEnd () {
    const {elementId, overElementId} = this.props

    if (this.state.dragging) {
      this.setState({dragging: false})
    }
  }

  onMouseMove (e) {
  }

  onMouseEnter (e) {

  }

  onMouseLeave (e) {

  }

  render () {
    const {elementId, activeElementId} = this.props
    const {draggable, dragging, over} = this.state

    let wrapperProps = {
      draggable,
      className: 'RVEBuilder-DraggableItem',
      onDragEnter: this.onDragEnter,
      onDragStart: this.onDragStart,
      onDragEnd: this.onDragEnd,
      onDrop: this.onDrop,
      onDragOver: this.onDragOver,
      onDragLeave: this.onDragLeave,
      onMouseMove: this.onMouseMove,
      onMouseLeave: this.onMouseLeave,
      onMouseEnter: this.onMouseEnter
    }

    const active = (elementId === activeElementId)

    console.log(elementId, activeElementId)

    if (dragging) {
      wrapperProps.className += ' RVEBuilder-DraggableItem--dragging '
    }
    if (draggable) {
      wrapperProps.className += ' RVEBuilder-DraggableItem--draggable '
    }
    if (active) {
      wrapperProps.className += ' RVEBuilder-DraggableItem--active '
    }
    if (over) {
      wrapperProps.className += ' RVEBuilder-DraggableItem--over '
    }

    wrapperProps.className += ' ' + this.props.className

    return (<div {...wrapperProps}>
      <div className='RVEBuilder-DraggableItem-Buttons'>
        <span className='RVEBuilder-DraggableItem-MoveButton'>
          <i className='fa fa-arrow-top' />
        </span>
      </div>
      {this.props.children}
    </div>)
  }
}
