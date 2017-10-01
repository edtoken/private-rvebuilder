import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BorderRadius from '../properties/BorderRadius'
import Padding from '../properties/Padding'
import TextAlign from '../properties/TextAlign'
import FontSize from '../properties/FontSize'
import Color from '../properties/Color'
import LineHeight from '../properties/LineHeight'

import { BASE_PROPERTIES, BaseMainElement, BasePanelElement } from './Base'

import { getElementModuleProps } from '../../selectors'
import { setActiveElement, setOverElement } from '../../actions'

export const MODULE_NAME = 'Button'
export const ELEMENT_TYPE = 'Element'

export const PROPERTIES = [].concat(BASE_PROPERTIES, [
  {component: Padding, props: {elementType: ELEMENT_TYPE, propertyType: 'wrapper'}},
  {component: TextAlign, props: {elementType: ELEMENT_TYPE, propertyType: 'wrapper'}},
  {component: Color, props: {elementType: ELEMENT_TYPE, propertyType: 'container', propertyName: 'backgroundColor'}},
  {component: Color, props: {elementType: ELEMENT_TYPE, propertyType: 'container'}},
  {component: BorderRadius, props: {elementType: ELEMENT_TYPE, propertyType: 'container'}},
  {component: FontSize, props: {elementType: ELEMENT_TYPE, propertyType: 'container'}},
  {component: LineHeight, props: {elementType: ELEMENT_TYPE, propertyType: 'container'}},
  {component: Padding, props: {elementType: ELEMENT_TYPE, propertyType: 'container'}}
])

export const defaultScheme = {
  'type': 'Button',
  'styles': {
    'wrapper': {
      'padding': '0px',
      'textAlign': 'center'
    },
    'container': {
      'fontSize': '14px',
      'color': '#ffffff',
      'lineHeight': '1',
      'padding': '5px 15px 5px 15px',
      'width': '100%',
      'borderRadius': '8px',
      'borderWidth': '1px',
      'backgroundColor': '#C7702E'
    },
    'selector': {}
  },
  'data': {
    'value': 'label',
    'href': '#'
  }
}

export const getScheme = (params) => {
  let scheme = {...defaultScheme}

  return JSON.parse(JSON.stringify(scheme))
}

export class MainButtonComponent extends BaseMainElement {
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
)(MainButtonComponent)

export class PanelElement extends BasePanelElement {
  static defaultProps = {
    moduleName: MODULE_NAME,
    elementType: ELEMENT_TYPE
  }

  static icon = <i className='fa fa-square-o  fa-4x' />
}
