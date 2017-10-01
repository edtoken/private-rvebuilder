import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as modules from '../builder/modules'
import { cloneElementById, deleteElementById, onChangeProperty, setActiveElement } from '../actions'
import { getPanelPropertiesListProps } from '../selectors'

import Lang from '../containers/Lang'

const ACTIVE_ELEMENT_ACTIONS = [
  {'action': 'delete', icon: 'fa fa-trash-o fa-x2', title: 'Delete'},
  {'action': 'clone', icon: 'fa fa-clone fa-x2', title: 'Clone'},
  {'action': 'close', icon: 'fa fa-times fa-x2', title: 'Close'}
]

export class PanelPropertiesListComponent extends Component {
  constructor (props) {
    super(props)

    this._handleClickElementAction = this._handleClickElementAction.bind(this)
  }

  _handleClickElementAction (e) {
    let action = e.target.dataset.action

    switch (action) {
      case 'clone':
        return this.props.cloneElementById(this.props.activeElementId)

      case 'delete':
        return this.props.deleteElementById(this.props.activeElementId)

      case 'close':
        return this.props.hidePropertyPanel()
    }
  }

  render () {
    const {element, elementInfo, colorPalette, onChange} = this.props

    let elementType = elementInfo.elementType
    let elementId = elementInfo.elementId
    let elementTypeLover = elementInfo.elementType.toLowerCase()
    let modulesCategory = modules[elementTypeLover] ? modules[elementTypeLover] : modules.structure[elementType] ? modules.structure : modules.element
    let elementData = modulesCategory[elementType] || undefined

    if (!elementData) {
      console.log('modulesCategory', modulesCategory, elementType, modules.element)

      return (<div>
        undefined element
      </div>)
    }

    let properties = elementData.PROPERTIES
    let styles = element.styles

    let propertisGroups = _.groupBy(properties, p => (p.props.propertyType))
    let hideElementActions = (elementType === 'Body' || elementType === 'Column')

    return (<div>

      <div className='RVEBuilderPanel-ElementHeader'>
        <span className='RVEBuilderPanel-ElementTypeName'>
          {elementType}
        </span>
        <div className='RVEBuilderPanel-ElementActions'>
          {!hideElementActions && ACTIVE_ELEMENT_ACTIONS.map((actionData, indx) => {
            return (<span key={[actionData.action, indx].join('.')}>
              <i data-action={actionData.action}
                onClick={this._handleClickElementAction}
                className={actionData.icon} /></span>)
          })}
        </div>

      </div>

      {propertisGroups.wrapper && <div>
        <div className='RVEBuilderPanel-CategoryTitle'><Lang token='PANEL_WRAPPER_TITLE' /></div>

        {propertisGroups.wrapper.map((property, indx) => {
          return (<div key={[elementId, 'property', indx, 'wrapper', property.props.elementType].join('.')}>
            <property.component
              {...property.props}
              colorPalette={colorPalette}
              styles={styles}
              elementId={elementId}
              onChange={onChange} />
          </div>)
        })}
      </div>}

      {propertisGroups.container && <div>
        <div className='RVEBuilderPanel-CategoryTitle'><Lang token='PANEL_CONTAINER_TITLE' /></div>

        {propertisGroups.container.map((property, indx) => {
          return (<div key={[elementId, 'property', indx, 'container', property.props.elementType].join('.')}>
            <property.component
              {...property.props}
              colorPalette={colorPalette}
              styles={styles}
              elementId={elementId}
              onChange={onChange} />
          </div>)
        })}
      </div>}

    </div>)
  }
}

export default connect(
  (state, props) => (getPanelPropertiesListProps(state, props)),
  (dispatch) => ({
    deleteElementById: (elementId) => (dispatch(deleteElementById(elementId))),
    cloneElementById: (elementId) => (dispatch(cloneElementById(elementId))),
    hidePropertyPanel: () => (dispatch(setActiveElement(''))),
    onChange: (elementId, propertyParams) => (dispatch(onChangeProperty(elementId, propertyParams)))
  })
)(PanelPropertiesListComponent)
