import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class HTMLColumn extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object
  }

  static defaultProps = {
    className: '',
    styles: {}
  }

  render () {
    const {styles, colSpan} = this.props

    let mergedStyles = Object.assign({
      wordBreak: 'break-word',
      borderCollapse: 'collapse',
      verticalAlign: 'top',
      textAlign: 'center',
      backgroundColor: 'transparent',
      align: 'center',
      valign: 'top'
    }, styles)

    return (<td style={mergedStyles} colSpan={colSpan}>
      {this.props.children}
    </td>)
  }
}

export class HTMLRow extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object
  }

  static defaultProps = {
    className: '',
    styles: {}
  }

  render () {
    const {styles} = this.props

    let mergedStyles = Object.assign({
      verticalAlign: 'top'
    }, styles)

    return (<tr style={mergedStyles}>
      {this.props.children}
    </tr>)
  }
}

export class HTMLTable extends Component {
  static propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object
  }

  static defaultProps = {
    className: '',
    styles: {}
  }

  render () {
    const {styles, className} = this.props

    let mergedStyles = Object.assign({
      border: 0,
      borderSpacing: 0,
      borderCollapse: 'collapse',
      verticalAlign: 'top',
      height: '100%',
      width: '100%',
      tableLayout: 'fixed'
    }, styles)

    return (<table
      cellPadding='0'
      cellSpacing='0'
      width='100%'
      style={mergedStyles}
      className={className}>
      <tbody>
        {this.props.children}
      </tbody>
    </table>)
  }
}
