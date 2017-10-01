import _ from 'lodash'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Color from '../properties/Color'

import { BASE_PROPERTIES, BaseMainElement } from './Base'
import { HTMLColumn, HTMLRow, HTMLTable } from '../components/HTMLTable'
import { DropZone } from '../../components/DropZone'

import { MainElement as RowMainElement } from './Row'

import { getBodyModuleProps } from '../../selectors'
import { moveElement } from '../../actions'

export const MODULE_NAME = 'Body'
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

export class MainBodyElementComponent extends BaseMainElement {
  static propTypes = {
    elementId: PropTypes.string.isRequired,
    activeElementId: PropTypes.string.isRequired,
    overElementId: PropTypes.string.isRequired,
    templateIsPreview: PropTypes.bool.isRequired,
    styles: PropTypes.object.isRequired,

    hasRows: PropTypes.bool.isRequired
  }

  static defaultProps = {
    moduleName: MODULE_NAME
  }

  _wrap (params, children) {
    const {overElementId, handleMove, templateIsPreview} = this.props

    if (templateIsPreview) {
      return (<div id='RVEBuilder-MainWrapper'>{children}</div>)
    }

    return (<div className={this._className()} id='RVEBuilder-MainWrapper'>
      <DropZone overElementId={overElementId} handleMove={handleMove}>
        {children}
      </DropZone>
    </div>)
  }

  render () {
    const {rows, hasRows, styles} = this.props

    let containerStyles = _.omit(styles.container, 'backgroundColor')

    return this._wrap({}, (<HTMLTable styles={styles.wrapper}>
      <HTMLRow>
        <HTMLColumn styles={containerStyles}>
          {hasRows && rows.map((row, indx) => {
            return (<RowMainElement
              key={['element.row', indx].join('.')}
              rowIndx={indx}
              mainStyles={styles} />)
          })}
        </HTMLColumn>
      </HTMLRow>
    </HTMLTable>))
  }
}

export const MainElement = connect(
  (state, props) => (getBodyModuleProps(state, props)),
  (dispatch) => ({
    handleMove: (fromId, toId, params) => (dispatch(moveElement(fromId, toId, params)))
  })
)(MainBodyElementComponent)
