import React from 'react'

import BaseProperty from './common/BaseProperty'
import AdvancedWrapper from './common/AdvancedWrapper'
import PerimeterSelector from './common/PerimeterSelector'

import Lang from '../../containers/Lang'

export class MarginComponent extends BaseProperty {
  static defaultProps = {
    propertyName: 'margin'
  }

  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (value) {
    super.onChange({
      target: {
        value
      }
    })
  }

  render () {
    const {advanced} = this.props

    let value = this._value()

    return (<div className={this._className()}>
      <div className='RVEBuilderPropertyContainer'>
        <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--label'>
          <i className='RVEBuilderPropertyContainer-Clear fa fa-trash-o' />
          <Lang token='PROPERTY_MARGIN' />
        </div>
        <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--label'>
          <PerimeterSelector advanced={advanced} value={value} unit='px' onChange={this.onChange} />
        </div>
      </div>
    </div>)
  }
}

export default class Margin extends BaseProperty {
  static defaultProps = {
    propertyName: 'margin'
  }

  render () {
    let value = this._value()

    return (<AdvancedWrapper className={this._className()}>
      <MarginComponent {...this.props} value={value} onChange={this.onChange} />
    </AdvancedWrapper>)
  }
}
