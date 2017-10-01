import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SideSize from './SideSize'

export default class PerimeterSelector extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    negative: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    unit: 'px',
    negative: false
  }

  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (value) {
    console.log('PerimeterSelector.onChange', value)
    this.props.onChange(value)
  }

  onChangeAdvanced (position) {
    const self = this

    return (value) => {
      let val = self._value()
      val.splice(position, 1, value)
      self.props.onChange(val.join(' '))
    }
  }

  _value () {
    const {advanced, value, unit} = this.props
    return advanced ? value.split(' ').concat(new Array(4).fill([0, unit].join(''))).slice(0, 4) : value.split(' ').shift()
  }

  render () {
    const {advanced} = this.props

    let value = this._value()

    return (<div>
      {!advanced && <SideSize value={value} unit='px' onChange={this.onChange} />}
      {advanced && <div>
        <SideSize value={value[0]} unit='px' onChange={this.onChangeAdvanced(0)} />
        <SideSize value={value[1]} unit='px' onChange={this.onChangeAdvanced(1)} />
        <SideSize value={value[2]} unit='px' onChange={this.onChangeAdvanced(2)} />
        <SideSize value={value[3]} unit='px' onChange={this.onChangeAdvanced(0)} />
      </div>}
    </div>)
  }
}
