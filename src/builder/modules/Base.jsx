import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { DraggableItem } from '../../components/DragItem'
import Lang from '../../containers/Lang'

export const BASE_PROPERTIES = []

export class BaseMainElement extends Component {
  static propTypes = {
    moduleName: PropTypes.string.isRequired,
    elementId: PropTypes.string.isRequired,
    templateIsPreview: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)
  }

  _className () {
    const {elementId, templateIsPreview, activeElementId, moduleName} = this.props
    const isActive = (elementId === activeElementId)

    const moduleNameLower = moduleName.toLowerCase()

    return !templateIsPreview ? _.compact([
      'RVEBuilderMain-Element',
      'RVEBuilderMain-Element--' + moduleNameLower,
      'RVEBuilderMain-Element--' + elementId
      // !isActive ? undefined : 'RVEBuilderMain-Element--active'
    ]).join(' ') : ''
  }

  _wrapperProps () {
    const {elementId, activeElementId, handleSetActiveElement} = this.props

    return {
      className: this._className(),
      onClick: (e) => {
        e.preventDefault()
        e.stopPropagation()

        let updateElementId = (activeElementId === elementId) ? '' : elementId

        handleSetActiveElement(updateElementId)
      }
    }
  }

  _wrap (params, child) {
    const {elementId, activeElementId, templateIsPreview, overElementId, handleSetOverElement} = this.props

    if (templateIsPreview) {
      return child
    }

    return (<DraggableItem
      elementId={elementId}
      activeElementId={activeElementId}
      handleSetOverElement={handleSetOverElement}
      overElementId={overElementId}
      guided={this.props.guided !== undefined ? this.props.guided : true}>
      <div {...this._wrapperProps()}>
        {child}
      </div>
    </DraggableItem>)
  }

  render () {
    const {styles} = this.props

    return this._wrap({}, <div style={styles.wrapper}>
      <div>
        <span style={styles.container}>{this.props.moduleName}</span>
      </div>
    </div>)
  }
}

export class BasePanelElement extends Component {
  static propTypes = {
    moduleName: PropTypes.string.isRequired,
    elementType: PropTypes.string.isRequired
  }

  _className () {
    return [
      'RVEBuilderPanel-Element',
      'RVEBuilderPanel-Element--' + (this.props.elementType.toLowerCase()),
      'RVEBuilderPanel-Element--' + (this.props.moduleName.toLowerCase())
    ].join(' ')
  }

  render () {
    let hasIcon = Boolean(this.constructor.icon)

    return (<DraggableItem
      guided={false}
      draggable
      className={this._className()}
      elementId={`${this.props.moduleName}New${this.props.elementType}`}>
      <div>
        {hasIcon && <div>
          <div>
            {this.constructor.icon}
          </div>
          <div>
            <Lang token={['PANEL_MODULE_NAME', this.props.moduleName.toUpperCase()].join('_')} />
          </div>

        </div>}
        {!hasIcon && <div>
          <pre style={{textAlign: 'left', fontSize: '.5rem'}}>{JSON.stringify(this.props, null, 2)}</pre>
        </div>}

      </div>
    </DraggableItem>)
  }
}
