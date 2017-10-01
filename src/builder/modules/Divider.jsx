import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { BASE_PROPERTIES, BaseMainElement, BasePanelElement } from './Base'

import { getElementModuleProps } from '../../selectors'
import { setActiveElement, setOverElement } from '../../actions'

export const MODULE_NAME = 'Divider'
export const ELEMENT_TYPE = 'Element'

export const PROPERTIES = [].concat(BASE_PROPERTIES, [])

export const defaultScheme = {
  'type': 'Divider',
  'styles': {
    'wrapper': {},
    'container': {
      border: 'solid #ddd',
      borderColor: '#333',
      borderWidth: '0',
      borderTopWidth: '1px',
      width: '100%'
    },
    'selector': {}
  },
  'data': {}
}

export const getScheme = (params) => {
  let scheme = {...defaultScheme}

  return JSON.parse(JSON.stringify(scheme))
}

export class MainDividerComponent extends BaseMainElement {
  static propTypes = {
    templateIsPreview: PropTypes.bool.isRequired,
    rowIndx: PropTypes.number.isRequired,
    colIndx: PropTypes.number.isRequired,
    elIndx: PropTypes.number.isRequired,
    element: PropTypes.object
  }

  static defaultProps = {
    moduleName: MODULE_NAME,
    guided: false
  }
}

export const MainElement = connect(
  (state, props) => (getElementModuleProps(state, props)),
  (dispatch) => ({
    handleSetActiveElement: (elementId) => (dispatch(setActiveElement(elementId))),
    handleSetOverElement: (elementId) => (dispatch(setOverElement(elementId)))
  })
)(MainDividerComponent)

export class PanelElement extends BasePanelElement {
  static defaultProps = {
    moduleName: MODULE_NAME,
    elementType: ELEMENT_TYPE
  }

  static icon = <i className='fa fa-window-minimize  fa-4x' />
}
