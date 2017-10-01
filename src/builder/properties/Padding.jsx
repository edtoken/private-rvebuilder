import React, { Component } from 'react'

import BaseProperty from './common/BaseProperty'
import AdvancedWrapper from './common/AdvancedWrapper'
import PerimeterSelector from './common/PerimeterSelector'

import Lang from '../../containers/Lang'

class PaddingComponent extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (value) {
    this.props.onChange({
      target: {
        value
      }
    })
  }

  render () {
    const {advanced, value} = this.props

    return (<div className='RVEBuilderPropertyContainer'>
      <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--label'>
        <i className='RVEBuilderPropertyContainer-Clear fa fa-trash-o' />
        <Lang token='PROPERTY_PADDING' />
      </div>
      <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--data'>
        <PerimeterSelector advanced={advanced} value={value} unit='px' onChange={this.onChange} />
      </div>
    </div>)
  }
}

export default class BorderRadius extends BaseProperty {
  static defaultProps = {
    propertyName: 'padding'
  }

  render () {
    let value = this._value()

    return (<AdvancedWrapper className={this._className()}>
      <PaddingComponent {...this.props} value={value} onChange={this.onChange} />
    </AdvancedWrapper>)
  }
}
