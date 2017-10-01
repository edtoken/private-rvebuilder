import React from 'react'

import BaseProperty from './common/BaseProperty'

import Lang from '../../containers/Lang'

const ALIGN_TYPES = [
  {icon: 'align-left', value: 'left', title: 'left'},
  {icon: 'align-center', value: 'center', title: 'center'},
  {icon: 'align-right', value: 'right', title: 'right'},
  {icon: 'align-justify', value: 'justify', title: 'justify'}
]

export default class TextAlign extends BaseProperty {
  static defaultProps = {
    propertyName: 'textAlign'
  }

  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    let value = e.target.dataset.value

    super.onChange({
      target: {
        value
      }
    })
  }

  render () {
    const {elementId, propertyName, propertyType} = this.props

    const iconStyles = {
      cursor: 'pointer'
    }

    let value = this._value()

    return (<div className={this._className()}>
      <div className='RVEBuilderPropertyContainer'>
        <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--label'>
          <i className='RVEBuilderPropertyContainer-Clear fa fa-trash-o' />
          <Lang token='PROPERTY_TEXT_ALIGN' />
        </div>
        <div className='RVEBuilderPropertyContainer-Column RVEBuilderPropertyContainer-Column--data'>
          {ALIGN_TYPES.map((alignType, indx) => {
            let isActive = value === alignType.value

            return <span key={[elementId, propertyType, propertyName, alignType.value, indx].join('.')}>
							&nbsp;
              <i style={iconStyles}
                data-value={alignType.value}
                onClick={this.onChange}
                className={'fa ' + 'fa-' + alignType.icon + (isActive ? ' active ' : '')} />
            </span>
          })}
        </div>

      </div>
    </div>)
  }
}
