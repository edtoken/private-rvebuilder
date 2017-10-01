import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SideSize extends Component {
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

  onChange (e) {
    const {value, unit, negative} = this.props
    const type = e.target.dataset.type

    let val = value ? value.toString().replace(unit, '') : [0, unit]
    let updated = parseInt(val) + parseInt(type)

    if (!negative && updated < 0) {
      return
    }

    updated = updated.toString() + unit
    return this.props.onChange(updated)
  }

  render () {
    const {value} = this.props

    return (<div className='RVEBuilder-SideSize'>
      <i onClick={this.onChange} className='fa fa-minus' data-type='-1' />
      <input type='text' value={value} disabled />
      <i onClick={this.onChange} className='fa fa-plus' data-type='+1' />
    </div>)
  }
}
