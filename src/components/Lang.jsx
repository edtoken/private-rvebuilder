import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { pickValidDOMProps } from '../util/validDOMProps'

export default class LangComponent extends Component {
  static propType = {
    tagName: PropTypes.string,
    token: PropTypes.string.isRequired,
    tokenValue: PropTypes.string
  }

  static defaultProps = {
    tagName: 'span'
  }

  render () {
    const {tokenValue} = this.props
    const tagProps = pickValidDOMProps(this.props)

    return (<this.props.tagName {...tagProps}>
      {tokenValue}
    </this.props.tagName>)
  }
}
