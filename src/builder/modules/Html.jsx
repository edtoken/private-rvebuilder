import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { BASE_PROPERTIES, BaseMainElement, BasePanelElement } from './Base'

import { getElementModuleProps } from '../../selectors'
import { setActiveElement, setOverElement } from '../../actions'

export const MODULE_NAME = 'Html'
export const ELEMENT_TYPE = 'Element'

export const PROPERTIES = [].concat(BASE_PROPERTIES, [])

export const defaultScheme = {
  'type': 'Html',
  'styles': {
    'container': {
      'color': '#6E6F7A',
      'lineHeight': '1',
      'padding': '0'
    },
    'selector': {}
  },
  'data': {
    'value': 'html value'
  }

}

export const getScheme = (params) => {
  let scheme = {...defaultScheme}

  return JSON.parse(JSON.stringify(scheme))
}

export class MainHtmlComponent extends BaseMainElement {
  static propTypes = {
    templateIsPreview: PropTypes.bool.isRequired,
    rowIndx: PropTypes.number.isRequired,
    colIndx: PropTypes.number.isRequired,
    elIndx: PropTypes.number.isRequired,
    element: PropTypes.object,
    cssSelectors: PropTypes.object
  }

  static defaultProps = {
    moduleName: MODULE_NAME
  }
}

export const MainElement = connect(
  (state, props) => (getElementModuleProps(state, props)),
  (dispatch) => ({
    handleSetActiveElement: (elementId) => (dispatch(setActiveElement(elementId))),
    handleSetOverElement: (elementId) => (dispatch(setOverElement(elementId)))
  })
)(MainHtmlComponent)

export class PanelElement extends BasePanelElement {
  static defaultProps = {
    moduleName: MODULE_NAME,
    elementType: ELEMENT_TYPE
  }

  static icon = <i className='fa fa-code  fa-4x' />
}
