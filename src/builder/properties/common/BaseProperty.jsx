import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class BaseProperty extends Component {
  static propTypes = {

    elementId: PropTypes.string.isRequired,
    elementType: PropTypes.string.isRequired,

    propertyName: PropTypes.string.isRequired,
    styles: PropTypes.object.isRequired,

    propertyType: PropTypes.oneOf(['wrapper', 'container', 'selector']).isRequired,

    onChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    const {elementId, propertyName, propertyType} = this.props
    const value = e.target.value

    this.props.onChange(elementId, {[propertyType]: {[propertyName]: value}})
  }

  _className () {
    return [
      'RVEBuilderPanel-Property',
      'RVEBuilderPanel-Property--' + (this.props.elementType.toLowerCase()),
      'RVEBuilderPanel-Property--' + (this.props.propertyName.toLowerCase()),
      'RVEBuilderPanel-Property--' + (this.props.elementId.toLowerCase())
    ].join(' ')
  }

  _value () {
    const {styles, propertyName, propertyType} = this.props

    try {
      return styles[propertyType][propertyName]
    } catch (e) {
      return ''
    }
  }

  _inputKey () {
    const {elementId, propertyName, propertyType} = this.props

    return [
      'panel',
      'property',
      elementId,
      propertyType,
      propertyName
    ].join('.')
  }

  render () {
    const {elementId, propertyName, propertyType} = this.props
    const defaultValue = this._value()

    return (<div className={this._className()}>
      {[elementId, propertyName, propertyType].join('-')}
      <input
        key={this._inputKey()}
        type='text'
        onChange={this.onChange} defaultValue={defaultValue} />
    </div>)
  }
}
