import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Color from '../properties/Color'

import { BASE_PROPERTIES, BaseMainElement, BasePanelElement } from './Base'
import { HTMLColumn, HTMLRow, HTMLTable } from '../components/HTMLTable'
import { DraggableItem } from '../../components/DragItem'

import { getScheme as getColumnScheme, MainElement as ColumnMainElement } from './Column'

import { getRowModuleProps } from '../../selectors'
import { setActiveElement, setOverElement } from '../../actions'

export const MODULE_NAME = 'Row'
export const ELEMENT_TYPE = 'Structure'

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
    component: Color,
    props: {
      propertyName: 'backgroundColor',
      elementType: 'Structure',
      propertyType: 'container'
    }
  }
])

export const defaultScheme = {
  'styles': {
    'wrapper': {
      'backgroundColor': 'transparent'
    },
    'container': {
      'backgroundColor': ''
    }
  },
  'cols': []
}

export const getScheme = (params) => {
  let scheme = {...defaultScheme}
  scheme.cols = params.cols || []
  scheme.cols = scheme.cols.map(colSize => (getColumnScheme({size: colSize})))

  return JSON.parse(JSON.stringify(scheme))
}

export class MainRowElementComponent extends BaseMainElement {
  static propTypes = {
    moduleName: PropTypes.string.isRequired,
    elementId: PropTypes.string.isRequired,
    activeElementId: PropTypes.string.isRequired,
    overElementId: PropTypes.string.isRequired,
    templateIsPreview: PropTypes.bool.isRequired,
    styles: PropTypes.object.isRequired,

    rowIndx: PropTypes.number.isRequired,

    row: PropTypes.object,
    cols: PropTypes.array,
    hasCols: PropTypes.bool.isRequired
  }

  static defaultProps = {
    moduleName: MODULE_NAME
  }

  renderAdminPanel () {
    return (<div />)
  }

  _wrap (params, children) {
    const {elementId, activeElementId, templateIsPreview, overElementId, handleSetOverElement} = this.props

    if (templateIsPreview) {
      return children
    }

    return (<DraggableItem
      draggable
      elementId={elementId}
      activeElementId={activeElementId}
      handleSetOverElement={handleSetOverElement}
      overElementId={overElementId}>
      {children}
    </DraggableItem>)
  }

  render () {
    const {cols, rowIndx, hasCols, styles, templateIsPreview} = this.props

    return (this._wrap({}, <div {...this._wrapperProps()}>
      <HTMLTable styles={{
        backgroundColor: styles.wrapper.backgroundColor
      }}>
        <HTMLRow>
          <HTMLColumn>
            <HTMLTable>
              <HTMLRow>
                <HTMLColumn>
                  <HTMLTable>
                    <HTMLRow>

                      {hasCols && cols.map((col, indx) => {
                        return (<HTMLColumn key={['element.col', rowIndx, indx].join('.')}
                          colSpan={col.size}>
                          <ColumnMainElement
                            rowIndx={rowIndx}
                            colIndx={indx}
                            mainStyles={styles} />
                        </HTMLColumn>)
                      })}

                    </HTMLRow>
                  </HTMLTable>
                </HTMLColumn>
              </HTMLRow>
            </HTMLTable>
          </HTMLColumn>
        </HTMLRow>
      </HTMLTable>
    </div>))
  }
}

export const MainElement = connect(
  (state, props) => (getRowModuleProps(state, props)),
  (dispatch) => ({
    handleSetActiveElement: (elementId) => (dispatch(setActiveElement(elementId))),
    handleSetOverElement: (elementId) => (dispatch(setOverElement(elementId)))
  })
)(MainRowElementComponent)

export class PanelElement extends BasePanelElement {
  static propTypes = {
    scheme: PropTypes.array.isRequired
  }

  static defaultProps = {
    moduleName: MODULE_NAME,
    elementType: ELEMENT_TYPE
  }

  render () {
    return (<DraggableItem
      guided={false}
      draggable
      className={this._className()}
      elementId={`${this.props.moduleName}New${this.props.elementType}`}
      dragParams={{scheme: this.props.scheme}}>
      <b>{JSON.stringify(this.props.scheme, null, 2)}</b>
    </DraggableItem>)
  }
}
