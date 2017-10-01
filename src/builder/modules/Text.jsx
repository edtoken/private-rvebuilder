import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TinyMCE from 'react-tinymce'

import 'tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.min.css'

import Color from '../properties/Color'
import Padding from '../properties/Padding'
import FontSize from '../properties/FontSize'

import { BASE_PROPERTIES, BaseMainElement, BasePanelElement } from './Base'
import { DraggableItem } from '../../components/DragItem'

import { getElementModuleProps } from '../../selectors'
import { onChangeProperty, setActiveElement, setOverElement } from '../../actions'

export const MODULE_NAME = 'Text'
export const ELEMENT_TYPE = 'Element'

export const PROPERTIES = [].concat(BASE_PROPERTIES, [
  {component: FontSize, props: {elementType: ELEMENT_TYPE, propertyType: 'container'}},
  {component: Padding, props: {elementType: ELEMENT_TYPE, propertyType: 'container'}},
  {component: Color, props: {elementType: ELEMENT_TYPE, propertyType: 'container'}}
])

export const defaultScheme = {
  'type': 'Text',
  'styles': {
    'container': {
      'color': '#6E6F7A',
      'lineHeight': '1',
      'fontSize': '16px',
      'padding': '0'
    },
    'selector': {
      'a': {
        'color': '#0000FF'
      }
    }
  },
  'data': {
    'value': 'text value'
  }
}

export const getScheme = (params) => {
  let scheme = {...defaultScheme}

  return JSON.parse(JSON.stringify(scheme))
}

export class MainTextComponent extends BaseMainElement {
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

  constructor (props) {
    super(props)
    this.onChangeText = this.onChangeText.bind(this)
  }

  onChangeText (e) {
    const {elementId} = this.props
    const textHTML = e.target.getContent()
    this.props.onChangeProperty(elementId, {data: {value: textHTML}})
  }

  _wrap (params, child) {
    const {element, elementId, activeElementId, templateIsPreview, overElementId, handleSetOverElement, styles} = this.props

    if (templateIsPreview) {
      return (<div>
        <div style={styles.wrapper}>
          <div style={styles.container}>
            <div dangerouslySetInnerHTML={{__html: element.data.value}} />
          </div>
        </div>
      </div>)
    }

    return (<div>
      <DraggableItem
        elementId={elementId}
        activeElementId={activeElementId}
        handleSetOverElement={handleSetOverElement}
        overElementId={overElementId}
        guided={this.props.guided !== undefined ? this.props.guided : true}>
        <div {...this._wrapperProps()}>
          {child}
        </div>
      </DraggableItem>
    </div>)
  }

  render () {
    const {element, isActive, styles} = this.props

    return this._wrap({}, <div style={styles.wrapper}>
      <div>
        <div style={styles.container}>
          <div onClick={(e) => (isActive ? e.stopPropagation() : undefined)}>
            <TinyMCE
              onChange={this.onChangeText}
              content={element.data.value}
              config={{
                inline: true,
                menubar: false,
                plugins: '',
                content_css: [],
                toolbar: ['undo redo | fontsizeselect | bold italic underline superscript | alignleft aligncenter alignright alignjustify'],
                setup: (editor) => {
                  console.log('editor', editor)
                  console.log('editor.getElement()', editor.getElement())
                  // editor.getElement().blur()
                  // editor.getElement().focus()

                  // setTimeout(() => {
                  //   // editor.getElement().click()
                  //   // editor.getElement().children[0].click()
                  //   // editor.getElement().children[0].blur()
                  //   editor.getElement().children[0].focus()
                  // }, 10)
                }
              }} />
          </div>

        </div>
      </div>
    </div>)
  }
}

export const MainElement = connect(
  (state, props) => (getElementModuleProps(state, props)),
  (dispatch) => ({
    onChangeProperty: (elementId, propertyParams) => (dispatch(onChangeProperty(elementId, propertyParams, true))),
    handleSetActiveElement: (elementId) => (dispatch(setActiveElement(elementId))),
    handleSetOverElement: (elementId) => (dispatch(setOverElement(elementId)))
  })
)(MainTextComponent)

export class PanelElement extends BasePanelElement {
  static defaultProps = {
    moduleName: MODULE_NAME,
    elementType: ELEMENT_TYPE
  }

  static icon = <i className='fa fa-font  fa-4x' />
}
