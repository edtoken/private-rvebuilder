import React, { Component } from 'react'

import Lang from '../../../containers/Lang'

export default class AdvancedWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {advancedActive: false}

    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange (e) {
    this.setState({advancedActive: e.target.checked})
  }

  render () {
    const {children} = this.props
    const {advancedActive} = this.state

    let wrapperClassName = advancedActive ? 'RVEBuilderPanel-AdvancedWrapper--active' : ''

    return (<div className={[this.props.className, 'RVEBuilderPanel-AdvancedWrapper', wrapperClassName].join(' ')}>
      <label className='RVEBuilderPanel-AdvancedWrapperState'>
        <Lang token='PANEL_ADVANCED_TITLE' />&nbsp;
        <input type='checkbox' onChange={this._handleChange} checked={advancedActive} />
      </label>
      <children.type {...children.props} advanced={advancedActive} />
    </div>)
  }
}
