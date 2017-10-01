import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Color from '../properties/Color'
import Padding from '../properties/Padding'

import { BASE_PROPERTIES, BaseMainElement, BasePanelElement } from './Base'

import * as modules from '../../builder/modules'

import { DraggableItem } from '../../components/DragItem'
import Lang from '../../containers/Lang'

import { getColumnModuleProps } from '../../selectors'
import { setActiveElement, setOverElement } from '../../actions'

export const MODULE_NAME = 'Column'
export const ELEMENT_TYPE = 'Structure'
export const COLUMN_WIDTH_INDEX = 8.3333

export const PROPERTIES = [].concat(BASE_PROPERTIES, [
  {
    component: Color,
    props: {
      propertyName: 'backgroundColor',
      elementType: 'Structure',
      propertyType: 'wrapper'
    }
  },
  {
    component: Padding,
    props: {
      elementType: 'Structure',
      propertyType: 'wrapper'
    }
  }
])

export const defaultScheme = {
  'size': 6,
  'styles': {
    'wrapper': {
      'backgroundColor': '',
      'padding': '0px'
    }
  },
  'elements': []
}

export const getScheme = (params) => {
  let scheme = {...defaultScheme}
  scheme.size = params.size || 6

  return JSON.parse(JSON.stringify(scheme))
}

export class MainColumnElement extends BaseMainElement {
  static propTypes = {
    moduleName: PropTypes.string.isRequired,
    elementId: PropTypes.string.isRequired,
    activeElementId: PropTypes.string.isRequired,
    overElementId: PropTypes.string.isRequired,
    templateIsPreview: PropTypes.bool.isRequired,
    styles: PropTypes.object.isRequired,

    rowIndx: PropTypes.number.isRequired,
    colIndx: PropTypes.number.isRequired,

    col: PropTypes.object,
    elements: PropTypes.array,
    hasElements: PropTypes.bool.isRequired
  }

  static defaultProps = {
    moduleName: MODULE_NAME
  }

  _className () {
    const {hasElements} = this.props

    let className = super._className()
    if (!hasElements) {
      className += ' RVEBuilderMain-Element--columnempty '
    }

    return className
  }

  _wrap (params, children) {
    const {rowIndx, colIndx, elementId, activeElementId, elements, styles, templateIsPreview, overElementId, hasElements, handleSetOverElement} = this.props

    if (templateIsPreview && !hasElements) {
      return null
    }

    if (templateIsPreview) {
      return (<div>{children}</div>)
    }

    return (<DraggableItem
      elementId={elementId}
      activeElementId={activeElementId}
      handleSetOverElement={handleSetOverElement}
      overElementId={overElementId}
      draggable={hasElements}>
      {children}
    </DraggableItem>)
  }

  render () {
    const {rowIndx, colIndx, elementId, elements, styles, templateIsPreview, overElementId, hasElements, handleSetOverElement} = this.props

    return this._wrap({}, (<div {...this._wrapperProps()} style={styles.wrapper}>
      {!hasElements && <div>
        <Lang token='COLUMN_NO_CONTENT' />
      </div>}
      {hasElements && <div>
        {elements.map((element, indx) => {
          let ElementComponent = modules.element[element.type].MainElement

          return (<ElementComponent
            key={['element.el', rowIndx, colIndx, indx].join('.')}
            rowIndx={rowIndx}
            colIndx={colIndx}
            elIndx={indx}
            mainStyles={styles} />)
        })}
      </div>}
    </div>))
  }
}

export const MainElement = connect(
  (state, props) => (getColumnModuleProps(state, props)),
  (dispatch) => ({
    handleSetActiveElement: (elementId) => (dispatch(setActiveElement(elementId))),
    handleSetOverElement: (elementId) => (dispatch(setOverElement(elementId)))
  })
)(MainColumnElement)

export class PanelElement extends BasePanelElement {
  static defaultProps = {
    moduleName: MODULE_NAME,
    elementType: ELEMENT_TYPE
  }
}
