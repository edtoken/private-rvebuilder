import React, { Component } from 'react'

import BaseProperty from './common/BaseProperty'
import ColorPicker from './common/ColorPicker'
import AdvancedWrapper from './common/AdvancedWrapper'

import Lang from '../../containers/Lang'

class ColorComponent extends Component {
  render () {
    const {advanced, colorPalette, value, onChange} = this.props

    const NAME_TOKEN = ['PROPERTY', this.props.propertyName, this.props.propertyType].join('_').toUpperCase()

    return (<div className='RVEBuilderPropertyContainer'>
      <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--label'>
        <i className='RVEBuilderPropertyContainer-Clear fa fa-trash-o' />
        <Lang token={NAME_TOKEN} />
      </div>
      <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--data'>
        <ColorPicker colorPalette={colorPalette} value={value} onChange={onChange} advanced={advanced} />
      </div>
    </div>)
  }
}

export default class Color extends BaseProperty {
  static defaultProps = {
    propertyName: 'color'
  }

  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (color) {
    super.onChange({
      target: {
        value: color
      }
    })
  }

  render () {
    let value = this._value()

    return (<AdvancedWrapper className={this._className()}>
      <ColorComponent {...this.props} value={value} onChange={this.onChange} />
    </AdvancedWrapper>)
  }
}
