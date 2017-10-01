import React from 'react'

import BaseProperty from './common/BaseProperty'
import SideSize from './common/SideSize'

import Lang from '../../containers/Lang'

export default class Height extends BaseProperty {
  static defaultProps = {
    propertyName: 'height'
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
    let value = this._value()

    return (<div className={this._className()}>
      <div className='RVEBuilderPropertyContainer'>
        <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--label'>
          <i className='RVEBuilderPropertyContainer-Clear fa fa-trash-o' />
          <Lang token='PROPERTY_HEIGHT' />
        </div>
        <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--data'>
          <SideSize value={value} unit='px' onChange={this.onChange} />
        </div>
      </div>
    </div>)
  }
}
