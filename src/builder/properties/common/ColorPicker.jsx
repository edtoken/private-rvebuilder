import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GithubPicker, SketchPicker, SliderPicker } from 'react-color'

const DEFAULT_COLORS = [
  'transparent',
  '#ffffff',
  '#000000',
  '#2CCCE4',
  '#37D67A',
  '#555555',
  '#697689',
  '#D9E3F0',
  '#dce775',
  '#ff8a65'
]

export default class ColorPicker extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    colorPalette: PropTypes.array,
    advanced: PropTypes.bool.isRequired
  }

  static defaultProps = {
    colorModel: 'hex',
    colorPalette: undefined,
    advanced: false
  }

  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (color) {
    return this.props.onChange(color[this.props.colorModel])
  }

  render () {
    const {value, colorPalette, advanced} = this.props

    let colors = colorPalette ? [].concat(colorPalette, DEFAULT_COLORS) : DEFAULT_COLORS
    colors = [...new Set(colors)].sort()

    return (<div>
      {!advanced && <div>
        <GithubPicker width='90%' color={value} colors={colors} onChangeComplete={this.onChange} />
        <SliderPicker width='90%' color={value} onChangeComplete={this.onChange} />
      </div>}

      {advanced && <div>
        <SketchPicker
          disableAlpha
          width='90%'
          color={value}
          presetColors={colors}
          onChangeComplete={this.onChange} />
      </div>}
    </div>)
  }
}
